import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { INonWorking } from '../../common/interfaces/interfaces';
import { createNonWorkingDTO } from '../../common/dtos/createNonWorking.dto';
import { updateNonWorkingDTO } from '../../common/dtos/updateNonWorking.dto';
import { deleteNonWorkingDTO } from '../../common/dtos/deleteNonWorking.dto';
import { restoreNonWorkingDTO } from '../../common/dtos/restoreNonWorking.dto';

@Injectable()
export class NonWorkingService {
    constructor(
        @InjectModel(modelName.NONWORKING) private NonWorkingModel: Model<INonWorking>,
    ) {}

    public async list(): Promise<INonWorking[]> {
        return await this.NonWorkingModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<INonWorking[]> {
        return await this.NonWorkingModel.find({ deleted: { $ne: false } });
    }
    public async create(createNonWorkingDto: createNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = new this.NonWorkingModel(createNonWorkingDto);
        return await NonWorking.save();
    }
    public async update(updateNonWorkingDto: updateNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = await this.findById(updateNonWorkingDto._id);
        if (!NonWorking) {
            throw new HttpException('NonWorking not found', HttpStatus.BAD_REQUEST);
        } else {
            NonWorking.date = updateNonWorkingDto.date;
            NonWorking.description = updateNonWorkingDto.description;
            return await NonWorking.save();
        }
    }
    public async delete(deleteNonWorkingDto: deleteNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = await this.findById(deleteNonWorkingDto._id);
        if (!NonWorking) {
            throw new HttpException('NonWorking not found', HttpStatus.BAD_REQUEST);
        } else {
            NonWorking.deleted = true;
            return await NonWorking.save();
        }
    }
    public async restore(restoreNonWorkingDto: restoreNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = await this.findById(restoreNonWorkingDto._id);
        if (!NonWorking) {
            throw new HttpException('NonWorking not found', HttpStatus.BAD_REQUEST);
        } else {
            NonWorking.deleted = false;
            return await NonWorking.save();
        }
    }
    public async findById(id: string): Promise<INonWorking> {
        return await this.NonWorkingModel.findOne({_id: id});
    }
}
