/* eslint-disable camelcase */
import { Field, ObjectType, Int } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Feedback {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  name: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  email: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  message: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
