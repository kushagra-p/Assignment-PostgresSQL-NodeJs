import { ApiProperty } from "@nestjs/swagger";
import { isString } from "node:util";


export class request{
    @ApiProperty()
    filePath: String;
}