import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { clearAllTables } from '../../test/utils/clear-all-tables.util';
import { createTestApp } from '../../test/utils/create-test-app.util';
import { makeRequest } from '../../test/utils/make-request.util';
import { DogPostgresEntity } from './database/dog.entity';
import { DogsModule } from './dogs.module';
import { CreateDogDto } from './dto/create-dog.dto';

describe('Dogs module', () => {
  let app: NestExpressApplication;
  let connection: Connection;

  beforeAll(async () => {
    const testApp = await createTestApp([DogsModule]);

    connection = testApp.connection;
    app = testApp.app;
  });

  afterEach(async () => {
    await clearAllTables(connection);
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  describe('POST /dogs', () => {
    describe('201', () => {
      it('should create dog and return id', async () => {
        const response = await makeRequest(app).post('/dogs').send({
          name: 'Dingo',
          age: 3,
          breed: 'Beagle',
        });

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.id).toBeDefined();
      });

      it('should create dog and save it to db', async () => {
        const given: CreateDogDto = {
          name: 'Dingo',
          age: 3,
          breed: 'Beagle',
        };
        const response = await makeRequest(app).post('/dogs').send(given);

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.id).toBeDefined();

        // check if saved dog in database has same properties sent via POST request
        const found = await connection
          .getRepository(DogPostgresEntity)
          .findOne(response.body.id);

        expect(found).toMatchObject({
          id: response.body.id,
          name: given.name,
          age: given.age,
          breed: given.breed,
        });
      });
    });
  });
});
