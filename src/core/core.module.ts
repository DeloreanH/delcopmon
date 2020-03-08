import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MailerService } from './services/mailer.service';
import { MaintenanceService } from './services/maintenance.service';

@Global()
@Module({
    exports: [
        UserService,
        MailerService,
        MaintenanceService,
      ],
      providers: [
        UserService,
        MailerService,
        MaintenanceService,
      ],
})
export class CoreModule {}
