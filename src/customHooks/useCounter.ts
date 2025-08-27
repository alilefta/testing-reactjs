import { useCallback, useState } from "react";

type CounterReturnType = {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	setCount: (value: number) => void;
};

interface CounterPropsType {
	initialValue?: number;
	min?: number;
	max?: number;
}

const useCounter = ({ initialValue = 0, min = -Infinity, max = Infinity }: CounterPropsType = {}): CounterReturnType => {
	const [count, setCount] = useState<number>(() => {
		return Math.max(min, Math.min(max, initialValue));
	});

	const increment = useCallback((): void => {
		setCount((prevCount) => Math.min(max, prevCount + 1));
	}, [max]);

	const decrement = useCallback((): void => {
		setCount((prevCount) => Math.max(min, prevCount - 1));
	}, [min]);

	const customSetCount = useCallback(
		(value: number): void => {
			setCount(Math.max(min, Math.min(max, value)));
		},
		[min, max]
	);

	const reset = useCallback((): void => {
		setCount(initialValue);
	}, [initialValue]);

	return { count, increment, decrement, reset, setCount: customSetCount };
};

export default useCounter;
