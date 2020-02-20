import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerEquipmentsService } from './customer-equipments.service';
import { createCustomerEquipmentDTO } from '../../common/dtos/createCustomerEquipment.dto';
import { updateCustomerEquipmentDTO } from '../../common/dtos/updateCustomerEquipment.dto';
import { deleteCustomerEquipmentDTO } from '../../common/dtos/deleteCustomerEquipment.dto';
import { restoreCustomerEquipmentDTO } from '../../common/dtos/restoreCustomerEquipment.dto';
import { customerEquipmentsRangesDTO } from 'src/common/dtos/customerEquipmentsRanges.dto';

@Controller('customer-equipments')
@UseGuards(AuthGuard('jwt'))
export class CustomerEquipmentsController {
    constructor(private customerEquipmentsService: CustomerEquipmentsService) {}

    @Get('list')
    async list() {
        return this.customerEquipmentsService.list();
    }
    @Get('list-trashed')
    async listTrashed() {
        return this.customerEquipmentsService.listTrashed();
    }
    @Post('create')
    async create(@Body() createCustomerEquipmentDto: createCustomerEquipmentDTO) {
        return this.customerEquipmentsService.create(createCustomerEquipmentDto);
    }
    @Post('update')
    async update(@Body() updateCustomerEquipmentDto: updateCustomerEquipmentDTO) {
        return this.customerEquipmentsService.update(updateCustomerEquipmentDto);
    }
    @Post('delete')
    async delete(@Body() deleteCustomerEquipmentDto: deleteCustomerEquipmentDTO) {
        return this.customerEquipmentsService.delete(deleteCustomerEquipmentDto);
    }
    @Post('restore')
    async restore(@Body() restoreCustomerEquipmentDto: restoreCustomerEquipmentDTO) {
        return this.customerEquipmentsService.restore(restoreCustomerEquipmentDto);
    }
    @Post('where-dates')
    async whereDates(@Body() customerEquipmentsRangesDto: customerEquipmentsRangesDTO) {
        return this.customerEquipmentsService.findWhereDates(customerEquipmentsRangesDto);
    }
}
