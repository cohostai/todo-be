/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, { whitelist: true });
    if (errors.length > 0) {
      console.info(value);
      throw new BadRequestException(
        `Form Arguments invalid: ${this.formatErrors(errors)}`,
      );
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        if (err.children?.length > 0) {
          return this.formatErrors(err.children);
        } else {
          for (const property in err.constraints) {
            return `${err.target.constructor.name} ${err.constraints[property]}`;
          }
        }
      })
      .join(', ');
  }
}
