import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICustomerEquipments, IConfigurations, INonWorking, IPart } from '../../common/interfaces/interfaces';
import { createCustomerEquipmentDTO } from '../../common/dtos/createCustomerEquipment.dto';
import { updateCustomerEquipmentDTO } from '../../common/dtos/updateCustomerEquipment.dto';
import { deleteCustomerEquipmentDTO } from '../../common/dtos/deleteCustomerEquipment.dto';
import { restoreCustomerEquipmentDTO } from '../../common/dtos/restoreCustomerEquipment.dto';
import { customerEquipmentsRangesDTO } from '../../common/dtos/customerEquipmentsRanges.dto';
import * as moment from 'moment';
import { MaintenanceService } from '../../core/services/maintenance.service';
import { createMaintenanceDTO } from '../../common/dtos/createMaintenance.dto';

@Injectable()
export class CustomerEquipmentsService {
    private configurations: IConfigurations[] = [];
    private nonWorking: INonWorking[] = [];
    constructor(
        @InjectModel(modelName.CUSTOMER_EQUIPMENTS) private customerEquipmentModel: Model<ICustomerEquipments>,
        @InjectModel(modelName.CONFIGURATIONS) private configurationsModel: Model<IConfigurations>,
        @InjectModel(modelName.NONWORKING) private nonWorkingModel: Model<INonWorking>,
        private maintenanceService: MaintenanceService,
    ) {}

