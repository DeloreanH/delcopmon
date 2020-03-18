import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { createEquimentDTO } from '../../common/dtos/createEquipment.dto';
import { IEquipment } from '../../common/interfaces/interfaces';
import { updateEquimentDTO } from '../../common/dtos/updateEquipment.dto';
import { deleteEquimentDTO } from '../../common/dtos/deleteEquipment.dto';
import { restoreEquimentDTO } from '../../common/dtos/restoreEquipment.dto';

@Injectable()
export class EquipmentsService {
    constructor(
        @InjectModel(modelName.EQUIPMENT) private equipmentModel: Model<IEquipment>,
    ) {}

    public async list(): Promise<IEquipment[]> {
        return await this.equipmentModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<IEquipment[]> {
        return await this.equipmentModel.find({ deleted: { $ne: false } });
    }
    public async create(createEquimentDto: createEquimentDTO): Promise<IEquipment> {
        const isMatchModell  = await this.findByModel(createEquimentDto.modell);
        const isMatchCode    = await this.findByCode(createEquimentDto.code);
        if (isMatchModell) {
            throw new HttpException('Modell already registered', HttpStatus.BAD_REQUEST);
        }
        if (isMatchCode) {
            throw new HttpException('Code already registered', HttpStatus.BAD_REQUEST);
        }
        const equipment = new this.equipmentModel(createEquimentDto);
        return await equipment.save();
    }
    public async update(updateEquimentDto: updateEquimentDTO): Promise<IEquipment> {
        const equipment = await this.findById(updateEquimentDto._id);
        if (!equipment) {
            throw new HttpException('equipment not found', HttpStatus.BAD_REQUEST);
        } else {
            const isMatchModell  = await this.findByModel(updateEquimentDto.modell);
            const isMatchCode    = await this.findByCode(updateEquimentDto.code);
            if ( isMatchModell && !equipment._id.equals(isMatchModell._id)) {
                throw new HttpException('Modell already registered', HttpStatus.BAD_REQUEST);
            }
            if ( isMatchCode  && !equipment._id.equals(isMatchCode._id)) {
                throw new HttpException('Code already registered', HttpStatus.BAD_REQUEST);
            }
            equipment.modell = updateEquimentDto.modell;
            equipment.code   = updateEquimentDto.code;
            equipment.brand  = updateEquimentDto.brand;
            return await equipment.save();
        }
    }
    public async delete(deleteEquimentDto: deleteEquimentDTO): Promise<IEquipment> {
        const equipment = await this.findById(deleteEquimentDto._id);
        if (!equipment) {
            throw new HttpException('equipment not found', HttpStatus.BAD_REQUEST);
        } else {
            equipment.deleted = true;
            return await equipment.save();
        }
    }
    public async restore(restoreEquimentDto: restoreEquimentDTO): Promise<IEquipment> {
        const equipment = await this.findById(restoreEquimentDto._id);
        if (!equipment) {
            throw new HttpException('equipment not found', HttpStatus.BAD_REQUEST);
        } else {
            equipment.deleted = false;
            return await equipment.save();
        }
    }
    public async findById(id: string): Promise<IEquipment> {
        return await this.equipmentModel.findOne({_id: id});
    }
    public async findByModel(modell: string): Promise<IEquipment> {
        const clean = modell.toLowerCase();
        return await this.equipmentModel.findOne({ modell: clean});
    }
    public async findByCode(code: string): Promise<IEquipment> {
        const clean = code.toLowerCase();
        return await this.equipmentModel.findOne({ code: clean});
    }
}
