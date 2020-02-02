import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EquipmentsService } from './equipments.service';
import { createEquimentDTO } from '../../common/dtos/createEquipment.dto';
import { updateEquimentDTO } from '../../common/dtos/updateEquipment.dto';
import { deleteEquimentDTO } from '../../common/dtos/deleteEquipment.dto';
import { restoreEquimentDTO } from '../../common/dtos/restoreEquipment.dto';

@Controller('equipments')
@UseGuards(AuthGuard('jwt'))
export class EquipmentsController {
    constructor(private equipmentsService: EquipmentsService) {}

    @Get('list')
    async list() {
        return this.equipmentsService.list();
    }
    @Get('list-trashed')
    async listTrashed() {
        return this.equipmentsService.listTrashed();
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
    @Post('restore')
    async restore(@Body() restoreEquimentDto: restoreEquimentDTO) {
        return this.equipmentsService.restore(restoreEquimentDto);
    }
}
