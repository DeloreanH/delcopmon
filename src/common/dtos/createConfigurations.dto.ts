import { configurationsDTO } from './configurations.dto';
import { IsNotEmpty, IsArray  } from 'class-validator';

export class createConfigurationsDTO {
    @IsNotEmpty()
    @IsArray()
    readonly configurations: configurationsDTO[];
}
