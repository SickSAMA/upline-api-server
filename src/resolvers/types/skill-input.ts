import { Field, InputType } from 'type-graphql';
import { Skill } from '../../entities/skill';

@InputType()
export class SkillInput implements Skill {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
