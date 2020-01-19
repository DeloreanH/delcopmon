import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICustomer } from '../../common/interfaces/interfaces';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(modelName.CUSTOMER) private customerModel: Model<ICustomer>,
    ){}
}
