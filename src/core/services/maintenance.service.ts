import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelName } from '../../database/model-names';
import { IMaintenance } from '../../common/interfaces/interfaces';
import { createMaintenanceDTO } from '../../common/dtos/createMaintenance.dto';
import { updateMaintenanceDTO } from '../../common/dtos/updateMaintenance.dto';
import { deleteMaintenanceDTO } from '../../common/dtos/deleteMaintenance.dto';
import { restoreMaintenanceDTO } from '../../common/dtos/restoreMaintenance.dto';
import { maintenanceRangesDTO } from '../../common/dtos/maintenanceRanges.dto';

@Injectable()
export class MaintenanceService {
    constructor(
        @InjectModel(modelName.MAINTENANCE) private maintenanceModel: Model<IMaintenance>,
    ) {}

    public async list(): Promise<IMaintenance[]> {
        return await this.maintenanceModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<IMaintenance[]> {
        return await this.maintenanceModel.find({ deleted: { $ne: false } });
    }
    public async create(createMaintenanceDto: createMaintenanceDTO): Promise<IMaintenance> {
        const maintenance = new this.maintenanceModel(createMaintenanceDto);
        return await maintenance.save();
    }
    public async update(updateMaintenanceDto: updateMaintenanceDTO): Promise<IMaintenance> {
        const maintenance = await this.findById(updateMaintenanceDto._id);
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.BAD_REQUEST);
        } else {
            maintenance.date                 = updateMaintenanceDto.date;
            maintenance.customerId           = updateMaintenanceDto.customerId;
            maintenance.customerEquipmentsId = updateMaintenanceDto.customerEquipmentsId;
            maintenance.userId               = updateMaintenanceDto.userId;
            maintenance.maintenanceType      = updateMaintenanceDto.maintenanceType;
            maintenance.priority             = updateMaintenanceDto.priority;
            maintenance.parts                = updateMaintenanceDto.parts;
            maintenance.equipmentStatus      = updateMaintenanceDto.equipmentStatus;
            maintenance.description          = updateMaintenanceDto.description;
            return await maintenance.save();
        }
    }
    public async delete(deleteMaintenanceDto: deleteMaintenanceDTO): Promise<IMaintenance> {
        const maintenance = await this.findById(deleteMaintenanceDto._id);
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.BAD_REQUEST);
        } else {
            maintenance.deleted = true;
            return await maintenance.save();
        }
    }
    public async restore(restoreMaintenanceDto: restoreMaintenanceDTO): Promise<IMaintenance> {
        const maintenance = await this.findById(restoreMaintenanceDto._id);
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.BAD_REQUEST);
        } else {
            maintenance.deleted = false;
            return await maintenance.save();
        }
    }
    public async findById(id: string): Promise<IMaintenance> {
        return await this.maintenanceModel.findOne({_id: id});
    }
    public async findWhereDates(maintenanceRangesDto: maintenanceRangesDTO) {
        return await this.maintenanceModel.find({
            date: {
                $gte: maintenanceRangesDto.startDate,
                $lt:  maintenanceRangesDto.endDate,
            },
        });
    }

    async byDayCustomerCounter( date: string, customerId: string): Promise<number> {
        const maintenances = await this.maintenanceModel.find({
            date: new Date(date),
            customerId,
        });
        return maintenances.length;
    }
    async byDayMaintenanceCounter(date: string): Promise<number> {
        const maintenances = await this.maintenanceModel.find({
            date: new Date(date),
        });
        return maintenances.length;
    }
}
