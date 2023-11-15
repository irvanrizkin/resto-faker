import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const id = `RES${randomBytes(5).toString('hex')}`;
    return await this.prisma.restaurant.create({
      data: {
        id,
        ...createRestaurantDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.restaurant.findMany({
      include: {
        images: true,
        reviews: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.restaurant.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return await this.prisma.restaurant.update({
      where: {
        id,
      },
      data: updateRestaurantDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.restaurant.delete({
      where: {
        id,
      },
    });
  }
}
