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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { QueryUser } from './dto/query-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(@Query() paginationDto: PaginationDto) {
  //   return this.usersService.findAll(paginationDto);
  // }

  @Get()
  findAll(@Query() queryUser: QueryUser) {
    return this.usersService.findByTerm(queryUser);
  }

  @Get(':term')
  findOne(@Param('term') id: string) {
    return this.usersService.findOne(id);
  }

  // @Get('filter')
  // findByTerms(@Query() queryUser: QueryUser) {
  //   console.log('aaaas');
  //   return this.usersService.findByTerm(queryUser);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
