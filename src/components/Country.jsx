import { useEffect, useRef, useState } from "react";
import SingleCountry from "./SingleCountry";

export default function () {
	const [countries, setCountries] = useState([]);
	const inputRef = useRef(null);
	const fetchCountries = async (url) => {
		const api = await fetch(url);
		const data = await api.json();
		return data;
	};

	useEffect(() => {
		const handleSetCountries = async () => {
			const newData = await fetchCountries("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
			setCountries(newData);
		};
		handleSetCountries();
	}, []);

	const handleCountrySearch = async () => {
		const countryName = inputRef?.current.value;
		console.log(countryName);
		const ctrs = await fetchCountries("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
		if (countryName) {
			const filteredCountries = [...ctrs].filter((country) =>
				country.name.toLowerCase().startsWith(countryName.trim().toLowerCase())
			);
			console.log(filteredCountries);
			setCountries([...filteredCountries]);
		} else {
			setCountries(ctrs);
		}
	};

	return (
		<div style={{ marginTop: "15px" }}>
			<input
				ref={inputRef}
				style={{ padding: "12px" }}
				type="text"
				className="search-input"
				placeholder="search for a country"
			/>
			<button
				style={{ padding: "10px", marginLeft: "10px" }}
				onClick={handleCountrySearch}
				className="search-button"
			>
				Search Button
			</button>

			<div
				style={{
					marginTop: 10,
					display: "grid",
					gridTemplateColumns: `repeat(4, auto)`,
					gap: 7,
				}}
			>
				{countries.length >= 1 ? (
					countries.map((e) => {
						return (
							<SingleCountry countryData={e} key={e.id} />
						);
					})
				) : (
					<h1>No country found!</h1>
				)}
			</div>
		</div>
	);
}
