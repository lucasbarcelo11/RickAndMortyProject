import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Location from "./components/Location";

function App() {
  const [location, setLocation] = useState({});
  const [value, setValue] = useState("");

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 126 + 1);

    axios
      .get(`https://rickandmortyapi.com/api/location/${randomId}`)
      .then((resp) => {
        setLocation(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    axios
      .get(`https://rickandmortyapi.com/api/location/${value}`)
      .then((resp) => {
        setLocation(resp.data);
      })
      .catch((error) => console.error(error));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rickyPerPage = 9;

  const lastIndex = rickyPerPage * currentPage;
  const firstIndex = lastIndex - rickyPerPage;

  const rickisPaginated = location.residents?.slice(firstIndex, lastIndex);

  return (
    <>
      <form className="block" onSubmit={(e) => submit(e)}>
        <input
          type="text"
          className="textInput"
          placeholder="Ingresa el id del lugar que quieres buscar..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn" type="submit">Buscar</button>
      </form>
      <div className="block">
        <span>
          
        <b>Dimensión:</b>  {location.dimension}
        </span>
        <br />
        <b>Población:</b> {location?.residents?.length}
      </div>
      <div className="gridCenter">
        <div className="grid">
          {rickisPaginated?.map((resident) => (
            <Location key={resident} url={resident} />
          ))}
        </div>
      </div>
      <div className="gridCenter">
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          <box-icon name='left-arrow-alt' ></box-icon>
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          <box-icon name='right-arrow-alt' ></box-icon>
        </button>
      </div>
    </>
  );
}

export default App;
