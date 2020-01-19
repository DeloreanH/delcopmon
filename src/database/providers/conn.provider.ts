import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const connectionProvider = [
  MongooseModule.forRootAsync({
    useFactory: async (config: ConfigService) => ({
        uri: 'mongodb://'
        + config.get('MONGO_HOST') + ':'
        + config.get('MONGO_PORT') + '/'
        + config.get('MONGO_DB_NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }),
    inject: [ConfigService],
  }),
];
