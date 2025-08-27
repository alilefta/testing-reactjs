import { Button } from "@/components/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { AxeIcon, Check, Icon } from "lucide-react";
import { fn } from "storybook/test";
const meta = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "radio", options: ["primary", "secondary", "danger"] },
		size: { control: "radio", options: ["sm", "lg"] },
		icon: {
			control: "radio",
			options: ["Icon", "Non"],
			mapping: {
				Icon: <Check />,
				Non: "",
			},
		},
	},
	args: {
		onClick: fn(),
		icon: undefined,
		variant: "primary",
		size: "lg",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Click me",
		size: "lg",
		icon: <AxeIcon />,
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Click me",
		size: "lg",
		icon: <AxeIcon />,
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		children: "Click me",
		size: "lg",
		icon: <AxeIcon />,
	},
};
