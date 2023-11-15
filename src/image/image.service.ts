import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto) {
    const id = `IMG${randomBytes(5).toString('hex')}`;
    return await this.prisma.image.create({
      data: {
        id,
        ...createImageDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.image.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.image.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    return await this.prisma.image.update({
      where: {
        id,
      },
      data: updateImageDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.image.delete({
      where: {
        id,
      },
    });
  }
}
