import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from '../test.module';

type Imports = Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
>;

export async function compileTestModule(
  imports: Imports,
): Promise<TestingModule> {
  const testingModule = Test.createTestingModule({
    imports: [TestModule, ...imports],
  });

  return testingModule.compile();
}

export async function initTestApp(
  testingModule: TestingModule,
): Promise<NestExpressApplication> {
  return testingModule.createNestApplication<NestExpressApplication>().init();
}
