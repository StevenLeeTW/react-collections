import type { Meta, StoryObj } from "@storybook/react";

import RadioButtonGroup from "./index";

const meta = {
  title: "RadioButtonGroup",
  component: RadioButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "options for the radio button group",
      table: {
        defaultValue: {
          summary: "[]",
        },
      },
    },
    defaultSelected: {
      control: "number",
      table: { defaultValue: { summary: "undefined" } },
    },
    onChange: {
      description: "callback function while selectedIndex is chaned every signle time",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: "apple", label: "apple", disabled: false },
      { value: "pie", label: "pie", disabled: true },
      { value: "banana", label: "banana", disabled: false },
      { value: "carrot", label: "carrot", disabled: false },
      { value: "pineapple", label: "pineapple", disabled: false },
    ],
    defaultSelected: 0,
  },
};
