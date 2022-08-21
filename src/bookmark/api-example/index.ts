import { CreateBookmarkDto, EditBookmarkDto } from '../dto';

const CreateBookmarkExample = {
  type: CreateBookmarkDto,
  examples: {
    a: {
      summary: 'Example 1',
      value: {
        title: 'Google',
        description: 'Google home page',
        link: 'https://google.com',
      } as CreateBookmarkDto,
    },
  },
};

const EditBookmarkExample = {
  type: EditBookmarkDto,
  examples: {
    a: {
      summary: 'Example 1',
      value: {
        title: 'Google2',
        description: 'Google home page',
        link: 'https://google.com',
      } as EditBookmarkDto,
    },
  },
};

export { CreateBookmarkExample, EditBookmarkExample };
