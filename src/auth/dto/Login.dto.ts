import { ApiProperty } from "@nestjs/swagger"

export class LoginDTO {
    @ApiProperty()
    email: string
    @ApiProperty()
    pass_word: string
}