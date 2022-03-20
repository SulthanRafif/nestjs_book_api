import { NestFactory } from '@nestjs/core';
import { BookSeedService } from './book-seed.service';
import { UserSeeder } from './providers/user.seeder';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const bookSeeder = appContext.get(BookSeedService);
  await bookSeeder.seed();

  const userSeeder = appContext.get(UserSeeder);
  await userSeeder.seed();
  await appContext.close();
}

bootstrap();
