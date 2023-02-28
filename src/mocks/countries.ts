import CountryListItem from "@/models/countryListItem"

export function getMockedCountries() : CountryListItem[] {
  return [
    {
      name: "Test country 1",
      code: "T1"
    },
    {
      name: "Test country 2",
      code: "T2"
    }
  ];
}
