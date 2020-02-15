import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { CustomerEquipmentsModule } from './customer-equipments/customer-equipments.module';
import { NonWorkingModule } from './nonworking/non-working.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
    imports: [
        CustomersModule,
        ConfigurationsModule,
        EquipmentsModule,
        NonWorkingModule,
        AdminModule,
        UsersModule,
        SparePartsModule,
        MaintenanceModule,
        CustomerEquipmentsModule,
    ],
})
export class ApiModule {}
