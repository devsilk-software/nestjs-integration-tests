import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DogPostgresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  breed: string;
}
