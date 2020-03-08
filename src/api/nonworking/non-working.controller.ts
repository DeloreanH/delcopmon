import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { INonWorking } from '../../common/interfaces/interfaces';
import { NonWorkingService } from './non-working.service';
import { createNonWorkingDTO } from '../../common/dtos/createNonWorking.dto';
import { updateNonWorkingDTO } from '../../common/dtos/updateNonWorking.dto';
import { deleteNonWorkingDTO } from '../../common/dtos/deleteNonWorking.dto';
import { restoreNonWorkingDTO } from '../../common/dtos/restoreNonWorking.dto';

@Controller('nonworking')

export class NonWorkingController {
    constructor(private nonWorkingService: NonWorkingService) {}

    @Get('list')
    async list(): Promise<INonWorking[]> {
        return this.nonWorkingService.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<INonWorking[]> {
        return this.nonWorkingService.listTrashed();
    }
    @Post('create')
    async create(@Body() createnonWorkingDto: createNonWorkingDTO): Promise<INonWorking> {
        return this.nonWorkingService.create(createnonWorkingDto);
    }
    @Post('update')
    async update(@Body() updatenonWorkingDto: updateNonWorkingDTO): Promise<INonWorking> {
        return this.nonWorkingService.update(updatenonWorkingDto);
    }
    @Post('delete')
    async delete(@Body() deletenonWorkingDto: deleteNonWorkingDTO): Promise<INonWorking> {
        return this.nonWorkingService.delete(deletenonWorkingDto);
    }
    @Post('restore')
    async restore(@Body() restorenonWorkingDto: restoreNonWorkingDTO): Promise<INonWorking> {
        return this.nonWorkingService.restore(restorenonWorkingDto);
    }
}
