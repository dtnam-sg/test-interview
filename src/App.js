import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./components/Popup";
import Spinner from "./components/Spinner/index";
import './App.css';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({});
  const [country, setCountry] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        let { data } = await axios.get("https://api.covid19api.com/summary");
        setItems(data?.Countries);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (showPopup) {
      getCountryByCode(data?.CountryCode);
    }
  }, [showPopup,data?.CountryCode]);

  const getCountriesTotalConfirm = () => {
    const newItems = [...items];
    const list = newItems?.sort(
      (a, b) =>
        b.TotalConfirmed - a.TotalConfirmed && b.TotalDeaths - a.TotalDeaths
    );
    return list;
  };

  const results = getCountriesTotalConfirm();

  const getCountryByCode = async (code) => {
    try {
      setIsLoading(true);
      let { data } = await axios.get(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      data && setCountry(data[0]);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const showPopupDetail = (item) => {
    setData(item);
    setShowPopup(preState => !preState);
  };
  
  const hidePopup = () => {
    setData({})
    setShowPopup(false);
  }

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h3>List of countries affected by Covid-19</h3>
          {results?.map((it, index) => (
            <div className="d-flex" key={it?.ID}>
              <p>
                {index + 1}. {it?.Country} - {it?.CountryCode} - {it?.Slug}
              </p>
              <span onClick={() => showPopupDetail(it)}>Detail</span>
            </div>
          ))}
        </>
      )}
      {showPopup && data && (
        <Popup data={data} country={country} closePopup={hidePopup} />
      )}
    </div>
  );
}
