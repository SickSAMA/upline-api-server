import { ObjectType, ID, Field } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rate } from './rate';
import { User } from './user';

@ObjectType()
@Entity()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [Rate])
  @OneToMany(() => Rate, (rate) => rate.recipe, { cascade: ['insert'] })
  ratings: Rate[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author: User;
}
