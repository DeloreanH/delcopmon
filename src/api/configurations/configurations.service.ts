import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { IConfigurations } from '../../common/interfaces/interfaces';
import { createConfigurationsDTO } from '../../common/dtos/createConfigurations.dto';
import { updateConfigurationsDTO } from '../../common/dtos/updateConfigurations.dto';
import { deleteConfigurationsDTO } from '../../common/dtos/deleteConfigurations.dto';

@Injectable()
export class ConfigurationsService {

    constructor(
        @InjectModel(modelName.CONFIGURATIONS) private configurationsModel: Model<IConfigurations>,
    ) {}

    public async list(): Promise<IConfigurations[]> {
        return await this.configurationsModel.find({});
    }
    public async create(createConfigurationsDto: createConfigurationsDTO): Promise<IConfigurations> {
        const customer = new this.configurationsModel(createConfigurationsDto);
        return await customer.save();
    }
    public async update(updateConfigurationsDto: updateConfigurationsDTO): Promise<IConfigurations> {
        const configurations = await this.findById(updateConfigurationsDto._id);
        if (!configurations) {
            throw new HttpException('configurations not found', HttpStatus.BAD_REQUEST);
        } else {
            configurations.name  = updateConfigurationsDto.name;
            configurations.value = updateConfigurationsDto.value;
            return await configurations.save();
        }
    }
    public async delete(deleteConfigurationsDto: deleteConfigurationsDTO): Promise<IConfigurations> {
        const configurations = await this.findById(deleteConfigurationsDto._id);
        if (!configurations) {
            throw new HttpException('configurations not found', HttpStatus.BAD_REQUEST);
        } else {
            return await configurations.remove();
        }
    }
    public async findById(id: string): Promise<IConfigurations> {
        return await this.configurationsModel.findOne({_id: id});
    }

}
