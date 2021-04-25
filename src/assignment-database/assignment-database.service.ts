import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { Sales_Record_Entity } from './model/assignment.model';
import { request } from './model/request.model';

const fs = require('fs');
let data: ParsedData<Sales_Record_Entity>
const csvSplitStream = require('csv-split-stream');
@Injectable()
export class AssignmentDatabaseService {
  constructor(@InjectRepository(Sales_Record_Entity) private salesRecord: Repository<Sales_Record_Entity>, private readonly csvParser: CsvParser) { }
  //method to get data from database based on id
  async getData(id) {
    try {
      return this.salesRecord.findOne(id);
    }
    catch (err) {
      err.message = 'error throen while fetching';
      return throwError(err);
    }
  }
  //method to split the large csv into smaller files
  csvSplit(filePath) {
    return csvSplitStream.split(
      fs.createReadStream(filePath),
      {
        lineLimit: 10000
      },
      (index) => fs.createWriteStream(`C:\\Users\\nEW u\\projects\\Assignment-PostgresSQL-NodeJs\\output-${index}.csv`)
    )
      .then(csvSplitResponse => {
        console.log('csvSplitStream succeeded.', csvSplitResponse);
      }).catch(csvSplitError => {
        console.log('csvSplitStream failed!', csvSplitError);
      });
  }
  //method to insert data into database
  async createRecord(req: any) {
    try {
      let filePath = req.filePath;
      await this.csvSplit(filePath);
      let bodyInsert = [];
      bodyInsert.length = 0;
      for (let j = 0; j < 500; j++) {
        const stream = fs.createReadStream('C:\\Users\\nEW u\\projects\\Assignment-PostgresSQL-NodeJs\\output-' + j + '.csv');
        const bdy = new Sales_Record_Entity();
        data = await this.csvParser.parse(stream, Sales_Record_Entity, 10000, null, { separator: ',' });
        console.log(j);
        const entities = data.list;
        for (let i = 0; i < entities.length; i++) {
          const result = JSON.parse(JSON.stringify(entities[i]));
          bdy.region = result['Region'];
          bdy.country = result['Country'];
          bdy.itemType = result['Item Type'];
          bdy.orderDate = result['Order Date'];
          bdy.orderId = result['Order ID'];
          bdy.orderPriority = result['Order Priority'];
          bdy.salesChannel = result['Sales Channel'];
          bdy.shipDate = result['Ship Date'];
          bdy.totalCost = result['Total Cost'];
          bdy.totalProfit = result['Total Profit'];
          bdy.totalRevenue = result['Total Revenue'];
          bdy.unitCost = result['Unit Cost'];
          bdy.unitPrice = result['Unit Price'];
          bdy.unitSold = result['Units Sold'];
          await this.salesRecord.insert(bdy);
        }
      }
      return "successfully inserted";
    }
    catch (err) {
      err.message = 'error throen while inserting' + err.message;
      return throwError(err);

    }
  }
}