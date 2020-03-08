import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MaintenanceService } from '../../core/services/maintenance.service';
import { createMaintenanceDTO } from '../../common/dtos/createMaintenance.dto';
import { updateMaintenanceDTO } from '../../common/dtos/updateMaintenance.dto';
import { deleteMaintenanceDTO } from '../../common/dtos/deleteMaintenance.dto';
import { restoreMaintenanceDTO } from '../../common/dtos/restoreMaintenance.dto';
import { maintenanceRangesDTO } from '../../common/dtos/maintenanceRanges.dto';

@Controller('maintenance')
@UseGuards(AuthGuard('jwt'))
export class MaintenanceController {
    constructor(private maintenanceService: MaintenanceService) {}

    @Get('list')
    async list() {
        return this.maintenanceService.list();
    }
    @Get('list-trashed')
    async listTrashed() {
        return this.maintenanceService.listTrashed();
    }
    @Post('create')
    async create(@Body() createMaintenanceDto: createMaintenanceDTO) {
        return this.maintenanceService.create(createMaintenanceDto);
    }
    @Post('update')
    async update(@Body() updateMaintenanceDto: updateMaintenanceDTO) {
        return this.maintenanceService.update(updateMaintenanceDto);
    }
    @Post('delete')
    async delete(@Body() deleteMaintenanceDto: deleteMaintenanceDTO) {
        return this.maintenanceService.delete(deleteMaintenanceDto);
    }
    @Post('restore')
    async restore(@Body() restoreMaintenanceDto: restoreMaintenanceDTO) {
        return this.maintenanceService.restore(restoreMaintenanceDto);
    }
    @Post('where-dates')
    async whereDates(@Body() maintenanceRangesDto: maintenanceRangesDTO) {
        return this.maintenanceService.findWhereDates(maintenanceRangesDto);
    }
}
