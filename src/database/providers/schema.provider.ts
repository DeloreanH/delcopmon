import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { userSchema } from '../../database/schemas/user.schema';
import { sesionSchema } from '../schemas/sesion.schema';
import { passwordResetSchema } from '../schemas/passwordReset.schema';
import { ConfigurationSchema } from '../schemas/configuration.schema';
import { CustomerSchema } from '../schemas/customer.schema';
import { CustomerEquipmentSchema } from '../schemas/customerEquipments.schema';
import { EquipmentSchema } from '../schemas/equipment.schema';
import { MaintenanceSchema } from '../schemas/maintenance.schema';
import { NonworkingSchema } from '../schemas/nonworking.schema';

export const schemaProvider = [
    MongooseModule.forFeature([
        { name: modelName.USER, schema: userSchema },
        { name: modelName.SESION, schema: sesionSchema },
        { name: modelName.PASSWORD_RESET, schema: passwordResetSchema },
        { name: modelName.CONFIGURATIONS, schema: ConfigurationSchema },
        { name: modelName.CUSTOMER, schema: CustomerSchema },
        { name: modelName.CUSTOMER_EQUIPMENTS, schema: CustomerEquipmentSchema },
        { name: modelName.EQUIPMENT, schema: EquipmentSchema},
        { name: modelName.MAINTENANCE, schema: MaintenanceSchema},
        { name: modelName.NONWORKING, schema: NonworkingSchema},
    ]),
  ];
