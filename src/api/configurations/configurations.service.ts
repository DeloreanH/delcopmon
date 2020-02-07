import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { IConfigurations } from '../../common/interfaces/interfaces';
import { createConfigurationsDTO } from '../../common/dtos/createConfigurations.dto';

@Injectable()
export class ConfigurationsService {

    constructor(
        @InjectModel(modelName.CONFIGURATIONS) private configurationsModel: Model<IConfigurations>,
    ) {}

    public async list(): Promise<IConfigurations[]> {
        return await this.configurationsModel.find({ deleted: { $ne: true } });
    }
    public async setConfig(data: createConfigurationsDTO): Promise<IConfigurations[]> {
        await this.configurationsModel.remove({});
        return await this.configurationsModel.insertMany(data.configurations);
    }
}
