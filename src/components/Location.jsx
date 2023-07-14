import axios from "axios";
import { useState, useEffect } from "react";

const Location = ({ url }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(url)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <img width={290} src={data.image} alt="" />
      <div>
        <p className="status">Estado -- {data.status}</p>
        <p><b>Locacion:</b> {data.location?.name}</p>
        <p><b>Tipo:</b> {data.type}</p>
        <p><b>Space:</b> {data.species}</p>
        <p><b>Episodios:</b> {data.episode?.length}</p>
      </div>
    </div>
  );
};
export default Location;
