import { PaginationQueryDto } from './paginaton-query.dto';

export class PaginationMetaDto {
  readonly page: number;

  readonly itemsPerPage: number;

  readonly totalPage: number;

  readonly totalItem: number;

  constructor(paginationOptions: PaginationQueryDto, itemCount: number) {
    this.page = paginationOptions.page;
    this.itemsPerPage = paginationOptions.limit;
    this.totalItem = itemCount;
    this.totalPage = Math.ceil(this.totalItem / this.itemsPerPage);
  }
}
