/* eslint-disable camelcase */
import { Field, ObjectType, Int } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';
import { Experience } from './experience';
import { Skill } from './skill';

@ObjectType()
@Entity()
export class Resume {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated('uuid')
  uuid: string;

  @Field(() => String)
  @Column({ type: 'text' })
  owner: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  name: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  english_name: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  phone: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  email: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  address: string;

  @Field(() => [Experience])
  @Column({ type: 'jsonb', array: false, default: '[]' })
  education: Experience[];

  @Field(() => [Experience])
  @Column({ type: 'jsonb', array: false, default: '[]' })
  professional_experience: Experience[];

  @Field(() => [Experience])
  @Column({ type: 'jsonb', array: false, default: '[]' })
  leadership_experience: Experience[];

  @Field(() => [Skill])
  @Column({ type: 'jsonb', array: false, default: '[]' })
  others: Skill[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
