import type { Meta, StoryObj } from "@storybook/react";

import TextArea from "./index";

const meta = {
  title: "TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "input label name",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    id: {
      control: "text",
      description: "id for html's label tag",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
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
    onBlur: {
      description: "callback function while input status is blur",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    minLength: {
      control: "number",
      description: "minimum length of inputText",
      table: { defaultValue: { summary: "undefined" } },
    },
    maxLength: {
      control: "number",
      description: "maximum length of inputText",
      table: { defaultValue: { summary: "undefined" } },
    },
    onError: {
      description: `check if the length of string is out of minLength to maxLength`,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    className: {
      control: "text",
      description: "custom className for the inputText",
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "TEST_TEXTAREA",
    label: "TEST_TEXTAREA",
    value: "",
    minLength: 0,
    maxLength: 5,
    placeHolder: "plz type something",
  },
};
