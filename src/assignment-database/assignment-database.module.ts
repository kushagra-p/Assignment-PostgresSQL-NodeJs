import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule, CsvParser } from 'nest-csv-parser';
import { AssignmentDatabaseController } from './assignment-database.controller';
import { AssignmentDatabaseService } from './assignment-database.service';
import { Sales_Record_Entity } from './model/assignment.model';

@Module({
  imports: [TypeOrmModule.forFeature([Sales_Record_Entity]),CsvModule,CsvParser,],
  controllers: [AssignmentDatabaseController],
  providers: [AssignmentDatabaseService]
})
export class AssignmentDatabaseModule {}
