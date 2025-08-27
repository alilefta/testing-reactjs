import { useMemo, useState, type ReactNode } from "react";
import { AccordionContext, type AccordionContextType } from "./accordion_context/AccordionContext";

interface AccordionProps {
	defaultValue?: string;
	children: ReactNode;
}

export const Accordion = ({ defaultValue, children }: AccordionProps) => {
	const [openItemValue, setOpenItemValue] = useState<string | null>(defaultValue ?? null);

	const toggleItem = (value: string) => {
		setOpenItemValue((prevValue) => (prevValue === value ? null : value));
	};

	const contextValue = useMemo((): AccordionContextType => ({ openItemValue, toggleItem }), [openItemValue]);
	return (
		<AccordionContext.Provider value={contextValue}>
			<div>{children}</div>
		</AccordionContext.Provider>
	);
};
