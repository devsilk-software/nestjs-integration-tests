import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogPostgresEntity } from './database/dog.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DogPostgresEntity])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