    public async list(): Promise<ICustomerEquipments[]> {
        return await this.customerEquipmentModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ICustomerEquipments[]> {
        return await this.customerEquipmentModel.find({ deleted: { $ne: false } });
    }
    public async create(createCustomerEquipmentDto: createCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        if (['Parcialmente operativo', 'Operativo', 'No operativo'].indexOf(createCustomerEquipmentDto.equipmentStatus) === -1) {
            throw new HttpException('choose a valid equipment status', HttpStatus.BAD_REQUEST);
        }
        if (createCustomerEquipmentDto.equipmentStatus === 'Parcialmente operativo' && createCustomerEquipmentDto.parts.length <= 0) {
            throw new HttpException('parcial type need parts', HttpStatus.BAD_REQUEST);
        }
        if (createCustomerEquipmentDto.equipmentStatus !== 'Parcialmente operativo' && createCustomerEquipmentDto.parts.length > 0) {
            throw new HttpException('parts are only valid in parcial type', HttpStatus.BAD_REQUEST);
        }
        const customerEquipment = new this.customerEquipmentModel(createCustomerEquipmentDto);
        return await customerEquipment.save();
    }
    public async update(updateCustomerEquipmentDto: updateCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(updateCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            if (['Parcialmente operativo', 'Operativo', 'No operativo'].indexOf(updateCustomerEquipmentDto.equipmentStatus) === -1) {
                throw new HttpException('choose a valid equipment status', HttpStatus.BAD_REQUEST);
            }
            if (updateCustomerEquipmentDto.equipmentStatus === 'Parcialmente operativo' && updateCustomerEquipmentDto.parts.length <= 0) {
                throw new HttpException('parcial type need parts', HttpStatus.BAD_REQUEST);
            }
            if (updateCustomerEquipmentDto.equipmentStatus !== 'Parcialmente operativo' && updateCustomerEquipmentDto.parts.length > 0) {
                throw new HttpException('parts are only valid in parcial type', HttpStatus.BAD_REQUEST);
            }
            customerEquipment.customerId  = updateCustomerEquipmentDto.customerId;
            customerEquipment.equipmentId = updateCustomerEquipmentDto.equipmentId;
            customerEquipment.serial      = updateCustomerEquipmentDto.serial;
            customerEquipment.lastUpdated = updateCustomerEquipmentDto.lastUpdated;
            customerEquipment.parts       = updateCustomerEquipmentDto.parts;
            customerEquipment.equipmentStatus       = updateCustomerEquipmentDto.equipmentStatus;
            customerEquipment.lastUpdated = updateCustomerEquipmentDto.lastUpdated;
            customerEquipment.adquisitionDate   = updateCustomerEquipmentDto.adquisitionDate;
            return await customerEquipment.save();
        }
    }
    private async markasPlanified(updateCustomerEquipmentId: string): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(updateCustomerEquipmentId);
        customerEquipment.planified = true;
        return await customerEquipment.save();
    }
    public async delete(deleteCustomerEquipmentDto: deleteCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(deleteCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            customerEquipment.deleted = true;
            return await customerEquipment.save();
        }
    }
    public async restore(restoreCustomerEquipmentDto: restoreCustomerEquipmentDTO): Promise<ICustomerEquipments> {
        const customerEquipment = await this.findById(restoreCustomerEquipmentDto._id);
        if (!customerEquipment) {
            throw new HttpException('customerEquipment not found', HttpStatus.BAD_REQUEST);
        } else {
            customerEquipment.deleted = false;
            return await customerEquipment.save();
        }
    }
    public async findWhereDates(customerEquipmentsRangesDto: customerEquipmentsRangesDTO) {
        return await this.customerEquipmentModel.find({
            lastUpdated: {
                $gte: customerEquipmentsRangesDto.startDate,
                $lt:  customerEquipmentsRangesDto.endDate,
            },
        });
    }
    public async setPlanifications() {
        try {
            let collection: ICustomerEquipments[] = [];
            this.configurations = await this.configurationsModel.find({});
            this.nonWorking     = await this.nonWorkingModel.find({});
            collection  = await this.customerEquipmentModel.find({
                equipmentStatus: {
                    $ne: 'No operativo',
                },
                planified: {
                    $ne: true,
                },
            });
            if (collection.length > 0) {
                for (const customerEquipment of collection) {
                    if (customerEquipment.equipmentStatus === 'Operativo') {
                        const initialDate = moment(customerEquipment.lastUpdated).add(1, 'months').format('YYYY-MM-DD');
                        const date = await this.validMaintenaceDate(initialDate, customerEquipment.customerId);
                        const newMaintenace: createMaintenanceDTO = {
                            date,
                            customerId:  customerEquipment.customerId,
                            customerEquipmentsId: customerEquipment._id,
                            maintenanceType: 'Preventivo',
                             userId: null,
                             priority: null,
                             description: null,
                        };
                        await this.maintenanceService.create(newMaintenace);
                        await this.markasPlanified(customerEquipment._id);
                    }
                    if (customerEquipment.equipmentStatus === 'Parcialmente operativo') {
                        const days: number = this.ExponentialCalculation(
                            this.OrderParts(customerEquipment.parts),
                          );
                        const initialDate = moment(customerEquipment.lastUpdated).add(days, 'days').format('YYYY-MM-DD');
                        const date = await this.validMaintenaceDate(initialDate, customerEquipment.customerId);
                        const newMaintenace: createMaintenanceDTO = {
                            date,
                            customerId:  customerEquipment.customerId,
                            customerEquipmentsId: customerEquipment._id,
                            maintenanceType: 'Preventivo',
                             userId: null,
                             priority: null,
                             description: null,
                        };
                        await this.maintenanceService.create(newMaintenace);
                        await this.markasPlanified(customerEquipment._id);
                    }
                  }
            }
            return 'ok';
        } catch (error) {
            throw new HttpException(error , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validMaintenaceDate(date: string, customerId: string) {
        const maxCustomer = this.configurations.find( data =>  data.name === 'maxCustomer');
        const maxDay      = this.configurations.find( data =>  data.name === 'maxDay');
        const dayOff      = this.configurations.find( data => data.name === moment(date).format('dddd') );
        const customerMaintenanceDayCounter = await this.maintenanceService.byDayCustomerCounter(date, customerId);
        const maintenanceDayCounter         = await this.maintenanceService.byDayMaintenanceCounter(date);
        const nonWorking = this.nonWorking.find( (nonWorkingDay: INonWorking) => moment(date).isSame(nonWorkingDay.date));
        if (dayOff.value.value) {
            if (typeof nonWorking === 'undefined') {
                if ( maintenanceDayCounter <= maxDay.value.value) {
                    if (customerMaintenanceDayCounter <= maxCustomer.value.value) {
                        return date;
                    } else {
                        this.validMaintenaceDate(moment(date).add(1, 'days').format('YYYY-M-DD'), customerId);
                    }
                } else {
                    this.validMaintenaceDate(moment(date).add(1, 'days').format('YYYY-M-DD'), customerId);
                }
            } else {
                this.validMaintenaceDate(moment(date).add(1, 'days').format('YYYY-M-DD'), customerId);
            }
        } else {
            this.validMaintenaceDate(moment(date).add(1, 'days').format('YYYY-M-DD'), customerId);
        }
    }

    private OrderParts(myParts: IPart[]): IPart[] {
        const newParts = myParts.sort((a, b) => {
          const myA = new Date(a.partDate);
          const myB = new Date(b.partDate);
          return myA >  myB ? -1 : myA < myB ? 1 : 0;
        });
        newParts.forEach(
          (myPart) => {
            const today = moment(new Date());
            const myDate = moment(myPart.partDate);
            myPart.days  = myDate.diff(today, 'days');
          },
        );
        return newParts;
    }
    private ExponentialCalculation(myParts: IPart[]): number {
        const partsTotal = myParts.length;
        const constTop = 0.3;
        const constBottom = 0.4;
        const myResult: Array<{f: number, r: number, lnR: number}> = [];
        let tTotal = 0;
        let lnRTotal = 0;
        let tLnRTotal = 0;
        let tTotal2 = 0;
        myParts.forEach(
          (myPart, index) => {
            const myF = (((index + 1) - constTop) / (partsTotal - constBottom));
            const myR = (1 - myF);
            const myLnR = Math.log(myR);
            tTotal = tTotal + myPart.days;
            tLnRTotal = tLnRTotal + (myPart.days * myLnR);
            lnRTotal = lnRTotal + myLnR;
            tTotal2 = tTotal2 + (myPart.days * myPart.days);
            myResult.push({
              f: myF,
              r: myR,
              lnR: myLnR,
            });
          },
        );
        const landa = ((partsTotal * tLnRTotal) - (tTotal * lnRTotal)) / ((partsTotal * tTotal2) - (tTotal * tTotal));
        const mtbf = 1 / (Math.abs(landa));
        const rT = Math.exp(-(landa * 30)) * 100;
        if (Math.round(rT) >= 15) {
          return mtbf;
        } else {
          return 30;
        }
      }

    public async findById(id: string): Promise<ICustomerEquipments> {
        return await this.customerEquipmentModel.findOne({_id: id});
    }
}
