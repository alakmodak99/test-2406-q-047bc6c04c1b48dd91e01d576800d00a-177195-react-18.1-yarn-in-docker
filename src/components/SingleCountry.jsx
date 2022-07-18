import "./styles/singledesign.css";

export default function SingleCountry({ countryData }) {
	return (
		<div
			className={`country-list-${countryData.id}`}
			style={{ minHeight: `180px`, backgroundColor: "snow" }}
		>
			<img src={countryData.flag} />
			<div style={{marginLeft:"10px"}}>
				<h3>{countryData.name}</h3>
				<p>Population: {countryData.population}</p>
				<p>Region: {countryData.region}</p>
				<p>Capital: {countryData.capital}</p>
			</div>
		</div>
	);
}
