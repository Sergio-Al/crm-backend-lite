import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCompanyService } from './sub-company.service';
import { CreateSubCompanyDto } from './dto/create-sub-company.dto';
import { UpdateSubCompanyDto } from './dto/update-sub-company.dto';

@Controller('sub-company')
export class SubCompanyController {
  constructor(private readonly subCompanyService: SubCompanyService) {}

  @Post()
  create(@Body() createSubCompanyDto: CreateSubCompanyDto) {
    return this.subCompanyService.create(createSubCompanyDto);
  }

  @Get()
  findAll() {
    return this.subCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCompanyDto: UpdateSubCompanyDto) {
    return this.subCompanyService.update(+id, updateSubCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCompanyService.remove(+id);
  }
}
