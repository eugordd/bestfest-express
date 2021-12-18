import { continents, countries } from "countries-list";

export default (search: String) => {
    return Object.entries(countries)
        .filter(country => (
            // @ts-ignore
            country[1].name.toLowerCase().search(search) !== -1 ||
            // @ts-ignore
            continents[country[1].continent].toLowerCase().search(search) !== -1)
        )
        .map(item => item[0]);
}