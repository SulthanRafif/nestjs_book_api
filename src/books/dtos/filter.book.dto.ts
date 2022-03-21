import { IsOptional } from "class-validator";

export class FilterBookDto {
  @IsOptional()
  title: string;
}
