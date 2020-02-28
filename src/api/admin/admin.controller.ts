import { Controller, Body, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../common/guards/admin.guards.middleware';
import { AdminService } from './admin.service';
import { createUserDTO } from '../../common/dtos/createUser.dto';
import { IUser } from '../../common/interfaces/interfaces';
import { deleteUserDTO } from '../../common/dtos/deleteUser.dto';
import { restoreUserDTO } from '../../common/dtos/restoreUser.dto';
import { changeRolDTO } from '../../common/dtos/chagenRol.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard )
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('list-users')
    async list(): Promise<IUser[]> {
        return this.adminService.list();
    }
    @Post('list-users-trashed')
    async listTrashed(): Promise<IUser[]> {
        return this.adminService.listTrashed();
    }
    @Post('change-rol')
    async changeRol(@Body() changeRolDto: changeRolDTO): Promise<IUser> {
        return this.adminService.changeRol(changeRolDto);
    }
    @Post('create-user')
    async createUser(@Body() createUser: createUserDTO): Promise<IUser> {
        return this.adminService.createUser(createUser);
    }
    @Post('delete-user')
    async deleteUser(@Body() deleteUserDto: deleteUserDTO): Promise<IUser> {
        return this.adminService.deleteUser(deleteUserDto);
    }
    @Post('restore-user')
    async restoreUser(@Body() restoreUserDto: restoreUserDTO): Promise<IUser> {
        return this.adminService.restoreUser(restoreUserDto);
    }
}
