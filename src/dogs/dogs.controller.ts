import { Body, Controller, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    const created = await this.dogsService.create(createDogDto);

    return {
      id: created.id,
    };
  }
}
