import type { Meta, StoryObj } from "@storybook/react";

import useFetch, { FetchProps, OptionProps } from "./useFetch";
import { ComponentType } from "react";

// originally useFetch use array to be parameters
// here we use 0,1,2 to make it like a array key
const UseFetchDemo = <T,>(props: { 0: string; 1: FetchProps; 2: Partial<OptionProps<T>> }) => {
  const { data, isError, isLoading } = useFetch<T>(props[0], props[1], props[2]);
  return (
    <>
      <div>data:{`${data}`}</div>
      <div>isError:{`${isError}`}</div>
      <div>isLoading:{`${isLoading}`}</div>
    </>
  );
};

const meta = {
  title: "hooks/useFetch",
  component: UseFetchDemo as ComponentType<any>,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    0: {
      control: "text",
      description: "key for cache's map",
      table: {
        defaultValue: {
          summary: "testId",
        },
      },
    },
    1: {
      description: "async function,e.g. fetching api or some else",
      table: { defaultValue: { summary: "()=>fetch(...)" } },
    },
    2: {
      description: "useFetch options",
      table: { defaultValue: { summary: "undefined" } },
    },
  },
} satisfies Meta<typeof UseFetchDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// apple store, would have cors error
export const Default: Story = {
  args: {
    0: "appleStore query",
    1: () =>
      fetch(
        "https://www.apple.com/tw/shop/mcm/tradein-credit?slugs=model_iphone_11,model_iphone_14_pro_max"
      ),
    2: { ltm: 10000 },
  },
};
