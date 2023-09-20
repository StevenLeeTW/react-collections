import type { Meta, StoryObj } from "@storybook/react";

import InputNumber from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "InputNumber",
  component: InputNumber,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      control: "text",
      description: "id for html's label tag",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    decimalPlaces: { control: "number", table: { defaultValue: { summary: "0" } } },
    value: {
      control: "text",
      table: { defaultValue: { summary: "undefined" } },
    },
    onChange: {
      description: "callback function while input is chaned every signle time",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    step: {
      control: "number",
      description: "while typing arrow key up/down, every step is add/minus as you want",
      table: { defaultValue: { summary: "1" } },
    },
    prefix: {
      control: "text",
      description: "prefix of inputNumber",
      table: { defaultValue: { summary: "" } },
    },
    min: {
      control: "number",
      description: "minimum value of inputNumber",
      table: { defaultValue: { summary: "-Infinity" } },
    },
    max: {
      control: "number",
      description: "maximum value of inputNumber",
      table: { defaultValue: { summary: "Infinity" } },
    },
    isEnforceRange: {
      control: "boolean",
      description: "auto fix value while value of is greater/less than max/min",
      table: { defaultValue: { summary: "true" } },
    },
    onError: {
      description: `errorProps = {
  message?: 'number is greater than max value' | 'number is less than min value'
  value?: string
}`,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    className: {
      control: "text",
      description: "custom className for the inputNumber",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    placeHolder: {
      control: "text",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    "data-testid": {
      control: "text",
      description:
        "testid make this component can be easily captured element via html(usually it is for e2e testing)",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    value: "",
    decimalPlaces: 0,
    step: 1,
    min: -Infinity,
    max: Infinity,
    isEnforceRange: true,
    prefix: "",
    placeHolder: "plz typing something",
  },
};
