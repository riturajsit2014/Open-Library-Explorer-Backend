import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  async placeReservation(
    @Body() reservationDto: { memberId: string; bookCopyId: string },
  ) {
    return this.reservationsService.placeReservation(
      reservationDto.memberId,
      reservationDto.bookCopyId,
    );
  }

  @Put(':id/fulfill')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async fulfillReservation(@Param('id') id: string) {
    return this.reservationsService.fulfillReservation(id);
  }

  @Put(':id/cancel')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  async cancelReservation(@Param('id') id: string) {
    return this.reservationsService.cancelReservation(id);
  }

  @Get('book-copy/:bookCopyId/pending')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async getPendingReservations(@Param('bookCopyId') bookCopyId: string) {
    return this.reservationsService.getPendingReservations(bookCopyId);
  }

  @Get('member/:memberId')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  async getMemberReservations(@Param('memberId') memberId: string) {
    return this.reservationsService.getMemberReservations(memberId);
  }
} 