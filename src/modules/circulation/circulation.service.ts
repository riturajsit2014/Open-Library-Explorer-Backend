import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Loan } from '../../entities/loan.entity';
import { BookCopy, BookStatus } from '../../entities/book-copy.entity';
import { Member } from '../../entities/member.entity';
import { MembershipTier } from '../../entities/member.entity';
import { addDays } from 'date-fns';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class CirculationService {
  constructor(
    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  private getLoanDuration(tier: MembershipTier): number {
    switch (tier) {
      case MembershipTier.BASIC:
        return 14; // 2 weeks
      case MembershipTier.PREMIUM:
        return 21; // 3 weeks
      case MembershipTier.VIP:
        return 28; // 4 weeks
      default:
        return 14;
    }
  }

  async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
    const bookCopy = await this.bookCopyRepository.findOne({
      where: { id: createLoanDto.bookCopyId },
      relations: ['book'],
    });

    if (!bookCopy) {
      throw new NotFoundException('Book copy not found');
    }

    if (bookCopy.status !== BookStatus.AVAILABLE) {
      throw new Error('Book is not available for loan');
    }

    const member = await this.memberRepository.findOne({
      where: { id: createLoanDto.memberId },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const loan = new Loan();
    loan.bookCopy = bookCopy;
    loan.member = member;
    loan.dueDate = new Date(createLoanDto.dueDate);

    bookCopy.status = BookStatus.LOANED;
    await this.bookCopyRepository.save(bookCopy);

    return this.loansRepository.save(loan);
  }

  async returnBook(loanId: string): Promise<Loan> {
    const loan = await this.loansRepository.findOne({
      where: { id: loanId },
      relations: ['bookCopy'],
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    loan.returnDate = new Date();
    loan.bookCopy.status = BookStatus.AVAILABLE;
    await this.bookCopyRepository.save(loan.bookCopy);

    return this.loansRepository.save(loan);
  }

  async renewLoan(loanId: string): Promise<Loan> {
    const loan = await this.loansRepository.findOne({
      where: { id: loanId },
      relations: ['member', 'bookCopy'],
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    if (loan.returnDate) {
      throw new BadRequestException('Cannot renew a returned book');
    }

    const member = loan.member;
    const loanDuration = this.getLoanDuration(member.membershipTier);
    const newDueDate = addDays(new Date(), loanDuration);

    loan.dueDate = newDueDate;
    return this.loansRepository.save(loan);
  }

  async getActiveLoans(memberId: string): Promise<Loan[]> {
    return this.loansRepository.find({
      where: {
        member: { id: memberId },
        returnDate: null,
      },
      relations: ['bookCopy', 'bookCopy.book'],
    });
  }

  async getOverdueLoans(): Promise<Loan[]> {
    const now = new Date();
    return this.loansRepository.find({
      where: {
        dueDate: LessThan(now),
        returnDate: null,
      },
      relations: ['bookCopy', 'member'],
    });
  }
} 