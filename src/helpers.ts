import { getRepository } from 'typeorm';

import { Recipe } from './entities/recipe';
import { Rate } from './entities/rate';
import { User } from './entities/user';

interface seedData {
  defaultUser: User;
}

export async function seedDatabase(): Promise<seedData> {
  const recipeRepository = getRepository(Recipe);
  const rateRepository = getRepository(Rate);
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    username: 'test@github.com',
  });
  await userRepository.save(defaultUser);

  const recipes = recipeRepository.create([
    {
      title: 'Recipe 1',
      description: 'Desc 1',
      author: defaultUser,
      ratings: rateRepository.create([
        { value: 2, user: defaultUser, cursor: 'MTYwMjIzMDU1ODI3Mg==' },
        { value: 4, user: defaultUser, cursor: 'MTYwMjIzMDU4MzAyNw==' },
        { value: 5, user: defaultUser, cursor: 'MTYwMjIzMDYxMjA1OQ==' },
        { value: 3, user: defaultUser, cursor: 'MTYwMjIzMDYyOTUyOQ==' },
        { value: 4, user: defaultUser, cursor: 'MTYwMjIzMDY1MDU2Mw==' },
      ]),
    },
    {
      title: 'Recipe 2',
      author: defaultUser,
      ratings: rateRepository.create([
        { value: 2, user: defaultUser, cursor: 'MTYwMjIzMDY4OTk5NQ==' },
        { value: 4, user: defaultUser, cursor: 'MTYwMjIzMDcwMTg0Ng==' },
      ]),
    },
  ]);
  await recipeRepository.save(recipes);

  return {
    defaultUser,
  };
}
