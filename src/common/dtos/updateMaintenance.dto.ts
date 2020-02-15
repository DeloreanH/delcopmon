import { PartDTO } from './part.dto';
export class updateMaintenanceDTO {
    readonly _id: string;
    readonly name: string;
    readonly date: Date;
    readonly customerId: string;
    readonly customerEquipmentsId: string;
    readonly userId: string;
    readonly spare: {
        parts: [PartDTO],
    } | null;
    readonly maintenanceType: string;
    readonly priority: string;
    readonly description: string;
}
