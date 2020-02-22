import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../common/interfaces/interfaces';
import { updateUserDTO } from '../../common/dtos/updateUser.dto';
import { AuthUserId } from '../../auth/decorator/auth-decorators.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('update-user')
    async updateUser(@Body() updateUserDto: updateUserDTO): Promise<IUser> {
        return this.userService.updateUser(updateUserDto);
    }
    @Get('show-user')
    async showUser(@AuthUserId() userId): Promise<IUser> {
        return this.userService.showUser(userId);
    }
}
