import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IS_NOT_EMPTY,
  IS_STRING_MESSAGE,
  MATCHES,
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
} from './helper.dto';

export class AuthDto {
  @IsString({ message: IS_STRING_MESSAGE })
  @IsNotEmpty({ message: IS_NOT_EMPTY })
  @MinLength(5, { message: MIN_LENGTH_LOGIN })
  @MaxLength(20, { message: MAX_LENGTH_LOGIN })
  login: string;
  @IsString({ message: IS_STRING_MESSAGE })
  @IsNotEmpty({ message: IS_NOT_EMPTY })
  @MinLength(8, { message: MIN_LENGTH_PASSWORD })
  @MaxLength(27, { message: MAX_LENGTH_PASSWORD })
  @Matches('^[0-9a-zA-Z!@#$%^&*]+$', undefined, { message: MATCHES }) // matches - роверка на совпадения регулярки
  password: string;
}
