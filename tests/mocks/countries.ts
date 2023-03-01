import Country from "@/models/country"

export function getMockedCountries() : Country[] {
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
