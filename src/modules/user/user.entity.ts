import { Roles } from 'src/modules/roles/entities/roles.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  gender: number

  @ManyToMany(() => Roles, (roles) => roles.user)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[]
}
