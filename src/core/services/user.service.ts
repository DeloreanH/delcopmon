import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../common/interfaces/interfaces';
import { modelName } from '../../database/model-names';
import { updateUserDTO } from '../../common/dtos/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(modelName.USER) private userModel: Model<IUser>,
        ) {}

    public async findByProperties(param: any[]): Promise<IUser> {
        return await this.userModel.findOne({ $or: param });
    }
    public async findAll(): Promise<IUser[]> {
        return await this.userModel.find({ deleted: { $ne: true } });
    }
    public async findTrashed(): Promise<IUser[]> {
        return await this.userModel.find({ deleted: { $ne: false } });
    }
    public async findById(id: string): Promise<IUser> {
        return await this.userModel.findOne({_id: id});
    }
    public async showUser(userId: string): Promise<IUser> {
        return await this.userModel.findById(userId);
    }
    public async findByIdOrFail(id: string): Promise<IUser> {
        const user = await this.userModel.findOne({_id: id});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            return user;
        }
    }
    public async findByIdAndUpdate(id: string, data: any): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({_id: id}, data, {new: true} );
    }
    public async createUser(user: any): Promise<IUser> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
    public async updateUser(updateUserDto: updateUserDTO): Promise<IUser> {
        const user = await this.findById(updateUserDto._id);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        } else {
            user.name = updateUserDto.name;
            return await user.save();
        }
    }
    public async findOneByEmail(email: string): Promise<IUser> {
        const clean = email.toLowerCase();
        return await this.userModel.findOne({email: clean});
    }
}
