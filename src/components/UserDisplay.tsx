import axios from "axios";
import { useEffect, useState } from "react";

export const UserDisplay = ({ userId }: { userId: string }) => {
	const [user, setUser] = useState<{ name: string } | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get(`https://api.example.com/users/${userId}`)
			.then((response) => {
				setUser(response.data);
			})
			.catch((err) => {
				setError(`Failed to fetch user, ${err}`);
			});
	}, [userId]);

	if (error) return <p>{error}</p>;
	if (!user) return <p>Loading...</p>;
	return <h1>{user.name}</h1>;
};
