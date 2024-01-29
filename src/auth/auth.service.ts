import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { SignUpDTO } from './dto/SignUp.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwtConstant';

@Injectable()
export class AuthService {

  constructor(
    private jwtServices: JwtService
  ) { }

  prisma = new PrismaClient();

  async login(body: LoginDTO): Promise<any> {
    try {
      let { email, pass_word } = body;
      const user = await this.prisma.users.findFirst({
        where: {
          email
        }
      });
      if (user) {
        const isCorrectPass = bcrypt.compareSync(pass_word, user.pass_word);
        if (isCorrectPass) {
          const payLoad = {
            email,
            user_id: user.user_id,
            role: user.role
          }
          console.log(JWT_CONSTANT);
          let token = this.jwtServices.sign(payLoad);
          return {
            status: 200,
            token
          }
        } else {
          return {
            status: 400,
            message: "password error!"
          }
        }
      } else {
        return {
          status: 404,
          message: "email not found!"
        }
      }
    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

  async signUp(body: SignUpDTO): Promise<any> {
    try {
      const { full_name, email, pass_word } = body;
      const user = await this.prisma.users.findFirst({
        where: {
          email
        }
      });
      if (user) {
        return {
          status: 400,
          message: "email exist!"
        }
      } else {
        let hashPass = bcrypt.hashSync(pass_word, 10);
        let newUser = {
          email,
          full_name,
          pass_word: hashPass
        }
        await this.prisma.users.create({
          data: newUser
        });
        return {
          status: 201,
          message: "user created successful!"
        }
      }
    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

}
