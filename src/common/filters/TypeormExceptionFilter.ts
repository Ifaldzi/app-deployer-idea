import {
  ArgumentsHost,
  Catch,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

// @Catch(QueryFailedError)
@Catch(TypeORMError)
export class TypeormExceptionFilter extends BaseExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const errorType = exception.constructor;
    // const errorCode = error.code;
    // console.log(errorType);

    // switch (errorCode) {
    //   case '23505':
    //     super.catch(new BadRequestException(exception.message), host);
    //     break;
    //   default:
    //     super.catch(new InternalServerErrorException(exception), host);
    //     break;
    // }
    switch (errorType) {
      case EntityNotFoundError:
        super.catch(new NotFoundException(exception.message), host);
        break;
      case QueryFailedError:
        super.catch(new UnprocessableEntityException(exception.message), host);
        break;
      default:
        super.catch(new InternalServerErrorException(exception), host);
        break;
    }
  }
}
