import { ForbiddenError, UserInputError } from 'apollo-server-express';
import { Arg, Mutation, Query, Resolver, Authorized, Ctx, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Feedback } from '../entities/feedback';
import { RequestContext } from '../types/RequestContext';
import { FeedbackInput } from './types/feedback-input';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  @Authorized()
  @Query(() => Feedback)
  async feedback(
    @Arg('id', () => Int) id: number,
    @Ctx() { user }: RequestContext,
  ): Promise<Feedback> {
    // TODO: add authorization support
    if (user!.username !== 'admin') {
      throw new ForbiddenError('Unauthorized action!');
    }

    const feedback = await this.feedbackRepository.findOne(id);
    if (feedback) {
      return feedback;
    } else {
      throw new UserInputError('Feedback not found.');
    }
  }

  @Authorized()
  @Query(() => [Feedback])
  feedbacks(
    @Ctx() { user }: RequestContext,
  ): Promise<Feedback[]> {
    // TODO: add authorization support
    if (user!.username !== 'admin') {
      throw new ForbiddenError('Unauthorized action!');
    }

    return this.feedbackRepository.find({
      order: {
        updated_at: 'DESC',
      },
    });
  }

  @Mutation(() => Feedback)
  saveFeedback(
    @Arg('feedback') feedbackInput: FeedbackInput,
  ): Promise<Feedback> {
    const feedback = this.feedbackRepository.create(feedbackInput);
    return this.feedbackRepository.save(feedback);
  }
}
