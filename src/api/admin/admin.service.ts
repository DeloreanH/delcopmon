import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../common/interfaces/interfaces';
import { createUserDTO} from '../../common/dtos/createUser.dto';
import { hash } from 'bcrypt';
import { deleteUserDTO } from '../../common/dtos/deleteUser.dto';
import { restoreUserDTO } from '../../common/dtos/restoreUser.dto';
import { changeRolDTO } from '../../common/dtos/chagenRol.dto';
import { MailerService } from '../../core/services/mailer.service';

@Injectable()
export class AdminService {
    constructor(private userService: UserService, private mailer: MailerService) {}

    public async changeRol(changeRol: changeRolDTO): Promise<IUser> {
        const user = await this.userService.findById(changeRol.userId);
        if ( !user) {
            throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
        } else {
            user.role = changeRol.rol;
            return await user.save();
        }
    }

    public async createUser(createUser: createUserDTO): Promise<IUser> {
        const match = await this.userService.findOneByEmail(createUser.email);
        if (match) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const password = this.makeId(8);
            const user      = Object.assign({}, createUser, { password});
            const hashed    = await hash(user.password, 10);
            user.password   = hashed;
            await this.mailer.sendGeneratedPAssword(user.email, password);
            return await this.userService.createUser(user);
        }
    }
    public async list(): Promise<IUser[]> {
        return await this.userService.findAll();
    }
    public async listTrashed(): Promise<IUser[]> {
        return await this.userService.findTrashed();
    }

    public async deleteUser(deleteUserDTo: deleteUserDTO): Promise<IUser> {
        const user = await this.userService.findById(deleteUserDTo.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } else {
            user.deleted = true;
            return await user.save();
        }
    }
    public async restoreUser(restoreUserDto: restoreUserDTO): Promise<IUser> {
        const user = await this.userService.findById(restoreUserDto.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } else {
            user.deleted = false;
            return await user.save();
        }
    }

    public makeId(length: number) {
        let result             = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

}
