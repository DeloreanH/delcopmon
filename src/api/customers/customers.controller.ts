import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { createCustomerDTO } from '../../common/dtos/createCustomer.dto';
import { updateCustomerDTO } from '../../common/dtos/updateCustomer.dto';
import { deleteCustomerDTO } from '../../common/dtos/deleteCustomer.dto';
import { restoreCustomerDTO } from '../../common/dtos/restoreCustomer.dto';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get('list')
    async list() {
        return this.customerService.list();
    }
    @Get('list-trashed')
    async listTrashed() {
        return this.customerService.listTrashed();
    }
    @Post('create')
    async create(@Body() createCustomerDto: createCustomerDTO) {
        return this.customerService.create(createCustomerDto);
    }
    @Post('update')
    async update(@Body() updateCustomerDto: updateCustomerDTO) {
        return this.customerService.update(updateCustomerDto);
    }
    @Post('delete')
    async delete(@Body() deleteCustomerDto: deleteCustomerDTO) {
        return this.customerService.delete(deleteCustomerDto);
    }
    @Post('restore')
    async restore(@Body() restoreCustomerDto: restoreCustomerDTO) {
        return this.customerService.restore(restoreCustomerDto);
    }

}
