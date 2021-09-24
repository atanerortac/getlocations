import styled from "styled-components";
import { Map, TileLayer } from "react-leaflet";
import React, { useEffect, useRef } from "react";
import L from "leaflet";

const zoom = 15;
let db = [];
let _map;

const Feed = () => {
  const mRef = useRef();

  useEffect(() => {
    const { current = {} } = mRef;
    const { leafletElement: map } = current;
    _map = map;
    map.locate({
      setView: true,
    });
    setTimeout(() => {}, 1000);
    map.on("locationfound", handleLocation);
  }, [mRef]);

  const handleLocation = (event) => {
    const { lat, lng } = event.latlng;

    const date = new Date(event.timestamp).toUTCString();
    // console.log(new Date(event.timestamp).toISOString());
    getLocalStorage();

    L.marker([lat, lng]).bindPopup(date).openPopup().addTo(_map);
    _map.setZoom(zoom);
    if (db.length === 0) db.push({ lat, lng, date });

    setLocalStorage();
  };

  const addHandler = () => {
    const { lat, lng } = _map.getCenter();
    const date = new Date().toUTCString();
    L.marker([lat, lng]).bindPopup(date).openPopup().addTo(_map);
    db.push({ lat, lng, date });
    setLocalStorage();
  };
  const clearHandler = () => {
    localStorage.removeItem("locations");
    db = [];
    window.location.reload(false);
  };

  const downloadHandler = () => {
    const fileData = JSON.stringify(db, null, 2);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  };

  const setLocalStorage = () => {
    localStorage.setItem("locations", JSON.stringify(db));
  };

  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("locations"));
    if (!data) return;
    db = data;

    data.forEach((location) => {
      renderLocations(location);
    });
  };
  const renderLocations = (location) => {
    L.marker([location.lat, location.lng])
      .addTo(_map)
      .bindPopup()
      .setPopupContent(`${location.date}`)
      .openPopup();
  };

  return (
    <Container>
      <MapCon itemID="leafletmap" id="leafletmap">
        <Map ref={mRef} center={(0, 0)} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </MapCon>
      <ControlContainer>
        <Button onClick={addHandler}>Add Location</Button>
        <Button onClick={clearHandler}>Clear</Button>
        <Button onClick={downloadHandler}>Download Locations</Button>
      </ControlContainer>
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  display: flex;
  padding: 1.25rem;
  margin-top: 5rem;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  max-height: 80vh;
  background: rgb(230, 232, 242);
  background: linear-gradient(
    131deg,
    rgba(230, 232, 242, 1) 0%,
    rgba(118, 156, 186, 1) 51%,
    rgba(175, 212, 217, 1) 100%
  );
`;

const MapCon = styled.div`
  flex-grow: 0;
  height: 100%;
  width: 80%;
  display: inline-block;
  border-radius: 30px;
`;

const ControlContainer = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 14px 48px;
  color: #fff;
  background: #0c1446;
  width: 200px;
  margin-top: 30px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  flex-grow: 1;
  border-radius: 50px;
  white-space: nowrap;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #175873;
  }
`;
