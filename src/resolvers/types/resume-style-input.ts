/* eslint-disable camelcase */
import { Field, Float, InputType } from 'type-graphql';
import { ResumeStyle } from '../../entities/resume-style';

@InputType()
export class ResumeStyleInput implements Partial<ResumeStyle> {
  @Field(() => String)
  font_family: string;

  @Field(() => Float)
  font_size: number;

  @Field(() => Float)
  line_height: number;

  @Field(() => String)
  margin: string;

  @Field(() => String)
  header_alignment: string;
}

export const defaultResumeStyleInput: ResumeStyleInput = {
  font_family: 'Arial',
  font_size: 11,
  line_height: 1,
  margin: '72 72 72 72',
  header_alignment: 'center',
};
