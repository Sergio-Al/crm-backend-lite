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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
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
    const company = await this.findOne(term);
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
