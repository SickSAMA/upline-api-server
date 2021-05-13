import { ForbiddenError, UserInputError } from 'apollo-server-express';
import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Resume } from '../entities/resume';
import { RequestContext } from '../types/RequestContext';
import { ResumeInput } from './types/resume-input';
import { ResumeOutput } from './types/resume-output';
import { defaultResumeStyleInput } from './types/resume-style-input';

@Resolver(() => ResumeOutput)
export class ResumeResolver {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepository: Repository<Resume>,
  ) {}

  @Authorized()
  @Query(() => ResumeOutput, { nullable: true })
  async resume(
    @Arg('uuid', () => String) uuid: string,
    @Ctx() { user }: RequestContext,
  ): Promise<ResumeOutput | undefined> {
    const resume = await this.resumeRepository.findOne({ uuid, owner: user!.username });
    if (resume) {
      return resume;
    } else {
      throw new UserInputError('Resume not found.');
    }
  }

  @Authorized()
  @Query(() => [ResumeOutput])
  resumes(
    @Ctx() { user }: RequestContext,
  ): Promise<ResumeOutput[]> {
    return this.resumeRepository.find({ owner: user!.username });
  }

  @Authorized()
  @Mutation(() => ResumeOutput)
  async saveResume(
    @Arg('resume') resumeInput: ResumeInput,
    @Ctx() { user }: RequestContext,
  ): Promise<Resume> {
    const resume = this.resumeRepository.create(resumeInput);

    if (resumeInput.uuid) {
      const existingResume = await this.resumeRepository.findOne({ uuid: resumeInput.uuid });
      if (existingResume) {
        if (existingResume.owner === user!.username) {
          resume.id = existingResume.id;
          return this.resumeRepository.save(resume);
        } else {
          throw new ForbiddenError('Unauthorized action!');
        }
      }
    }

    resume.owner = user!.username;

    // when creating a new resume, set default styles
    if (!resumeInput.styles) {
      resume.styles = defaultResumeStyleInput;
    }

    /**
     * TODO: due to the limitaiton of typeorm, we have to use 'save' to return the entity, which
     * is not efficient for 'update' operation because 'save' will select by id again.
     */
    return this.resumeRepository.save(resume);
  }
}
