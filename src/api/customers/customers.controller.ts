import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { createCustomerDTO } from '../../common/dtos/createCustomer.dto';
import { updateCustomerDTO } from 'src/common/dtos/updateCustomer.dto';
import { deleteCustomerDTO } from 'src/common/dtos/deleteCustomer.dto';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get('list')
    async list() {
        return this.customerService.list();
    }
    @Post('create')
    async create(@Body() createCustomeDto: createCustomerDTO) {
        return this.customerService.create(createCustomeDto);
    }
    @Post('update')
    async update(@Body() updateCustomeDto: updateCustomerDTO) {
        return this.customerService.update(updateCustomeDto);
    }
    @Post('delete')
    async delete(@Body() deleteCustomeDto: deleteCustomerDTO) {
        return this.customerService.delete(deleteCustomeDto);
    }

}
