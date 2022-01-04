import { IsNumberString, IsString } from 'class-validator';

export class SearchBusinessDto {
  @IsString()
  business: string;

  @IsNumberString()
  max_results: number;
}
