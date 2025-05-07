import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookCopy } from './entities/book-copy.entity';
import { Member } from './entities/member.entity';
import { Loan } from './entities/loan.entity';
import { Reservation } from './entities/reservation.entity';
import { BooksModule } from './modules/books/books.module';
import { MembersModule } from './modules/members/members.module';
import { LoansModule } from './modules/loans/loans.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImportModule } from './modules/import/import.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { GrpcModule } from './grpc/grpc.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        dropSchema: false,
        autoLoadEntities: true,
        logging: true,
        migrationsRun: true,
        migrations: [__dirname + '/data/migrations/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    BooksModule,
    MembersModule,
    LoansModule,
    ReservationsModule,
    AuthModule,
    HealthModule,
    ImportModule,
    NotificationsModule,
    GrpcModule,
  ],
})
export class AppModule {} 