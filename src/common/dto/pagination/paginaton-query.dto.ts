import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @Type(() => Number)
  readonly page?: number = 1;

  @Type(() => Number)
  readonly limit?: number = 10;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
