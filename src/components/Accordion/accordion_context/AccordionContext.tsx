import { createContext, useContext } from "react";

export interface AccordionContextType {
	openItemValue: string | null;
	toggleItem: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordion = () => {
	const context = useContext(AccordionContext);

	if (!context) {
		throw new Error("useAccordion must be used inside AccordionProvider");
	}

	return context;
};
