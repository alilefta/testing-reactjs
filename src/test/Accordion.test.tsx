import { describe, expect, it } from "vitest";
import { Accordion } from "../components/Accordion/Accordion";
import { AccordionItem } from "../components/Accordion/AccordionItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Default State", () => {
	it("Render accordion with default items", () => {
		render(
			<Accordion>
				<AccordionItem trigger={<p>What is React?</p>} value="part-1" key={0}>
					<h1>Content 1</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>What is Jest?</p>} value="part-2" key={1}>
					<h1>Content 2</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>Open</p>} value="part-3" key={2}>
					<h1>Content 3</h1>
				</AccordionItem>
			</Accordion>
		);

		const allItems = screen.getAllByTitle(/accordion-item/);
		expect(allItems.length).toBe(3);

		// Trigger for first Item must be visible
		const firstItemTrigger = screen.getByRole("button", { name: /What is React?/i });
		expect(firstItemTrigger).toBeVisible();

		// Content for first item must be collapsed or null
		const firstItemContent = screen.queryByText(/Content 1/i);
		expect(firstItemContent).not.toBeInTheDocument();

		// trigger for second item must be visible
		const secondItemTrigger = screen.getByRole("button", { name: /What is Jest?/i });
		expect(secondItemTrigger).toBeVisible();

		const secondItemContent = screen.queryByText(/Content 2/i);
		expect(secondItemContent).not.toBeInTheDocument();
		expect(secondItemContent).toBeNull();
	});

	it("Clicking a trigger opens an item and show content", async () => {
		render(
			<Accordion>
				<AccordionItem trigger={<p>What is React</p>} value="part-1" key={0}>
					<h1>Content 1</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>What is Jest?</p>} value="part-2" key={1}>
					<h1>Content 2</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>How Vitest Works?</p>} value="part-3" key={2}>
					<h1>Content 3</h1>
				</AccordionItem>
			</Accordion>
		);

		const user = userEvent.setup();

		const buttonForFirstTrigger = screen.getByRole("button", { name: /What is React?/i });

		await user.click(buttonForFirstTrigger);

		// Content must now be visible
		const firstItemContent = screen.queryByText(/Content 1/i);
		expect(firstItemContent).toBeVisible();

		// Second item content must be collapsed
		const secondItemContent = screen.queryByText(/Content 2/i);
		expect(secondItemContent).toBeNull();
	});

	it("Clicking an opened item, should closes its content panel", async () => {
		render(
			<Accordion>
				<AccordionItem trigger={<p>What is React</p>} value="part-1" key={0}>
					<h1>Content 1</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>What is Jest?</p>} value="part-2" key={1}>
					<h1>Content 2</h1>
				</AccordionItem>
			</Accordion>
		);

		const buttonForFirstTrigger = screen.getByRole("button", { name: /What is React?/i });
		let firstItemContent = screen.queryByText(/Content 1/i);

		const user = userEvent.setup();

		// content is collapsed
		expect(firstItemContent).toBeNull();

		// Click to show content
		await user.click(buttonForFirstTrigger);

		firstItemContent = screen.queryByText(/Content 1/i);

		// Content must now be visible
		expect(firstItemContent).toBeVisible();

		// Click one more to hide content
		await user.click(buttonForFirstTrigger);

		// Second item content must be collapsed
		firstItemContent = screen.queryByText(/Content 1/i);
		expect(firstItemContent).toBeNull();
	});

	it("Opening an item should automatically close the other items", async () => {
		// Arrange
		render(
			<Accordion>
				<AccordionItem trigger={<p>What is React</p>} value="part-1" key={0}>
					<h1>Content 1</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>What is Jest?</p>} value="part-2" key={1}>
					<h1>Content 2</h1>
				</AccordionItem>
			</Accordion>
		);

		const buttonForFirstTrigger = screen.getByRole("button", { name: /What is React?/i });
		const buttonForSecondTrigger = screen.getByRole("button", { name: /What is Jest?/i });

		const user = userEvent.setup();

		// Act
		// Open first item
		await user.click(buttonForFirstTrigger);

		// Assert
		// Content 1 is visible
		expect(screen.queryByText(/Content 1/i)).toBeVisible();

		// Content 2 is Null
		expect(screen.queryByText(/Content 2/i)).toBeNull();

		// Click to open second item
		await user.click(buttonForSecondTrigger);

		// First item is now null
		expect(screen.queryByText(/Content 1/i)).toBeNull();

		// Second Item Content must now be visible
		expect(screen.queryByText(/Content 2/i)).toBeVisible();
	});

	it("Providing default prop will result in an item content that is visible", () => {
		render(
			<Accordion defaultValue="part-2">
				<AccordionItem trigger={<p>What is React</p>} value="part-1" key={0}>
					<h1>Content 1</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>What is Jest?</p>} value="part-2" key={1}>
					<h1>Content 2</h1>
				</AccordionItem>
				<AccordionItem trigger={<p>How Vitest Works?</p>} value="part-3" key={2}>
					<h1>Content 3</h1>
				</AccordionItem>
			</Accordion>
		);
		// Content 1 is Null
		expect(screen.queryByText(/Content 1/i)).toBeNull();

		// Content 2 is Visible
		expect(screen.queryByText(/Content 2/i)).toBeVisible();

		// Content 3 is Null
		expect(screen.queryByText(/Content 3/i)).toBeNull();
	});
});
