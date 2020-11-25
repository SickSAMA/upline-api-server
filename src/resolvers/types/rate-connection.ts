import { Field, ObjectType } from 'type-graphql';

import { Rate } from '../../entities/rate';

@ObjectType()
export class RateConnection {
  @Field({ nullable: true })
  cursor?: string;

  @Field()
  hasMore: boolean;

  @Field(() => [Rate], { nullable: 'items' })
  rates: Rate[];
}
