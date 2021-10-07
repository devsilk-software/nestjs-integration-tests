import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.int.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class TestModule {}
