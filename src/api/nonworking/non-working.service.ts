import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { INonWorking } from '../../common/interfaces/interfaces';
import { createNonWorkingDTO } from '../../common/dtos/createNonWorking.dto';
import { updateNonWorkingDTO } from '../../common/dtos/updateNonWorking.dto';
import { deleteNonWorkingDTO } from '../../common/dtos/deleteNonWorking.dto';

@Injectable()
export class NonWorkingService {
    constructor(
        @InjectModel(modelName.NONWORKING) private NonWorkingModel: Model<INonWorking>,
    ) {}

    public async list(): Promise<INonWorking[]> {
        return await this.NonWorkingModel.find({});
    }
    public async create(createNonWorkingDto: createNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = new this.NonWorkingModel(createNonWorkingDto);
        return await NonWorking.save();
    }
    public async update(updateNonWorkingDto: updateNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = await this.findById(updateNonWorkingDto.id);
        if (!NonWorking) {
            throw new HttpException('NonWorking not found', HttpStatus.BAD_REQUEST);
        } else {
            NonWorking.date = updateNonWorkingDto.date;
            NonWorking.description = updateNonWorkingDto.description;
            return await NonWorking.save();
        }
    }
    public async delete(deleteNonWorkingDto: deleteNonWorkingDTO): Promise<INonWorking> {
        const NonWorking = await this.findById(deleteNonWorkingDto.id);
        if (!NonWorking) {
            throw new HttpException('NonWorking not found', HttpStatus.BAD_REQUEST);
        } else {
            return await NonWorking.remove();
        }
    }
    public async findById(id: string): Promise<INonWorking> {
        return await this.NonWorkingModel.findOne({_id: id});
    }
}
