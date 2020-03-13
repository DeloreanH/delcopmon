import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICustomer, ICustomerEquipments } from '../../common/interfaces/interfaces';
import { createCustomerDTO } from '../../common/dtos/createCustomer.dto';
import { updateCustomerDTO } from '../../common/dtos/updateCustomer.dto';
import { deleteCustomerDTO } from '../../common/dtos/deleteCustomer.dto';
import { restoreCustomerDTO } from '../../common/dtos/restoreCustomer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(modelName.CUSTOMER) private customerModel: Model<ICustomer>,
        @InjectModel(modelName.CUSTOMER_EQUIPMENTS) private customerEquipmentModel: Model<ICustomerEquipments>,
    ) {}

    public async list(): Promise<ICustomer[]> {
        return await this.customerModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ICustomer[]> {
        return await this.customerModel.find({ deleted: { $ne: false } });
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
            customer.deleted = true;
            const customerEquipments = await this.customerEquipmentModel.find({
                customerId: customer._id },
            );
            if (customerEquipments.length > 0) {
               for (const customerEquipment of customerEquipments) {
                    customerEquipment.deleted = true;
                    await customerEquipment.save();
               }
            }
            return await customer.save();
        }
    }
    public async restore(restoreCustomerDto: restoreCustomerDTO): Promise<ICustomer> {
        const customer = await this.findById(restoreCustomerDto._id);
        if (!customer) {
            throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
        } else {
            customer.deleted = false;
            return await customer.save();
        }
    }
    public async findById(id: string): Promise<ICustomer> {
        return await this.customerModel.findOne({_id: id});
    }
}
