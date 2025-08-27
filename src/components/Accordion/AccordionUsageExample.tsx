import { Accordion } from "./Accordion";
import { AccordionItem } from "./AccordionItem";

export const AccordionUsageExample = () => {
	return (
		<div>
			<Accordion defaultValue="item-1">
				<AccordionItem value="item-1" trigger={<h3>What is React?</h3>}>
					<p>React is a front end web library to build interactive web apps.</p>
				</AccordionItem>
				<AccordionItem value="item-2" trigger={<h3>What are compound components?</h3>}>
					<p>A pattern where multiple components work together to manage a shared state.</p>
					<p>You can even put other components inside!</p>
					<button>Click me</button>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
