import { AuthDto } from '../dto';

const AuthExample = {
  type: AuthDto,
  examples: {
    a: {
      summary: 'Example 1',
      value: { email: 'test@test.com', password: 'password1' } as AuthDto,
    },
  },
};

export { AuthExample };
