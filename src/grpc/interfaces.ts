export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchParams {
  search?: string;
}

export interface BookFilters extends SearchParams {
  genre?: string;
  author?: string;
}

export interface MemberFilters extends SearchParams {
  membership_type?: string;
  membership_status?: string;
}

export interface LoanFilters extends SearchParams {
  member_id?: string;
  book_id?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
} 