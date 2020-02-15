import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICustomerEquipments } from '../../common/interfaces/interfaces';
import { createCustomerEquipmentDTO } from '../../common/dtos/createCustomerEquipment.dto';
import { updateCustomerEquipmentDTO } from '../../common/dtos/updateCustomerEquipment.dto';
import { deleteCustomerEquipmentDTO } from '../../common/dtos/deleteCustomerEquipment.dto';
import { restoreCustomerEquipmentDTO } from '../../common/dtos/restoreCustomerEquipment.dto';

@Injectable()
export class CustomerEquipmentsService {
    constructor(
        @InjectModel(modelName.CUSTOMER_EQUIPMENTS) private customerEquipmentModel: Model<ICustomerEquipments>,
    ) {}

    public async list(): Promise<ICustomerEquipments[]> {
        return await this.customerEquipmentModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ICustomerEquipments[]> {
        return await this.customerEquipmentModel.find({ deleted: { $ne: false } });
    }
    public async create(createCustomerEquipmentDto: createCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = new this.customerEquipmentModel(createCustomerEquipmentDto);
        return await customerEquipment.save();
    }
    public async update(updateCustomerEquipmentDto: updateCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(updateCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            customerEquipment.customerId  = updateCustomerEquipmentDto.customerId;
            customerEquipment.equipmentId = updateCustomerEquipmentDto.equipmentId;
            customerEquipment.serial      = updateCustomerEquipmentDto.serial;
            customerEquipment.date        = updateCustomerEquipmentDto.date;
            customerEquipment.condition   = updateCustomerEquipmentDto.condition;
            return await customerEquipment.save();
        }
    }
    public async delete(deleteCustomerEquipmentDto: deleteCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(deleteCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            customerEquipment.deleted = true;
            return await customerEquipment.save();
        }
    }
    public async restore(restoreCustomerEquipmentDto: restoreCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(restoreCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            customerEquipment.deleted = false;
            return await customerEquipment.save();
        }
    }
    public async findById(id: string): Promise<ICustomerEquipments> {
        return await this.customerEquipmentModel.findOne({_id: id});
    }
}
