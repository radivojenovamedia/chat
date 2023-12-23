import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ErrorLoggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'text' })
  error: string;

  @Column({ type: 'varchar' })
  method: string;

  @Column({ type: 'varchar' })
  ip: string;
}
