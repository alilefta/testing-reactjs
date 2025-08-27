import type { ReactElement, ReactNode } from "react";

interface ButtonProps {
	className?: string;
	variant: "primary" | "secondary" | "danger";
	size: "sm" | "lg";
	icon?: ReactElement;
	children: ReactNode;
	attributes?: string;
	onClick: () => void;
}

export const Button = ({ className, variant, icon, size, children, onClick, ...attributes }: ButtonProps) => {
	let configuredClassName = `${className ? className.split(" ").filter(Boolean).join(" ") : ""}`;

	switch (size) {
		case "sm":
			configuredClassName += "px-2 py-1 text-sm [&>i]:size-4 ";
			break;
		case "lg":
			configuredClassName += "px-3 py-2 text-lg [&>i]:size-6 ";
			break;
	}

	switch (variant) {
		case "primary":
			configuredClassName += "bg-blue-600 text-neutral-50 ";
			break;
		case "secondary":
			configuredClassName += "bg-gray-500 text-neutral-50 ";
			break;
		case "danger":
			configuredClassName += "bg-red-600 text-neutral-50 ";
			break;
	}

	const baseButton = (
		<button className={`${configuredClassName} rounded-sm flex items-start justify-center text-center`} role="button" {...attributes} onClick={onClick}>
			{icon && <i className={`flex items-center justify-center my-auto mr-2`}>{icon}</i>}
			{children}
		</button>
	);

	return baseButton;
};
