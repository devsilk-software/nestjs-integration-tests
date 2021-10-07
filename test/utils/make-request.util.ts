import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export function makeRequest(app: INestApplication) {
  return request(app.getHttpServer());
}
