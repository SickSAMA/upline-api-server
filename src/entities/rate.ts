import { Field, ObjectType, Int, ID } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe';
import { User } from './user';
import { Paginatable } from '../types/Paginatable';

@ObjectType()
@Entity()
export class Rate implements Paginatable {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  value: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field()
  @CreateDateColumn()
  date: Date;

  @Field()
  @Column()
  cursor: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe)
  recipe: Recipe;
}
