import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubCompanyService } from './sub-company.service';
import { CreateSubCompanyDto } from './dto/create-sub-company.dto';
import { UpdateSubCompanyDto } from './dto/update-sub-company.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('participacion')
export class SubCompanyController {
  constructor(private readonly subCompanyService: SubCompanyService) {}

  @Post()
  create(@Body() createSubCompanyDto: CreateSubCompanyDto) {
    return this.subCompanyService.create(createSubCompanyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.subCompanyService.findAll(paginationDto);
  }

  @Get('parent/:id')
  findByParent(@Param('id') parentId: string) {
    return this.subCompanyService.findByParent(parentId);
  }

  @Get('child/:id')
  findOne(@Param('id') id: string) {
    return this.subCompanyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubCompanyDto: UpdateSubCompanyDto,
  ) {
    return this.subCompanyService.update(id, updateSubCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCompanyService.remove(id);
  }
}
