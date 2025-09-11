import type { Meta, StoryObj } from "@storybook/react";

import { Home } from "./Home";

const meta: Meta<typeof Home> = {
  component: Home,
};

export default meta;
type Story = StoryObj<typeof Home>;

export const NotLoggedIn: Story = {
  args: {
    ctx: {
      user: null,
      session: null,
    },
  },
};

export const LoggedIn: Story = {
  args: {
    ctx: {
      user: {
        id: "1",
        username: "redwood_fan_123",
        createdAt: new Date(),
      },
      session: null,
    },
  },
  argTypes: {
    ctx: {
      options: ["redwood_fan_123", "storybook_user", "example_user"],
      mapping: {
        redwood_fan_123: {
          user: { id: "1", username: "redwood_fan_123", createdAt: new Date() },
          session: null,
        },
        storybook_user: {
          user: { id: "2", username: "storybook_user", createdAt: new Date() },
          session: null,
        },
        example_user: {
          user: { id: "3", username: "example_user", createdAt: new Date() },
          session: null,
        },
      },
    },
  },
};