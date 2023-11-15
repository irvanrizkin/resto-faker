import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const id = `REV${randomBytes(5).toString('hex')}`;
    const { restaurantId } = createReviewDto;

    const review = await this.prisma.review.create({
      data: {
        id,
        ...createReviewDto,
      },
    });

    const average = await this.prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        restaurantId,
      },
    });

    const roundedAvg = Math.round(average._avg.rating * 10) / 10;

    await this.prisma.restaurant.update({
      where: {
        id: restaurantId,
      },
      data: {
        rating: roundedAvg,
      },
    });

    return review;
  }

  async findAll() {
    return await this.prisma.review.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.review.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.review.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
