import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { createCustomerDTO } from '../../common/dtos/createCustomer.dto';
import { updateCustomerDTO } from '../../common/dtos/updateCustomer.dto';
import { deleteCustomerDTO } from '../../common/dtos/deleteCustomer.dto';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get('list')
    async list() {
        return this.customerService.list();
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

}
