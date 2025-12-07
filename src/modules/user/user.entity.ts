import { Roles } from 'src/modules/roles/entities/roles.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { Logs } from '../logs/logs.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ unique: true })
  username: string

  @Column()
  gender: number

  @Column()
  password: string

  @ManyToMany(() => Roles, (roles) => roles.user, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  roles: Roles[]

  @ManyToOne(() => Logs, (logs) => logs.user)
  logs: Logs
}
