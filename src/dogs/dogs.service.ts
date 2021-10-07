import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DogPostgresEntity } from './database/dog.entity';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogsService {
  constructor(private connection: Connection) {}

  async create(createDogDto: CreateDogDto) {
    return this.connection.getRepository(DogPostgresEntity).save(createDogDto);
  }
}
