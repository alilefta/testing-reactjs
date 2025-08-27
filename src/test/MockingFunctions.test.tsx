import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("Clicking a  button, calls onClickProp", async () => {
	const mockedOnClick = vi.fn();

	render(<button onClick={mockedOnClick}>Click Me</button>);

	await userEvent.click(screen.getByRole("button"));

	expect(mockedOnClick).toHaveBeenCalledTimes(1);
});
