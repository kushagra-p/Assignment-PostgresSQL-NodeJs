import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentDatabaseModule } from './assignment-database/assignment-database.module';
import { AssignmentDatabaseService } from './assignment-database/assignment-database.service';
import {  Sales_Record_Entity } from './assignment-database/model/assignment.model';

@Module({
  imports: [AssignmentDatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8989,
      username: 'postgres',
      password: 'root',
      database: 'Sales_Record',
      entities: [Sales_Record_Entity],
      synchronize:true
    }),
    CsvModule,
    Repository,
    TypeOrmModule.forFeature([Sales_Record_Entity])
  ],
  controllers: [AppController],
  providers: [AppService, AssignmentDatabaseService],
})
export class AppModule {}
