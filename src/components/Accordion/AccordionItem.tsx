import type { ReactNode } from "react";
import { useAccordion } from "./accordion_context/AccordionContext";

interface AccordionItemProps {
	children: ReactNode;
	value: string; // A unique value for this item
	trigger: ReactNode; // The clickable part (the header)
}

export const AccordionItem = ({ children, value, trigger }: AccordionItemProps) => {
	const { openItemValue, toggleItem } = useAccordion();

	const isOpen = openItemValue === value;

	return (
		<div className="Accordion-item" title="accordion-item">
			<button role="button" type="button" className="accordion-trigger" onClick={() => toggleItem(value)}>
				{trigger}
				<span>{isOpen ? "-" : "+"}</span>
			</button>
			{isOpen && (
				<div className="accordion-content" data-testid="accordion-content">
					{children}
				</div>
			)}
		</div>
	);
};
