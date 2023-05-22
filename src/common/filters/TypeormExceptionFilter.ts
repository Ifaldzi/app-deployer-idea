import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormExceptionFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const error = exception.driverError;
    const errorCode = error.code;
    console.log(error.code);

    switch (errorCode) {
      case '23505':
        super.catch(new BadRequestException(exception.message), host);
        break;
      default:
        super.catch(new InternalServerErrorException(exception), host);
        break;
    }
  }
}
