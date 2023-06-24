import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);

      return company;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    console.log(limit);
    const companies = await this.companyRepository.find({
      take: limit,
      skip: offset,
    });

    return companies;
  }

  async findOne(term: string) {
    const company = await this.findOne(term);
    return {
      ...company,
    };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id_empresa: id },
    });

    if (!company)
      throw new NotFoundException(`Product with id: ${id} not Found`);

    const companyUpdate = { ...company, ...updateCompanyDto };

    const updatedData = await this.companyRepository.save(companyUpdate);

    return updatedData;
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id_empresa: id },
    });

    if (!company)
      throw new NotFoundException(`Product with id: ${id} not Found`);

    await this.companyRepository.remove(company);

    return company;
  }
}
