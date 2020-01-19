import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { EquipmentsModule } from './equipments/equipments.module';

@Module({
    imports: [
        CustomersModule,
        ConfigurationsModule,
        EquipmentsModule,
    ],
})
export class ApiModule {}
