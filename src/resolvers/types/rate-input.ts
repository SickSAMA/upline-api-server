import { Field, InputType, ID, Int } from 'type-graphql';

@InputType()
export class RateInput {
  @Field(() => ID)
  recipeId: number;

  @Field(() => Int)
  value: number;

  @Field()
  cursor: string;
}
