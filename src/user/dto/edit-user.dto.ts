import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  @Expose()
  email?: string;

  @IsString()
  @IsOptional()
  @Expose()
  firstName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  lastName?: string;
}
