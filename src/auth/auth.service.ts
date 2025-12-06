import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor() {}
  signin(username: string) {
    console.log(username)
  }
}
