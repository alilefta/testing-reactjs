import useCounter from "@/customHooks/useCounter";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("useCounter hook", () => {
	test("Should have initial value of 0", () => {
		const { result } = renderHook(() => useCounter());

		expect(result.current.count).toBe(0);
	});

	test("Should use the provided value", () => {
		const { result } = renderHook(() => useCounter({ initialValue: 2 }));

		expect(result.current.count).toBe(2);
	});

	test("Should increment the count", () => {
		const { result } = renderHook(() => useCounter());

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
