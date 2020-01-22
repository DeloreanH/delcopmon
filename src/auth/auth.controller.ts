import { Controller, Body, Post, Req, Res, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { loginUserDTO } from '../common/dtos/loginUser.dto';
import { signUpDTO } from '../common/dtos/signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { passwordResetDTO } from '../common/dtos/passwordReset.dto';
import { passwordNewDTO } from '../common/dtos/passwordNew.dto';
import { changePasswordDTO } from '../common/dtos/changePassword.dto';
import { AuthUserId } from './decorator/auth-decorators.decorator';
import { changeProfileDTO } from '../common/dtos/changeProfile.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserDto: loginUserDTO) {
        return await this.authService.login(loginUserDto);
    }
    @Post('register')
    async register(@Body() SignUpDto: signUpDTO) {
        return await this.authService.register(SignUpDto);
    }

    @Post('password-reset')
    async passwordReset(@Body() passwordResetDto: passwordResetDTO) {
        return await this.authService.passwordReset(passwordResetDto);
    }

    @Post('password-new')
    async passwordNew(@Body() passwordNewDto: passwordNewDTO) {
        return await this.authService.passwordNew(passwordNewDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() req, @Res() res) {
        try {
            await this.authService.logout(req.headers.authorization.split(' ')[1]);
            return res.status(HttpStatus.OK).json({
               status: 'logout successfully',
            });
        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('change-password')
    async changePassword(changePasswordDto: changePasswordDTO, @AuthUserId() userId) {
        return await this.authService.changePassword(changePasswordDto, userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('change-profile')
    async changeProfile(changeProfileDto: changeProfileDTO, @AuthUserId() userId) {
        return await this.authService.changeProfile(changeProfileDto, userId);
    }
}
