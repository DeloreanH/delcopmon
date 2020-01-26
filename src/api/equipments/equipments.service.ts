import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { createEquimentDTO } from '../../common/dtos/createEquipment.dto';
import { IEquipment } from '../../common/interfaces/interfaces';
import { updateEquimentDTO } from '../../common/dtos/updateEquipment.dto';
import { deleteEquimentDTO } from '../../common/dtos/deleteEquipment.dto';

@Injectable()
export class EquipmentsService {
    constructor(
        @InjectModel(modelName.EQUIPMENT) private equipmentModel: Model<IEquipment>,
    ) {}

    public async list(): Promise<IEquipment[]> {
        return await this.equipmentModel.find({});
    }
    public async create(createEquimentDto: createEquimentDTO): Promise<IEquipment> {
        const equipment = new this.equipmentModel(createEquimentDto);
        return await equipment.save();
    }
    public async update(updateEquimentDto: updateEquimentDTO): Promise<IEquipment> {
        const equipment = await this.findById(updateEquimentDto._id);
        if (!equipment) {
            throw new HttpException('equipment not found', HttpStatus.BAD_REQUEST);
        } else {
            equipment.modell = updateEquimentDto.modell;
            equipment.code   = updateEquimentDto.code;
            equipment.name   = updateEquimentDto.name;
            equipment.brand  = updateEquimentDto.brand;
            return await equipment.save();
        }
    }
    public async delete(deleteEquimentDto: deleteEquimentDTO): Promise<IEquipment> {
        const equipment = await this.findById(deleteEquimentDto._id);
        if (!equipment) {
            throw new HttpException('equipment not found', HttpStatus.BAD_REQUEST);
        } else {
            return await equipment.remove();
        }
    }
    public async findById(id: string): Promise<IEquipment> {
        return await this.equipmentModel.findOne({_id: id});
    }

}
