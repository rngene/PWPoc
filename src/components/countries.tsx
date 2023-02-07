import React from "react";

const Countries = () => { 
    return <div>Country&nbsp;
      <span>
          <select>
            <option value='US'>United States</option>
            <option value='UA'>Ukraine</option>
          </select>
      </span>
      <span><input type='button' value='submit'></input></span>
    </div>; 
}

export default Countries;