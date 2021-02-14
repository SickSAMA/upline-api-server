import { Arg, Mutation, Query, Resolver, Int, Authorized } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Recipe } from '../entities/recipe';
import { RecipeInput } from './types/recipe-input';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
  ) {}

  @Authorized()
  @Query(() => Recipe, { nullable: true })
  recipe(@Arg('recipeId', () => Int) recipeId: number): Promise<Recipe | undefined> {
    return this.recipeRepository.findOne(recipeId, {
      relations: ['ratings', 'author', 'ratings.user'],
    });
  }

  @Query(() =>[Recipe])
  recipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: ['ratings', 'author', 'ratings.user'],
    });
  }

  @Mutation(() => Recipe)
  addRecipe(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = this.recipeRepository.create(recipeInput);
    return this.recipeRepository.save(recipe);
  }
}
