import { Field, InputType } from 'type-graphql';
import { Recipe } from '../../entities/recipe';
import { User } from '../../entities/user';

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
