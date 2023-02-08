import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const Countries = () => { 
    
    const countriesQuery = gql`
    {
        countries {
          name,
          code
        }
      }
  `;    

   const { data, loading, error } = useQuery(countriesQuery);
   const [countryCode, setCountryCode] = useState<string>;

    function getCountryDetails() {
        setCountryCode('BR'); 
    }

    useEffect(() => {

    }), [countryCode];
    return <div>Country&nbsp;
      <span>
          <select>
            <option value='US'>United States</option>
            <option value='UA'>Ukraine</option>
          </select>
      </span>
      <span><input type='button' value='submit' onClick={getCountryDetails}></input></span>
    </div>; 
}

export default Countries;