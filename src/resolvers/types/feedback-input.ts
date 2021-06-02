/* eslint-disable camelcase */
import { Field, InputType } from 'type-graphql';
import { Feedback } from '../../entities/feedback';

/**
 * Omit id, created_at, updated_at from Feedback.
 */

@InputType()
export class FeedbackInput implements Partial<Feedback> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  message: string;
}
