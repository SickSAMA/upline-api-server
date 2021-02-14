import { Query, Resolver, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Rate } from '../entities/rate';
import { Recipe } from '../entities/recipe';
import { RateInput } from './types/rate-input';
import { RateConnection } from './types/rate-connection';
import { RequestContext } from '../types/RequestContext';
import paginateResults from '../utils/paginateResults';

@Resolver()
export class RateResolver {
  constructor(
    @InjectRepository(Rate) private readonly rateRepository: Repository<Rate>,
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
  ) {}

  @Query(() => Rate, { nullable: true })
  async rate(@Arg('rateId', () => Int) rateId: number): Promise<Rate | undefined> {
    return await this.rateRepository.findOne(rateId, {
      relations: ['user', 'recipe'],
    });
  }

  @Query(() => RateConnection)
  async rates(
    @Arg('pageSize', () => Int, { nullable: true }) pageSize?: number,
    @Arg('after', { nullable: true }) after?: string,
  ): Promise<RateConnection> {
    const allRates = await this.rateRepository.find({
      relations: ['user', 'recipe', 'recipe.author'],
    });

    const rates = paginateResults<Rate>({
      after,
      pageSize,
      results: allRates,
    });

    const result: RateConnection = {
      rates,
      hasMore: rates.length ?
        rates[rates.length - 1].cursor !== allRates[allRates.length - 1].cursor :
        false,
    };

    if (rates.length) {
      result.cursor = rates[rates.length - 1].cursor;
    }

    return result;
  }

  @Mutation(() => Rate)
  async addRate(
    @Arg('rate') rateInput: RateInput,
    @Ctx() { user }: RequestContext,
  ): Promise<Rate> {
    const recipe = await this.recipeRepository.findOne(rateInput.recipeId);

    if (!recipe) {
      throw new Error('Invalid recipe ID');
    }

    const newRate = this.rateRepository.create({
      recipe,
      value: rateInput.value,
      cursor: rateInput.cursor,
      user,
    });

    return await this.rateRepository.save(newRate);
  }
}
