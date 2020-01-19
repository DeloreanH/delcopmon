import { Module, Global } from '@nestjs/common';
import { connectionProvider } from './providers/conn.provider';
import { schemaProvider } from './providers/schema.provider';

@Global()
@Module({
    imports: [
       ...connectionProvider,
       ...schemaProvider,
    ],
    exports: [
        ...connectionProvider,
        ...schemaProvider,
    ],
})
export class DatabaseModule {}
