import { Injectable } from '@nestjs/common';
import { PaginationOptions, PaginatedResponse } from '../interfaces/pagination.interface';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PaginationService {
  async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    options: PaginationOptions,
    baseUrl: string,
  ): Promise<PaginatedResponse<T>> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    // Apply sorting if provided
    if (options.sortBy) {
      queryBuilder.orderBy(options.sortBy, options.sortOrder || 'ASC');
    }

    // Get total count
    const totalItems = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const items = await queryBuilder.getMany();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    // Generate pagination links
    const links = {
      first: `${baseUrl}?page=1&limit=${limit}`,
      previous: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}&limit=${limit}` : undefined,
      next: currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}&limit=${limit}` : undefined,
      last: `${baseUrl}?page=${totalPages}&limit=${limit}`,
    };

    // Add sorting parameters to links if provided
    if (options.sortBy) {
      Object.keys(links).forEach((key) => {
        if (links[key]) {
          links[key] += `&sortBy=${options.sortBy}&sortOrder=${options.sortOrder || 'ASC'}`;
        }
      });
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage,
      },
      links,
    };
  }
} 