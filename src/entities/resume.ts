/* eslint-disable camelcase */
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Experience } from './experience';
import { Skill } from './skill';

@ObjectType()
@Entity()
export class Resume {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  english_name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  address: string;

  @Field(() => [Experience], { nullable: 'items' })
  @Column({ type: 'jsonb', array: false, default: '[]' })
  education: Experience[];

  @Field(() => [Experience], { nullable: 'items' })
  @Column({ type: 'jsonb', array: false, default: '[]' })
  professional_experience: Experience[];

  @Field(() => [Experience], { nullable: 'items' })
  @Column({ type: 'jsonb', array: false, default: '[]' })
  leadership_experience: Experience[];

  @Field(() => [Skill], { nullable: 'items' })
  @Column({ type: 'jsonb', array: false, default: '[]' })
  others: Skill[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
