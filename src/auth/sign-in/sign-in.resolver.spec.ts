import { Test, TestingModule } from '@nestjs/testing';
import { SignInResolver } from './sign-in.resolver';

describe('SignInResolver', () => {
  let resolver: SignInResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignInResolver],
    }).compile();

    resolver = module.get<SignInResolver>(SignInResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
