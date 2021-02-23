/* eslint-disable camelcase */
import { ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

interface Experience {
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: string[];
}

interface Skill {
  key: string;
  value: string;
}

@ObjectType()
@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  english_name: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'jsonb', array: true, default: '{}' })
  education: Experience[];

  @Column({ type: 'jsonb', array: true, default: '{}' })
  professional_experience: Experience[];

  @Column({ type: 'jsonb', array: true, default: '{}' })
  leadership_experience: Experience[];

  @Column({ type: 'jsonb', array: true, default: '{}' })
  others: Skill[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
