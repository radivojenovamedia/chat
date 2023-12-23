import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ControllerLoggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  method: string;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'varchar' })
  query: string;

  @Column({ type: 'varchar' })
  param: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'varchar' })
  headers: string;
}
