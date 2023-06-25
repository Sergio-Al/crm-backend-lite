import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { companyIdEmpresa } = createUserDto;

      const user = this.userRepository.create(createUserDto);

      if (!!companyIdEmpresa) {
        const company = await this.companyRepository.findOne({
          where: { id_empresa: companyIdEmpresa },
        });

        if (!company) throw new NotFoundException(`company not Found`);

        user.company = company;
      }

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
      where: { id_usuario: term },
    });
    return {
      ...company,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id_usuario: id },
    });

    if (!user) throw new NotFoundException(`Product with id: ${id} not Found`);

    const userUpdate = { ...user, ...updateUserDto };

    const updatedData = await this.userRepository.save(userUpdate);

    return updatedData;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id_usuario: id },
    });

    if (!user) throw new NotFoundException(`Product with id: ${id} not Found`);

    await this.userRepository.remove(user);

    return user;
  }
}
