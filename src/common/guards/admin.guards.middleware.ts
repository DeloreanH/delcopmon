import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userServ: UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (await this.validateAdmin(request)) {
        return true;
    } else {
        throw new HttpException('this route is only for admins', HttpStatus.FORBIDDEN);
    }
  }
  async validateAdmin(request): Promise<boolean> {
    try {
      const user = await this.userServ.findById(request.user.id);
      if (user.role !== 'admin') {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
  }
}
