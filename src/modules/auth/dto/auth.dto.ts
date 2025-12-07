import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    // $value 表示用户传入的值
    // $constraint1 显示第一个约束条件，比如这里就是 6
    // $constraint2 显示第二个约束条件，比如这里就是 20
    // property 当前属性名
    message: `用户名长度在$constraint1-$constraint2个字符之间`,
  })
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 32)
  password: string
}
