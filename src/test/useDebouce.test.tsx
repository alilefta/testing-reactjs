import useDebounce from "@/customHooks/useDebounce";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("should return the updated value after the delay", async () => {
	const { result, rerender } = renderHook(({ value, delay }) => useDebounce<string>(value, delay), {
		initialProps: { value: "initial", delay: 500 },
	});

	// Assert initial Props
	expect(result.current).toBe("initial");

	//Update props
	rerender({ value: "updated", delay: 500 });

	// Assert that the value still initial
	expect(result.current).toBe("initial");

	await waitFor(
		() => {
			expect(result.current).toBe("updated");
		},
		{ timeout: 600 }
	);
});
