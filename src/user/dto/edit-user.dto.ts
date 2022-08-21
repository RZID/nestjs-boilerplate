import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EditUserDto {
  @IsString()
  @IsOptional()
  @Expose()
  firstName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  lastName?: string;
}
