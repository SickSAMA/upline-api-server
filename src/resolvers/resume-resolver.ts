import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Resume } from '../entities/resume';
import { ResumeInput } from './types/resume-input';

@Resolver(() => Resume)
export class ResumeResolver {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepository: Repository<Resume>,
  ) {}

  @Query(() => Resume, { nullable: true })
  resume(@Arg('id', () => Int) id: number): Promise<Resume | undefined> {
    return this.resumeRepository.findOne(id);
  }

  @Query(() => [Resume], { nullable: true })
  resumes(): Promise<Resume[]> {
    return this.resumeRepository.find();
  }

  @Mutation(() => Resume)
  addResume(@Arg('resume') resumeInput: ResumeInput): Promise<Resume> {
    const resume = this.resumeRepository.create(resumeInput);
    return this.resumeRepository.save(resume);
  }
}
