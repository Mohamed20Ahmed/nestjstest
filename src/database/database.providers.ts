import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://TrendX:Qbh7N004uAx2W2HU@cluster.cth27iu.mongodb.net/',
      ),
  },
];
