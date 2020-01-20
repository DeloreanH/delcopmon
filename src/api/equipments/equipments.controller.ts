import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { createEquimentDTO } from '../../common/dtos/createEquipment.dto';
import { updateEquimentDTO } from '../../common/dtos/updateEquipment.dto';
import { deleteEquimentDTO } from '../../common/dtos/deleteEquipment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('equipments')
@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class EquipmentsController {
    constructor(private equipmentsService: EquipmentsService) {}

    @Get('list')
    async list() {
        return this.equipmentsService.list();
    }
    @Post('create')
    async create(@Body() createEquimentDto: createEquimentDTO) {
        return this.equipmentsService.create(createEquimentDto);
    }
    @Post('update')
    async update(@Body() updateEquimentDto: updateEquimentDTO) {
        return this.equipmentsService.update(updateEquimentDto);
    }
    @Post('delete')
    async delete(@Body() deleteEquimentDto: deleteEquimentDTO) {
        return this.equipmentsService.delete(deleteEquimentDto);
    }
}
