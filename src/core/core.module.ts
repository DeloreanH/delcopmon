import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MailerService } from './services/mailer.service';

@Global()
@Module({
    exports: [
        UserService,
        MailerService,
      ],
      providers: [
        UserService,
        MailerService,
      ],
})
export class CoreModule {}
