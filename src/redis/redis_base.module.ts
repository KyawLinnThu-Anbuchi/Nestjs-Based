import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<string>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASSWORD');
        //:${redisPassword}@
        const redisUrl = `redis://${redisHost}:${redisPort}`;
        const client = createClient({ url: redisUrl });
        client.on('error', (err) => {
          console.error('Redis client error:', err);
        });
        try {
          await client.connect();
          console.log('REDIS CLIENT CONNECT SUCCESSFULLY');
          return client;
        } catch (error) {
          console.error('Failed to connect to Redis:', error);
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
