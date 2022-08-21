import { EditUserDto } from '../dto';

const EditUserExample = {
  type: EditUserDto,
  examples: {
    a: {
      summary: 'Example 1',
      value: {
        firstName: 'firstname1',
        lastName: 'lastname1',
      } as EditUserDto,
    },
  },
};

export { EditUserExample };
