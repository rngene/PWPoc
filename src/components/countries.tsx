'use client'
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Country from "@/models/country";
import CountryListItem from "@/models/countryListItem";

export interface CountriesProps {
    countryListItems: CountryListItem[]
}

export const Countries : React.FC<CountriesProps> = (props : CountriesProps) => { 
    interface CountryResult {
        country:  Country;
    };    

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

    const [getCountryDetails, { called, loading, data }] = useLazyQuery<CountryResult>(COUNTRIES_QUERY);
    
    useEffect(() => {
        if (data) {
            setCountry(data.country);
        }
    },[data]);

    const countryChangeHandler = (selectedOption: React.ChangeEvent<HTMLSelectElement>)  => {
        setCountryCode(selectedOption.target.value);
    };   
    
    const getDetailsClickHandler = () => {
        getCountryDetails({ variables: { id: countryCode } });
    }
 
    return <div className="main"><label data-testid='country-label'>Country</label>
      <span>
          <select  onChange={countryChangeHandler} data-testid='country-select'>
            {props.countryListItems.map(c => {
                return <option value={c.code} key={c.code}>{c.name}</option>
            })}
          </select>
      </span>
      <input type='button' value='Get Details' data-testid='submit-button' onClick={getDetailsClickHandler}></input>
      {country ? 
         <>
          <label>Capital</label><label className='result' data-testid='capital-label'>{country.capital}</label>
          <label>Currency</label><label className='result' data-testid='currency-label'>{country.currency}</label>
         </>
        : 
         <></> }
    </div>; 
}

