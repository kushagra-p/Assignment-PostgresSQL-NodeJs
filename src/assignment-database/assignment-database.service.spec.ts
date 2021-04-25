import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentDatabaseService } from './assignment-database.service';

describe('AssignmentDatabaseService', () => {
  let service: AssignmentDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentDatabaseService],
    }).compile();

    service = module.get<AssignmentDatabaseService>(AssignmentDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
