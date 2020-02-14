import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SparePartsService } from './spare-parts.service';
import { createSparePartDTO } from '../../common/dtos/createSparePart.dto';
import { updateSparePartDTO } from '../../common/dtos/updateSparePart.dto';
import { deleteSparePartDTO } from '../../common/dtos/deleteSparePart.dto';
import { restoreSparePartDTO } from '../../common/dtos/restoreSparePart.dto';

@Controller('spare-parts')
@UseGuards(AuthGuard('jwt'))
export class SparePartsController {
    constructor(private sparePartservice: SparePartsService) {}

    @Get('list')
    async list() {
        return this.sparePartservice.list();
    }
    @Get('list-trashed')
    async listTrashed() {
        return this.sparePartservice.listTrashed();
    }
    @Post('create')
    async create(@Body() createSparePartDto: createSparePartDTO) {
        return this.sparePartservice.create(createSparePartDto);
    }
    @Post('update')
    async update(@Body() updateSparePartDto: updateSparePartDTO) {
        return this.sparePartservice.update(updateSparePartDto);
    }
    @Post('delete')
    async delete(@Body() deleteSparePartDto: deleteSparePartDTO) {
        return this.sparePartservice.delete(deleteSparePartDto);
    }
    @Post('restore')
    async restore(@Body() restoreSparePartDto: restoreSparePartDTO) {
        return this.sparePartservice.restore(restoreSparePartDto);
    }

}
