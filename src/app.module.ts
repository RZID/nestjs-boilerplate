import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import BookmarkModule from './bookmark/bookmark.module';
import PrismaModule from './prisma/prisma.module';

const APP_ENV = process.env.APP_ENV || 'dev';
const envFilePath = `config/.env.${APP_ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),

    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: true,
      environment: process.env.APP_ENV,
      logLevels: ['debug'],
    }),

    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
  ],
})
export default class AppModule {}
