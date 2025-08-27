import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// Update the debounced value after "delay" amount of time
		const timerID = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerID);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
