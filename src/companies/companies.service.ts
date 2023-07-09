import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, // private readonly usersService: UsersService,
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
    const company = await this.companyRepository.findOne({
      where: { id: term },
      relations: {
        users: true,
      },
    });
    return {
      ...company,
    };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const { removeUserId = '', ...updateCompany } = updateCompanyDto;
    const company = await this.companyRepository.findOne({
      where: { id: id },
      relations: {
        users: true,
      },
    });

    if (!company)
      throw new NotFoundException(`Product with id: ${id} not Found`);

    const companyUpdate = { ...company, ...updateCompany };

    if (!!removeUserId) {
      companyUpdate.users = company.users.filter(
        (user) => user.id !== removeUserId,
      );

      // await this.usersService.update(removeUserId, {
      //   companyIdEmpresa: '-1',
      // });
    }

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
