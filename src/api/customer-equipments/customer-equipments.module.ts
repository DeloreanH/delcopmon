import { Module } from '@nestjs/common';
import { CustomerEquipmentsService } from './customer-equipments.service';
import { CustomerEquipmentsController } from './customer-equipments.controller';

@Module({
  providers: [CustomerEquipmentsService],
  controllers: [CustomerEquipmentsController],
})
export class CustomerEquipmentsModule {}
