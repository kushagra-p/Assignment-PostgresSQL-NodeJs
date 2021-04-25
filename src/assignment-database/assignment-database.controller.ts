import { Body, Controller, Get, HttpCode, Param, Post, Req, UploadedFile } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { response } from 'express';
import { AssignmentDatabaseService } from './assignment-database.service';
import { Sales_Record_Entity } from './model/assignment.model';
import { request } from './model/request.model';
const csv = require('csv-parser');
const fs = require('fs');
const readStream = 0;
@Controller('assignment-database')
export class AssignmentDatabaseController {
    constructor(private readonly service: AssignmentDatabaseService) { }
    //route to fetch the data based on id
    @Get('/:id')
    @ApiResponse({
        status: 201,
        description: 'Record fetched'
    })
    @ApiParam({ name: 'id', type: 'number' })
    getData(@Param() params) {
        return this.service.getData(params.id);
    }
    //route to insert the data into database with file path as input
    @Post('add')
    @ApiResponse({
        status: 201,
        description: 'Record inserted'
    })
    async createEmployee(@Body() bdy: request) {
        return this.service.createRecord(bdy);
    }
}
