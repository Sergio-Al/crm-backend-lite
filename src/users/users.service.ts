import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { QueryUser } from './dto/query-user.dto';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { companyIdEmpresa, first_name, last_name } = createUserDto;

      const user = this.userRepository.create(createUserDto);

      if (!!companyIdEmpresa) {
        const company = await this.companiesService.findOne(companyIdEmpresa);
        if (!company) throw new NotFoundException(`company not Found`);

        user.company = company;
      }

      // additions
      console.log(`${first_name} and ${last_name}`);
      user.fullname = `${first_name} ${last_name}`;

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    console.log(limit);
    const companies = await this.userRepository.find({
      take: limit,
      skip: offset,
    });

    return companies;
  }

  async findOne(term: string) {
    const company = await this.userRepository.findOne({
      where: { id: term },
    });
    return {
      ...company,
    };
  }

  async findByTerm(terms: QueryUser) {
    const params: any = {};

    if (terms.company_id) params.company = { id: terms.company_id };
    if (terms.idamercado_c) params.idamercado_c = terms.idamercado_c;
    if (terms.iddivision_c) params.iddivision_c = terms.iddivision_c;
    if (terms.idregional_c) params.idregional_c = terms.idregional_c;
    if (terms.name) params.fullname = Like(`%${terms.name}%`);

    const users = await this.userRepository.find({
      relations: {
        company: true,
      },
      where: params,
    });

    // if (terms.name) {
    //   const filteredByName = await this.userRepository.find({
    //     relations: {
    //       company: true,
    //     },
    //     where: {
    //       full_name: Like(`%{terms.name}%`),
    //     },
    //   });
    //   users.push(...filteredByName);
    // }

    return users.map((user) => ({
      ...user,
      user_name: user.fullname,
      cargo: user.assignment,
      division: user.iddivision_c,
      a_mercado: user.idamercado_c,
    }));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    const userUpdate = { ...user, ...updateUserDto };

    if (
      !!updateUserDto.companyIdEmpresa &&
      updateUserDto.companyIdEmpresa !== '-1'
    ) {
      const company = await this.companiesService.findOne(
        updateUserDto.companyIdEmpresa,
      );

      if (!company)
        throw new NotFoundException(
          `Company with id: ${updateUserDto.companyIdEmpresa} no found`,
        );

      userUpdate.company = company;
    } else if (updateUserDto.companyIdEmpresa === '-1') {
      await this.companiesService.update(user.company.id, {
        removeUserId: user.id,
      });

      userUpdate.company = null;
    }

    if (!user) throw new NotFoundException(`Product with id: ${id} not Found`);

    const updatedData = await this.userRepository.save(userUpdate);

    return updatedData;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`Product with id: ${id} not Found`);

    await this.userRepository.remove(user);

    return user;
  }

  async massiveUpdate(ids: string, udpateUserDto: UpdateUserDto) {
    const userIds = ids.split(',');
    const users: User[] = [];

    try {
      for await (const userId of userIds) {
        const userUpdated = await this.update(userId, udpateUserDto);
        users.push(userUpdated);
      }

      // return `users with Id ${ids.split(',')} updated`;
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async removeAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected Error. check server logs',
    );
  }
}
