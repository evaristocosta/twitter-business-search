import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 for /', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('should return 200 for /tweets with correct query string', async () => {
    const queryUrl = '?business=Microsoft&max_results=10';
    const resp = await request(app.getHttpServer())
      .get(`/tweets${queryUrl}`)
      .expect(200);

    expect(resp.body).toHaveProperty('business_id');
    expect(Array.isArray(resp.body.mentions)).toBe(true);
  });

  it('should return bad request for /tweets without query', () => {
    return request(app.getHttpServer()).get('/tweets').expect(400);
  });

  it('should return bad request for /tweets with wrong query', () => {
    const queryUrl = '?busines=Microsoft&max_result=10&wrong=wrong';
    return request(app.getHttpServer()).get(`/tweets${queryUrl}`).expect(400);
  });

  it('should return error for /tweets when business doesnt exist', () => {
    const queryUrl = '?business=businessthatdoesnotexist&max_results=10';
    return request(app.getHttpServer()).get(`/tweets${queryUrl}`).expect(404);
  });

  it('should return bad request for out of range max_results in /tweets', () => {
    const queryUrl = '?business=Microsoft&max_results=100000000';
    return request(app.getHttpServer()).get(`/tweets${queryUrl}`).expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
