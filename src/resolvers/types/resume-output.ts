/* eslint-disable camelcase */
import { Field, ObjectType } from 'type-graphql';
import { Resume } from '../../entities/resume';
import { Experience } from '../../entities/experience';
import { Skill } from '../../entities/skill';
import { ResumeStyle } from '../../entities/resume-style';

/**
 * Omit id, owner from Resume.
 */

@ObjectType()
export class ResumeOutput implements Partial<Resume> {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  resume_name: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  english_name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  address: string;

  @Field(() => [Experience])
  education: Experience[];

  @Field(() => [Experience])
  professional_experience: Experience[];

  @Field(() => [Experience])
  leadership_experience: Experience[];

  @Field(() => [Skill])
  others: Skill[];

  @Field(() => ResumeStyle)
  styles: ResumeStyle;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
