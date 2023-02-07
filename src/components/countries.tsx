import React from "react";
import { useQuery, gql } from "@apollo/client";

const Countries = () => { 
    const FILMS_QUERY = gql`
    {
      launchesPast(limit: 10) {
        id
        mission_name
      }
    }
  `;    

    function getCountryDetails() {
        alert('here');
    }
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