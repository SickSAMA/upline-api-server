import { ForbiddenError, UserInputError } from 'apollo-server-express';
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
  async resume(
    @Arg('uuid', () => String) uuid: string,
    @Ctx() { user }: RequestContext,
  ): Promise<Resume | undefined> {
    const resume = await this.resumeRepository.findOne({ uuid, owner: user!.username });
    console.log(resume);
    if (resume) {
      return resume;
    } else {
      throw new UserInputError('Resume not found.');
    }
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
    if (resumeInput.owner && resumeInput.owner !== user!.username) {
      throw new ForbiddenError('Unauthorized action!');
    }

    if (!resumeInput.owner) {
      resumeInput.owner = user!.username;
    }

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
