import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from 'type-graphql';
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
  resume(@Arg('uuid', () => String) uuid: string): Promise<Resume | undefined> {
    return this.resumeRepository.findOne({ uuid });
  }

  @Authorized()
  @Query(() => [Resume], { nullable: true })
  resumes(): Promise<Resume[]> {
    return this.resumeRepository.find();
  }

  @Authorized()
  @Mutation(() => Resume)
  async saveResume(
    @Arg('resume') resumeInput: ResumeInput,
    @Ctx() { user }: RequestContext,
  ): Promise<Resume> {
    resumeInput.owner = user!.username;
    const resume = this.resumeRepository.create(resumeInput);

    if (resumeInput.uuid) {
      const existingResume = await this.resumeRepository.findOne({ uuid: resumeInput.uuid });
      if (existingResume) {
        resume.id = existingResume.id;
      }
    }

    /**
     * TODO: due to the limitaiton of typeorm, we have to use 'save' to return the entity, which
     * is not efficient for 'update' operation because 'save' will select by id again.
     */
    return this.resumeRepository.save(resume);
  }
}
