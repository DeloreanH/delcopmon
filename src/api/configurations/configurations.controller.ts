import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { AuthGuard } from '@nestjs/passport';
import { createConfigurationsDTO } from '../../common/dtos/createConfigurations.dto';
import { IConfigurations } from '../../common/interfaces/interfaces';

@Controller('configurations')
@UseGuards(AuthGuard('jwt'))
export class ConfigurationsController {
    constructor(private configurationsService: ConfigurationsService) {}

    @Get('list')
    async list(): Promise<IConfigurations[]> {
        return this.configurationsService.list();
    }
    @Post('set-config')
    async setConfig(@Body() createConfigurationsDto: createConfigurationsDTO): Promise<IConfigurations[]> {
        return this.configurationsService.setConfig(createConfigurationsDto);
    }
}
