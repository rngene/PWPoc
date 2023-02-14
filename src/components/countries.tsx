'use client'
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Country from "@/models/country";
import CountryListItem from "@/models/countryListItem";

export interface CountriesProps {
    countryListItems: CountryListItem[]
}

export const Countries : React.FC<CountriesProps> = (props : CountriesProps) => { 

    const [countryCode, setCountryCode] = useState<string>(props.countryListItems[0].code);
    const [country, setCountry] = useState<Country|null>(null);

    const COUNTRIES_QUERY = gql`
    query Country($id: ID!) {
        country(code: $id) {
        name
        capital
        currency
       }
    }`;

    const [getCountryDetails, { called, loading, data }] = useLazyQuery(COUNTRIES_QUERY);

    useEffect(() => {
        if (data) {
            setCountry({
                capital: data.country.capital,
                currency: data.country.currency
            });
        }
    },[data]);

    const handleChange = (selectedOption: React.ChangeEvent<HTMLSelectElement>)  => {
        setCountryCode(selectedOption.target.value);
    };    
 
    return <div><label data-testid='country-label'>Country</label>
      <span>
          <select  onChange={handleChange} data-testid='country-select'>
            {props.countryListItems.map(c => {
                return <option value={c.code} key={c.code}>{c.name}</option>
            })}
           

          </select>
      </span>
      <span><input type='button' value='submit' data-testid='submit-button' onClick={() => getCountryDetails({ variables: { id: countryCode } })}></input></span>
      {country ? 
         <>
         <div>&nbsp;</div>
            <div>Capital: <label data-testid='capital-label'>{country.capital}</label></div>
            <div>Currency: <label data-testid='currency-label'>{country.currency}</label></div>
         </>
        : 
         <></> }
      
    </div>; 
}

