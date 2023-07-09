import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubCompanyDto } from './dto/create-sub-company.dto';
import { UpdateSubCompanyDto } from './dto/update-sub-company.dto';
import { SubCompany } from './entities/sub-company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class SubCompanyService {
  constructor(
    @InjectRepository(SubCompany)
    private readonly companyRepository: Repository<SubCompany>,
    @InjectRepository(Company)
    private readonly parentCompanyRepository: Repository<Company>,
  ) {}

  async create(createSubCompanyDto: CreateSubCompanyDto) {
    try {
      const { hance_empresa_id_c, usersId } = createSubCompanyDto;
      const company = this.companyRepository.create(createSubCompanyDto);

      if (!!hance_empresa_id_c) {
        const parentCompany = await this.parentCompanyRepository.findOne({
          where: { id: hance_empresa_id_c },
        });

        if (!parentCompany) throw new NotFoundException(`company not Found`);

        company.parentCompany = parentCompany;
      }

      await this.companyRepository.save(company);

      return company;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error');
    }
  }

  async findByParent(id: string) {
    const response = await this.companyRepository.find({
      where: { parentCompany: { id: id } },
    });

    return response;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const companies = await this.companyRepository.find({
      take: limit,
      skip: offset,
      relations: {
        users: true,
      },
    });

    return companies;
  }

  // async findCompany(paginationDto: PaginationDto) {
  //   const { limit = 10, offset = 0 } = paginationDto;
  //   console.log(limit);
  //   const companies = await this.companyRepository.find({
  //     take: limit,
  //     skip: offset,
  //   });

  //   return companies;
  // }

  async findOne(term: string) {
    const company = await this.companyRepository.findOne({
      where: { id: term },
    });
    return {
      ...company,
    };
  }

  async update(id: string, updateSubCompanyDto: UpdateSubCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id: id },
    });

    if (!company)
      throw new NotFoundException(`Product with id: ${id} not Found`);

    const companyUpdate = { ...company, ...updateSubCompanyDto };

    const updatedData = await this.companyRepository.save(companyUpdate);

    return updatedData;
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id: id },
    });

    if (!company)
      throw new NotFoundException(`Product with id: ${id} not Found`);

    await this.companyRepository.remove(company);

    return company;
  }
}
