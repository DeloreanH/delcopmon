import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerEquipmentsService } from './customer-equipments.service';
import { createCustomerEquipmentDTO } from '../../common/dtos/createCustomerEquipment.dto';
import { updateCustomerEquipmentDTO } from '../../common/dtos/updateCustomerEquipment.dto';
import { deleteCustomerEquipmentDTO } from '../../common/dtos/deleteCustomerEquipment.dto';
import { restoreCustomerEquipmentDTO } from '../../common/dtos/restoreCustomerEquipment.dto';
import { customerEquipmentsRangesDTO } from '../../common/dtos/customerEquipmentsRanges.dto';

@Controller('customer-equipments')
export class CustomerEquipmentsController {
    constructor(private customerEquipmentsService: CustomerEquipmentsService) {}

    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async list() {
        return this.customerEquipmentsService.list();
    }
    @Get('list-trashed')
    @UseGuards(AuthGuard('jwt'))
    async listTrashed() {
        return this.customerEquipmentsService.listTrashed();
    }
    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createCustomerEquipmentDto: createCustomerEquipmentDTO) {
        return this.customerEquipmentsService.create(createCustomerEquipmentDto);
    }
    @Post('update')
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() updateCustomerEquipmentDto: updateCustomerEquipmentDTO) {
        return this.customerEquipmentsService.update(updateCustomerEquipmentDto);
    }
    @Post('delete')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Body() deleteCustomerEquipmentDto: deleteCustomerEquipmentDTO) {
        return this.customerEquipmentsService.delete(deleteCustomerEquipmentDto);
    }
    @Post('restore')
    @UseGuards(AuthGuard('jwt'))
    async restore(@Body() restoreCustomerEquipmentDto: restoreCustomerEquipmentDTO) {
        return this.customerEquipmentsService.restore(restoreCustomerEquipmentDto);
    }
    @Post('where-dates')
    @UseGuards(AuthGuard('jwt'))
    async whereDates(@Body() customerEquipmentsRangesDto: customerEquipmentsRangesDTO) {
        return this.customerEquipmentsService.findWhereDates(customerEquipmentsRangesDto);
    }
    @Get('new-planifications')
    async newMaintenances() {
        return this.customerEquipmentsService.setPlanifications();
    }
}
