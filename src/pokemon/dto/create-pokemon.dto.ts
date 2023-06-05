import { IsString, MinLength, IsInt, IsPositive, Min } from "class-validator";
export class CreatePokemonDto {

    // isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, Minlength 1
    @IsString()
    @MinLength(1)
    name: string;

}
