import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../common/interfaces/interfaces';
import { createUserDTO} from '../../common/dtos/createUser.dto';
import { hash } from 'bcrypt';
import { EnableDisableUserDTO } from '../../common/dtos/enableDisableUser.dto';

@Injectable()
export class AdminService {
    constructor(private userService: UserService) {}

    public async createAdmin(createAdmin: createUserDTO): Promise<IUser> {
        const match = await this.userService.findOneByEmail(createAdmin.email);
        if (match) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const admin       = Object.assign({}, createAdmin, { role: 'admin'});
            const hashed      = await hash(admin.password, 10);
            admin.password    = hashed;
            const savedAdmin = await this.userService.createUser(admin);
            return savedAdmin;
        }
    }

    public async createUser(createUser: createUserDTO): Promise<IUser> {
        const match = await this.userService.findOneByEmail(createUser.email);
        if (match) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const user      = Object.assign({}, createUser, { role: 'basic'});
            const hashed    = await hash(user.password, 10);
            user.password   = hashed;
            const savedUser = await this.userService.createUser(user);
            return savedUser;
        }
    }
    public async list(): Promise<IUser[]> {
        return await this.userService.findAll();
    }
    public async disableUser(EnableDisableUser: EnableDisableUserDTO): Promise<IUser> {
        const user = await this.userService.findById(EnableDisableUser.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } else {
            user.sysAccess = false;
            return await user.save();
        }
    }
    public async enableUser(EnableDisableUser: EnableDisableUserDTO): Promise<IUser> {
        const user = await this.userService.findById(EnableDisableUser.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } else {
            user.sysAccess = true;
            return await user.save();
        }
    }

}
