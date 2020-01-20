import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { AuthGuard } from '@nestjs/passport';
import { createConfigurationsDTO } from '../../common/dtos/createConfigurations.dto';
import { updateConfigurationsDTO } from '../../common/dtos/updateConfigurations.dto';
import { deleteConfigurationsDTO } from '../../common/dtos/deleteConfigurations.dto';

@Controller('configurations')
@UseGuards(AuthGuard('jwt'))
export class ConfigurationsController {
    constructor(private configurationsService: ConfigurationsService) {}

    @Get('list')
    async list() {
        return this.configurationsService.list();
    }
    @Post('create')
    async create(@Body() createConfigurationsDto: createConfigurationsDTO) {
        return this.configurationsService.create(createConfigurationsDto);
    }
    @Post('update')
    async update(@Body() updateConfigurationsDto: updateConfigurationsDTO) {
        return this.configurationsService.update(updateConfigurationsDto);
    }
    @Post('delete')
    async delete(@Body() deleteConfigurationsDto: deleteConfigurationsDTO) {
        return this.configurationsService.delete(deleteConfigurationsDto);
    }
}
