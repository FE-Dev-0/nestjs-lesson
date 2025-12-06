import { User } from 'src/modules/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => User, (user) => user.roles)
  user: User
}
