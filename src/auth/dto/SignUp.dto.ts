import { ApiProperty } from "@nestjs/swagger";

export class SignUpDTO {
    @ApiProperty()
    full_name: string
    @ApiProperty()
    email: string
    @ApiProperty()
    pass_word: string
}