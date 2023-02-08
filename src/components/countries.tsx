import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const Countries = () => { 

    const [countryCode, setCountryCode] = useState<string>('US');

    const COUNTRIES_QUERY = gql`
    query Country($id: ID!) {
        country(code: $id) {
        name
        native
        capital
        emoji
        currency
        languages {
            code
            name
        }
        }
    }`;

    const [getCountryDetails, { called, loading, data }] = useLazyQuery(COUNTRIES_QUERY);

    const handleChange = (selectedOption: React.ChangeEvent<HTMLSelectElement>)  => {
        setCountryCode(selectedOption.target.value);
      };    
 
    return <div>Country&nbsp;
      <span>
          <select  onChange={handleChange}>
            <option value='US'>United States</option>
            <option value='UA'>Ukraine</option>
          </select>
      </span>
      <span><input type='button' value='submit' onClick={() => getCountryDetails({ variables: { id: countryCode } })}></input></span>
    </div>; 
}

export default Countries;