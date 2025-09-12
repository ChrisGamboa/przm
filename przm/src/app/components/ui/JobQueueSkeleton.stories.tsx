import type { Meta, StoryObj } from '@storybook/react';
import { JobQueueSkeleton } from './JobQueueSkeleton';

const meta: Meta<typeof JobQueueSkeleton> = {
  title: 'Components/JobQueueSkeleton',
  component: JobQueueSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton displayed while job queue data is being fetched from the server.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default loading skeleton for the job queue screen.',
      },
    },
  },
};
