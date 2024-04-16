import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', generated: 'uuid', name: 'user_uuid' })
  userUuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;
}
