import { Controller, Body, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { createUserDTO } from '../../common/dtos/createUser.dto';
import { IUser } from '../../common/interfaces/interfaces';
import { EnableDisableUserDTO } from 'src/common/dtos/enableDisableUser.dto';
import { AdminGuard } from '../../common/guards/admin.guards.middleware';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard )
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('list-users')
    async list(@Body() createAdmin: createUserDTO): Promise<IUser[]> {
        return this.adminService.list();
    }

    @Post('create-admin')
    async createAdmin(@Body() createAdmin: createUserDTO): Promise<IUser> {
        return this.adminService.createAdmin(createAdmin);
    }
    @Post('create-user')
    async createUser(@Body() createUser: createUserDTO): Promise<IUser> {
        return this.adminService.createUser(createUser);
    }
    @Post('disable-user')
    async disableUser(@Body() EnableDisableUser: EnableDisableUserDTO): Promise<IUser> {
        return this.adminService.disableUser(EnableDisableUser);
    }
    @Post('enable-user')
    async enableUser(@Body() EnableDisableUser: EnableDisableUserDTO): Promise<IUser> {
        return this.adminService.enableUser(EnableDisableUser);
    }
}
