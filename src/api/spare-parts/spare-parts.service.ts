import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ISparePart } from '../../common/interfaces/interfaces';
import { createSparePartDTO } from '../../common/dtos/createSparePart.dto';
import { updateSparePartDTO } from '../../common/dtos/updateSparePart.dto';
import { deleteSparePartDTO } from '../../common/dtos/deleteSparePart.dto';
import { restoreSparePartDTO } from '../../common/dtos/restoreSparePart.dto';

@Injectable()
export class SparePartsService {
    constructor(
        @InjectModel(modelName.SPARE_PARTS) private sparePartModel: Model<ISparePart>,
    ) {}

    public async list(): Promise<ISparePart[]> {
        return await this.sparePartModel.find({ deleted: { $ne: true } });
    }
    public async count(): Promise<number> {
        return await this.sparePartModel.count({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ISparePart[]> {
        return await this.sparePartModel.find({ deleted: { $ne: false } });
    }
    public async create(createSparePartDto: createSparePartDTO): Promise<ISparePart> {
        const sparePartCounter = await this.count();
        if (sparePartCounter > 20) {
            throw new HttpException('spare parts reach limit of 20', HttpStatus.BAD_REQUEST);
        }
        const sparePart = new this.sparePartModel(createSparePartDto);
        return await sparePart.save();
    }
    public async update(updateSparePartDto: updateSparePartDTO): Promise<ISparePart> {
        const sparePart = await this.findById(updateSparePartDto._id);
        if (!sparePart) {
            throw new HttpException('spare part not found', HttpStatus.BAD_REQUEST);
        } else {
            sparePart.name = updateSparePartDto.name;
            return await sparePart.save();
        }
    }
    public async delete(deleteSparePartDto: deleteSparePartDTO): Promise<ISparePart> {
        const sparePart = await this.findById(deleteSparePartDto._id);
        if (!sparePart) {
            throw new HttpException('spare part not found', HttpStatus.BAD_REQUEST);
        } else {
            sparePart.deleted = true;
            return await sparePart.save();
        }
    }
    public async restore(restoreSparePartDto: restoreSparePartDTO): Promise<ISparePart> {
        const sparePart = await this.findById(restoreSparePartDto._id);
        if (!sparePart) {
            throw new HttpException('spare part not found', HttpStatus.BAD_REQUEST);
        } else {
            sparePart.deleted = false;
            return await sparePart.save();
        }
    }
    public async findById(id: string): Promise<ISparePart> {
        return await this.sparePartModel.findOne({_id: id});
    }
}
