import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ImageModule } from './image/image.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [RestaurantModule, ImageModule, ReviewModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
