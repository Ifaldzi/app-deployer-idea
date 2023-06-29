import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationDto<T> {
  readonly data: T[];

  readonly meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
