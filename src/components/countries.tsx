'use client'
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CountryDetails from "@/models/countryDetails";
import Country from "@/models/country";

export interface CountriesProps {
    countryListItems: Country[]
}

export const Countries : React.FC<CountriesProps> = (props : CountriesProps) => { 
    interface CountryResult {
        country:  CountryDetails;
    };    

    const [countryCode, setCountryCode] = useState<string>(props.countryListItems[0].code);
    const [countryDetails, setCountryDetails] = useState<CountryDetails|null>(null);

    const COUNTRIES_QUERY = gql`
        query Country($id: ID!) {
            country(code: $id) {
            capital
            currency
            phone
           }
        }`;

    const [getCountryDetails, { data, error }] = useLazyQuery<CountryResult>(COUNTRIES_QUERY);
    
    useEffect(() => {
        if (data) {
            setCountryDetails(data.country);
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
      {countryDetails ? 
         <>
          <label>Capital</label><label className='result' data-testid='capital-label'>{countryDetails.capital}</label>
          <label>Currency</label><label className='result' data-testid='currency-label'>{countryDetails.currency}</label>
          <label>Phone</label><label className='result' data-testid='phone-label'>{countryDetails.phone}</label>
         </>
        : 
         <>
         { (error !== undefined) ?
         <label className='error' data-testid='error-label'>Sorry an error has occurred</label> 
         : <></>
         
         }
         </>
      }
    </div>; 
}

