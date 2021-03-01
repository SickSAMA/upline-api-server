import { Field, InputType } from 'type-graphql';
import { Skill } from '../../entities/skill';

@InputType()
export class SkillInput implements Skill {
  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => String, { nullable: true })
  value?: string;
}
