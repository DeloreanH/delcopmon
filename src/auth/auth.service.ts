import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { loginUserDTO } from '../common/dtos/loginUser.dto';
import { UserService } from '../core/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ISesion, IPayload, IAuthResponse, IPasswordReset } from '../common/interfaces/interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../database/model-names';
import { Model } from 'mongoose';
import { sesionDTO } from '../common/dtos/sesion.dto';
import { signUpDTO } from '../common/dtos/signup.dto';
import { passwordResetDTO } from 'src/common/dtos/passwordReset.dto';
import { passwordNewDTO } from 'src/common/dtos/passwordNew.dto';
import { MailerService } from 'src/core/services/mailer.service';
import { v1 } from 'uuid';
import { hash } from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class AuthService {
    private expTime = this.config.get('JWT_TOKEN_EXP');
    constructor(
        @InjectModel(modelName.SESION) private sesionModel: Model<ISesion>,
        @InjectModel(modelName.USER) private userModel: Model<IUser>,
        @InjectModel(modelName.PASSWORD_RESET) private passwordResetModel: Model<IPasswordReset>,
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService,
        private mailer: MailerService,
    ) {}
    public async login(loginAttempt: loginUserDTO): Promise<IAuthResponse> {
        const userToAttempt = await this.userService.findOneByEmail(loginAttempt.email);
        if (!userToAttempt) {
            throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
        }
        if (await userToAttempt.comparePassword(loginAttempt.password)) {
            const auth = this.createJwtPayload(userToAttempt);
            await this.sesionLogger({user_id: userToAttempt._id, token: auth.access_token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        } else {
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }
    }
    public async register(RegisterAttempt: signUpDTO): Promise<IAuthResponse> {
        const isMatch = await this.userService.findOneByEmail(RegisterAttempt.email);
        if (isMatch) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const createUser    = new this.userModel(RegisterAttempt);
            const hashed        = await hash(RegisterAttempt.password, 10);
            createUser.password = hashed;
            await createUser.save();
            const auth = this.createJwtPayload(createUser);
            await this.sesionLogger({user_id: createUser._id, token: auth.access_token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        }
    }
    public async passwordReset(passwordResetAttempt: passwordResetDTO): Promise<any> {
        const isMatch = await this.userService.findOneByEmail(passwordResetAttempt.email);
        if (!isMatch) {
            throw new HttpException('not email found', HttpStatus.BAD_REQUEST);
        } else {
            const uuid = v1();
            const createPasswordReset = new this.passwordResetModel({user_id: isMatch.id, uuid , created: moment(), expireAt: moment().add(15, 'minutes') });
            const reset = await createPasswordReset.save();
            const emailSended = await this.mailer.sendPasswordResetLink(isMatch.email, 'localhost:4200/auth/password-reset/' + uuid);
            return {
                password_reset: reset,
                email_sended: emailSended,
            };
        }
    }

    public async passwordNew(passwordNewAttempt: passwordNewDTO): Promise<any> {
        const isMatch = await this.passwordResetModel.findOne({uuid: passwordNewAttempt.uuid});
        if (!isMatch) {
            throw new HttpException('password reset token expired', HttpStatus.BAD_REQUEST);
        } else {
            const user = await this.userService.findById(isMatch.user_id);
            if (!user) {
                throw new HttpException('not user found', HttpStatus.BAD_REQUEST);
            } else {
                const hashed  = await hash(passwordNewAttempt.password, 10);
                user.password = hashed;
                await user.save();
                await isMatch.remove();
                return user;
            }
        }
    }
    public async logout( token: string ): Promise<ISesion> {
        return new Promise( async (resolve, reject) => {
            try {
                const blacklisted = await this.sesionModel.findOneAndUpdate({ token }, { blacklist: true });
                if (!blacklisted) {
                   reject('token not found');
                }
                resolve(blacklisted);
            } catch (error) {
                reject(error);
            }
        });
    }
    public async validateUserToken( payload: IPayload, token: string ): Promise<IUser> {
        return new Promise( async (resolve, reject) => {
            try {
                await this.checkBlackList(token);
                const user = await this.userService.findById(payload.sub.id);
                if (!user) {
                    reject('user not found');
                }
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async checkBlackList( token: string ): Promise<string> {
        return new Promise( async (resolve, reject) => {
            const sesion = await this.sesionModel.findOne({token});
            if (sesion) {
                if (sesion.blacklist) {
                    reject('token is blacklisted');
                } else {
                    resolve('token is okey');
                }
            } else {
                reject('token not found');
            }
        });
    }
    private createJwtPayload(user: IUser): IAuthResponse {
        const token = this.jwtService.sign({sub: {id: user._id}});
        return {
            expiresIn: moment().add( this.expTime, 'seconds').unix().toString(),
            access_token: token,
            user,
        };
    }
    private async sesionLogger(sesion: sesionDTO): Promise<ISesion> {
        const createdLog = new this.sesionModel(sesion);
        return await createdLog.save();
    }
}
