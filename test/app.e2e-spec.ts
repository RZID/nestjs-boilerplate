import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum';
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto";
import { EditUserDto } from "../src/user/dto";
import { CreateBookmarkDto, EditBookmarkDto } from "src/bookmark/dto";

describe('App e2e', () => {
  let app: INestApplication;
  let prima: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    await app.init();
    await app.listen(3333);

    prima = app.get(PrismaService);
    await prima.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  })

  const dto: AuthDto = {
    email: 'a@a.com', password: '123'
  };

  describe('Signup', () => {
    it('should throw if body empty', () => {
      return pactum.spec().post('/auth/signup').withBody({}).expectStatus(400);
    });
    it('should signup', () => {
      return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
    });
  });

  describe('Signin', () => {
    it('should throw if body empty', () => {
      return pactum.spec().post('/auth/signin').withBody({}).expectStatus(400);
    });
    it('should signin', () => {
      return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
    });
  });

  describe('User', () => {
    it('should get current user', () => {
      return pactum.spec().get('/users/me').withHeaders({Authorization: 'Bearer $S{userAt}'}).expectStatus(200);
    });
  });

  describe('Edit User', () => {
    it('should edit user', () => {
      const dto: EditUserDto = {
        firstName: 'Test'
      };
      return pactum.spec().patch('/users').withHeaders({Authorization: 'Bearer $S{userAt}'}).withBody(dto)
      .expectStatus(200).expectBodyContains(dto.firstName);
    });
  });

  describe('Bookmarks', () => {
    describe('Get bookmarks', () => {
      it('should get empty bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'})
        .expectStatus(200).expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      it('should create bookmark', () => {
        const dto: CreateBookmarkDto = {
          title: 'Test Bookmark',
          link: 'https//test.com',
        };
        return pactum.spec().post('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'}).withBody(dto)
        .expectStatus(201).stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'})
        .expectStatus(200).expectJsonLength(1);
      });
    });
    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum.spec().get('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'})
        .expectStatus(200).expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Edit bookmark', () => {
      it('should edit bookmark', () => {
        const dto: EditBookmarkDto = {
          title: 'Test Bookmark2',
        };
        return pactum.spec().patch('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'}).withBody(dto)
        .expectStatus(200).expectBodyContains(dto.title);
      });
    });
    describe('Delete bookmark', () => {
      it('should delete bookmark', () => {
        return pactum.spec().delete('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'})
        .expectStatus(204);
      });
    });
    describe('Get empty bookmarks', () => {
      it('should get empty bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'})
        .expectStatus(200).expectBody([]);
      });
    });
  });
})