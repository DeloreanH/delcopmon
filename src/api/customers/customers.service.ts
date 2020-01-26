import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICustomer } from '../../common/interfaces/interfaces';
import { createCustomerDTO } from 'src/common/dtos/createCustomer.dto';
import { updateCustomerDTO } from 'src/common/dtos/updateCustomer.dto';
import { deleteCustomerDTO } from 'src/common/dtos/deleteCustomer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(modelName.CUSTOMER) private customerModel: Model<ICustomer>,
    ) {}

    public async list(): Promise<ICustomer[]> {
        return await this.customerModel.find({});
    }
    public async create(createCustomerDto: createCustomerDTO): Promise<ICustomer> {
        const customer = new this.customerModel(createCustomerDto);
        return await customer.save();
    }
    public async update(updateCustomerDto: updateCustomerDTO): Promise<ICustomer> {
        const customer = await this.findById(updateCustomerDto._id);
        if (!customer) {
            throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
        } else {
            customer.customerName     = updateCustomerDto.customerName;
            customer.rif              = updateCustomerDto.rif;
            customer.city             = updateCustomerDto.city;
            customer.state            = updateCustomerDto.state;
            customer.referenceAddress = updateCustomerDto.referenceAddress;
            customer.address          = updateCustomerDto.address;
            return await customer.save();
        }
    }
    public async delete(deleteCustomerDto: deleteCustomerDTO): Promise<ICustomer> {
        const customer = await this.findById(deleteCustomerDto._id);
        if (!customer) {
            throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
        } else {
            return await customer.remove();
        }
    }
    public async findById(id: string): Promise<ICustomer> {
        return await this.customerModel.findOne({_id: id});
    }
}
