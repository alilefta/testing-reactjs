import useDebounce from "@/customHooks/useDebounce";
import { act, renderHook } from "@testing-library/react";
import { expect, test, vi } from "vitest";

test("useDebounce works correctly", () => {
	vi.useFakeTimers();
	const { result } = renderHook(() => useDebounce("test", 500));

	act(() => {
		vi.advanceTimersByTime(500);
	});

	expect(result.current).toBe("test");
	vi.useRealTimers();
});
