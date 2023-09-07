import React, { useState } from "react";
import { useGPS } from "./GPS";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const container = {
  width: "75%",
  height: "500px"
};

const locations = [
  {
    name: "お店01",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21697737990871,
      lng: 127.67862138356263
    }
  },
  {
    name: "お店02",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21997737990871,
      lng: 127.68862138356263
    }
  },
  {
    name: "お店03",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21597737990871,
      lng: 127.68862138356263
    }
  },
  {
    name: "お店04",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21997737990871,
      lng: 127.67562138356263
    }
  }
];

function App() {
  const location = useGPS();
  const position = {
    lat: location ? location.latitude : null,
    lng: location ? location.longitude : null
  };
  const [selected, setSelected] = useState({});
  const onSelect = (item) => {
    setSelected(item);
  };

  const [isCollapsed, setIsCollapsed] = useState([true, true]);

  const toggleCollapse = (index) => {
    const updatedCollapse = [...isCollapsed];
    updatedCollapse[index] = !updatedCollapse[index];
    setIsCollapsed(updatedCollapse);
  };

  return (
    <>
      <h2>React & Google Map</h2>
      <div className="wrap">
        <LoadScript googleMapsApiKey="AIzaSyBkVf8mvOwMcwGDWF-Ry0HoKAJ5MF6Dsws">
          <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
            {locations.map((item) => {
              return (
                // マーカーの設定
                <MarkerF
                  key={item.name}
                  position={item.location}
                  onClick={() => onSelect(item)}
                  label={item.name}
                />
              );
            })}
            {selected.location && (
              <InfoWindowF
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <div>
                  <p className="text">{selected.info}</p>

                  <button onClick={() => toggleCollapse(0)}>
                    <p>お肉</p>
                    {isCollapsed[0] ? <BsChevronDown /> : <BsChevronUp />}
                  </button>
                  {isCollapsed[0] ? null : (
                    <div>
                      <p>{selected.meat}</p>
                    </div>
                  )}
                  <button onClick={() => toggleCollapse(1)}>
                    <p>お野菜</p>
                    {isCollapsed[1] ? <BsChevronDown /> : <BsChevronUp />}
                  </button>
                  {isCollapsed[1] ? null : (
                    <div>
                      <p>{selected.vegetable}</p>
                    </div>
                  )}
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
        {position.lat !== null && position.lng !== null ? (
          <></>
        ) : (
          <p>GPS情報を取得中...</p>
        )}
      </div>
    </>
  );
}

export default App;
