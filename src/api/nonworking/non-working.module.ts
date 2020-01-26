import { Module } from '@nestjs/common';
import { NonWorkingController } from './non-working.controller';
import { NonWorkingService } from './non-working.service';

@Module({
  controllers: [NonWorkingController],
  providers: [NonWorkingService],
})
export class NonWorkingModule {}
