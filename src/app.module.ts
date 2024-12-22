import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis_base.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './lib/helpers/prisma.extension';
import { ConfigModule } from '@nestjs/config';
import {
  I18nModule,
  AcceptLanguageResolver,
  HeaderResolver,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // CustomPrismaModule.forRootAsync({
    //   name: 'PrismaService',
    //   isGlobal: true,
    //   useFactory: () => {
    //     return extendedPrismaClient;
    //   },
    // }),
    RedisModule,
    I18nModule.forRoot({
      logging: true,
      fallbackLanguage: process.env.FALLBACK_LANGUAGE,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
