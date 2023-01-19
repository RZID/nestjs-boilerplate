import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import BookmarkModule from './bookmark/bookmark.module';
import PrismaModule from './prisma/prisma.module';

const APP_ENV = process.env.APP_ENV || 'local';
const envFilePath = `config/.env.${APP_ENV}`;

const imports = [
  ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  AuthModule,
  UserModule,
  BookmarkModule,
  PrismaModule,
];
const providers = [];

// implement sentry.io except env is local
if (process.env.APP_ENV !== 'local') {
  imports.push(
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: true,
      environment: process.env.APP_ENV,
      logLevels: ['debug'],
    }),
  );
  providers.push({
    provide: APP_INTERCEPTOR,
    useValue: new SentryInterceptor(),
  });
}
// {
//   filters: [
//     {
//       type: HttpException,
//       filter: (e) => [400].includes(e.statusCode) === false, // skip status code = 400
//     },
//   ],
// }

@Module({
  imports,
  providers,
})
export default class AppModule {}
