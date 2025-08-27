import { expect, test, vi } from "vitest";
import axios from "axios";
import { describe } from "node:test";
import { UserDisplay } from "@/components/UserDisplay";
import { render, screen } from "@testing-library/react";

vi.mock("axios");

const mockedAxios = vi.mocked(axios.get);

describe("UserDisplay", () => {
	test("It should display User Name when fetched data", async () => {
		const userName = "John Doe";

		mockedAxios.mockResolvedValue({ data: { name: userName } });

		render(<UserDisplay userId="1" />);

		// ACT: The component's `useEffect` will run and call `axios.get`.

		// ASSERT: We use `findBy...` because the data appears asynchronously.
		// It will wait until the "Loading..." text is gone and the name appears.
		const headingElement = await screen.findByRole("heading", { name: userName });
		expect(headingElement).toBeInTheDocument();

		// You can also assert that the mock was called correctly.
		expect(mockedAxios).toHaveBeenCalledWith("https://api.example.com/users/1");
		expect(mockedAxios).toHaveBeenCalledTimes(1);
	});

	test("should display an error message on failed fetch", async () => {
		// ARRANGE: Configure the mock to fail for this test.
		mockedAxios.mockRejectedValue(new Error("Network error"));

		render(<UserDisplay userId="1" />);

		// ACT: The `useEffect` will run, and the promise will be rejected.

		// ASSERT: Wait for the error message to appear.
		const errorElement = await screen.findByText(/failed to fetch user/i);
		expect(errorElement).toBeInTheDocument();
	});
});
