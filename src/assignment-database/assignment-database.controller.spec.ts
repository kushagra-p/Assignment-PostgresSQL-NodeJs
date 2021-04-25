import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentDatabaseController } from './assignment-database.controller';

describe('AssignmentDatabaseController', () => {
  let controller: AssignmentDatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentDatabaseController],
    }).compile();

    controller = module.get<AssignmentDatabaseController>(AssignmentDatabaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
