import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

export function SoftDeleteMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    const orgParamsAction = params.action;
    const newParams = params;

    if (newParams.action === 'findUnique' || newParams.action === 'findFirst') {
      // Change to findFirst - you cannot filter
      // by anything except ID / unique with findUnique
      newParams.action = 'findFirst';
      // Add 'deletedAt' filter
      // ID filter maintained
      newParams.args.where.deletedAt = null;
    }
    if (newParams.action === 'findMany') {
      if (newParams.args === undefined) {
        newParams.args = {};
      }

      if (newParams.args.where) {
        // Find many queries
        if (newParams.args.where.deletedAt === undefined) {
          // Exclude deletedAt records if they have not been explicitly requested
          newParams.args.where.deletedAt = null;
        }
      } else {
        newParams.args.where = { deletedAt: null };
      }
    }

    if (newParams.action === 'update') {
      // Change to updateMany - you cannot filter
      // by anything except ID / unique with findUnique
      newParams.action = 'updateMany';
      // Add 'deletedAt' filter
      // ID filter maintained
      newParams.args.where.deletedAt = null;
    }
    if (newParams.action === 'updateMany') {
      if (newParams.args.where !== undefined) {
        newParams.args.where.deletedAt = null;
      } else {
        newParams.args.where = { deletedAt: null };
      }
    }

    if (newParams.action === 'delete') {
      // Delete queries
      // Change action to an update
      newParams.action = 'update';
      newParams.args.data = { deletedAt: new Date() };
    }
    if (newParams.action === 'deleteMany') {
      // Delete many queries
      newParams.action = 'updateMany';
      if (newParams.args.data !== undefined) {
        newParams.args.data.deletedAt = new Date();
      } else {
        newParams.args.data = { deletedAt: new Date() };
      }
    }

    if (orgParamsAction === 'update') {
      // trigger update
      await next(newParams);
      // replace the result to data obj
      // { count: n } -> { }
      newParams.action = 'findFirst';
      newParams.args = {
        where: newParams.args.where,
      };
    }
    return next(newParams);

    /*
      modify result middleware
    */
    // const result = await next(params);
    // if (
    //   (params.action === 'updateMany' || params.action === 'deleteMany') &&
    //   params.args.where.version &&
    //   result.count === 0
    // ) {
    //   throw new Error('SoftDeleteMiddleware error');
    // }
    // return result;
  };
}

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    // Soft delete middleware
    this.$use(SoftDeleteMiddleware());

    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  // for unit test
  // cleanDb() {
  //   return this.$transaction([
  //     this.bookmark.deleteMany(),
  //     this.user.deleteMany(),
  //   ]);
  // }
}
