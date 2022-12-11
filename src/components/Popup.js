import React from "react";

const Popup = (props) => {
  const { data, country } = props;
  return (
    <div className="popup">
      <div className="popup_inner">
        <h2>{props.data.Country}</h2>
        <img src={country?.flags?.png} alt={`${data?.Country}-country`} />
        <p>Capital: {country?.capital?.toLocaleString()}</p>
        <p>Region: {country?.region?.toLocaleString()}</p>
        <p>Subregion: {country?.subregion?.toLocaleString()}</p>
        <p>Total confirm: {data?.TotalConfirmed.toLocaleString()}</p>
        <p>Total deadths: {data?.TotalDeaths.toLocaleString()}</p>
        <p>Total recovered: {data?.TotalRecovered.toLocaleString()}</p>
        <p>Population: {country?.population?.toLocaleString()}</p>
        <p>Area: {country?.area?.toLocaleString()}</p>
        <div className="text-end">
          <button className="btn btn-cancle" onClick={props.closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
