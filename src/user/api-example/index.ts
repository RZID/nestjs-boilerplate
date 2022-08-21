import { EditUserDto } from '../dto';

const EditUserExample = {
  type: EditUserDto,
  examples: {
    a: {
      summary: 'Example 1',
      value: {
        email: 'test@test.com',
        firstName: 'firstname1',
        lastName: 'lastname1',
        role: 'USER',
      } as EditUserDto,
    },
  },
};

export { EditUserExample };
