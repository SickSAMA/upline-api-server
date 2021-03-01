import { Arg, Mutation, Query, Resolver, Int, Authorized, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Resume } from '../entities/resume';
import { RequestContext } from '../types/RequestContext';
import { ResumeInput } from './types/resume-input';

@Resolver(() => Resume)
export class ResumeResolver {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepository: Repository<Resume>,
  ) {}

  @Authorized()
  @Query(() => Resume, { nullable: true })
  resume(@Arg('id', () => Int) id: number): Promise<Resume | undefined> {
    return this.resumeRepository.findOne(id);
  }

  @Authorized()
  @Query(() => [Resume], { nullable: true })
  resumes(): Promise<Resume[]> {
    return this.resumeRepository.find();
  }

  @Authorized()
  @Mutation(() => Resume)
  saveResume(
    @Arg('resume') resumeInput: ResumeInput,
    @Ctx() { user }: RequestContext,
  ): Promise<Resume> {
    resumeInput.owner = user!.username;
    const resume = this.resumeRepository.create(resumeInput);
    return this.resumeRepository.save(resume);
  }
}
