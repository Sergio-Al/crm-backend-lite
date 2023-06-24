import { Injectable } from '@nestjs/common';
import { CreateSubCompanyDto } from './dto/create-sub-company.dto';
import { UpdateSubCompanyDto } from './dto/update-sub-company.dto';

@Injectable()
export class SubCompanyService {
  create(createSubCompanyDto: CreateSubCompanyDto) {
    return 'This action adds a new subCompany';
  }

  findAll() {
    return `This action returns all subCompany`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCompany`;
  }

  update(id: number, updateSubCompanyDto: UpdateSubCompanyDto) {
    return `This action updates a #${id} subCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCompany`;
  }
}
