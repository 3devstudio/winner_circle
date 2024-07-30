// NOTE: We should probably consider storing location data in the database
// incase routes change or we need to add more locations
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import Button from "./Button";
import { MapIcon, ListBulletIcon } from "@heroicons/react/24/outline";

const locations = [
  { name: "Lexington, Kentucky", coords: [38.0406, -84.5037] },
  { name: "Houston, Texas", coords: [29.7601, -95.3701] },
  { name: "Katy, Texas", coords: [29.7858, -95.8245] },
  { name: "Dallas, Texas", coords: [32.7767, -96.797] },
  { name: "San Fransisco, California", coords: [37.7749, -122.4194] },
  { name: "Los Angeles, California", coords: [34.0522, -118.2437] },
  { name: "St. Louis, Missouri", coords: [38.627, -90.1994] },
  { name: "Kansas City, Missouri", coords: [39.0997, -94.5786] },
  { name: "Chicago, Illinois", coords: [41.8781, -87.6298] },
  { name: "Las Vegas, Nevada", coords: [36.1699, -115.1398] },
  { name: "Scottsdale, Arizona", coords: [33.4949, -111.9217] },
  { name: "Phoenix, Arizona", coords: [33.4484, -112.074] },
  { name: "Denver, Colorado", coords: [39.7392, -104.9903] },
  { name: "Portland, Oregon", coords: [45.5152, -122.6784] },
  { name: "Boise, Idaho", coords: [43.615, -116.2023] },
  { name: "Salt Lake City, Utah", coords: [40.7608, -111.891] },
  { name: "Billings, Montana", coords: [45.7833, -108.5007] },
  { name: "Rock Springs, Wyoming", coords: [41.5875, -109.2029] },
];

export default function RegularRoutes() {
  const [view, setView] = useState("map");
  const [Leaflet, setLeaflet] = useState(null);
  const [ReactLeaflet, setReactLeaflet] = useState(null);

  useEffect(() => {
    (async () => {
      const leafletModule = await import("leaflet");
      const reactLeafletModule = await import("react-leaflet");
      setLeaflet(leafletModule);
      setReactLeaflet(reactLeafletModule);

      delete leafletModule.Icon.Default.prototype._getIconUrl;
      leafletModule.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  if (!ReactLeaflet || !Leaflet) {
    return <div>Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = ReactLeaflet;

  const customIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <path fill="#FC9D38" d="M12 0C7.58 0 4 3.58 4 8c0 6.63 8 16 8 16s8-9.37 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const renderMapView = () => (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: "50vh", width: "100%" }}
      className="z-20"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, idx) => (
        <Marker key={idx} position={location.coords} icon={customIcon}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  const renderListView = () => {
    const locationsByState = locations.reduce((acc, location) => {
      const state = location.name.split(", ")[1];
      if (!acc[state]) acc[state] = [];
      acc[state].push(location.name);
      return acc;
    }, {});

    return (
      <div className="flex flex-col w-full max-w-6xl max-h-[35rem] overflow-auto mx-auto bg-white rounded-md px-4 pb-4 pt-20 divide-y divide-stone-300">
        {Object.keys(locationsByState).map((state) => (
          <div key={state} className="flex flex-col gap-2 py-4">
            <h2 className="font-semibold text-xl text-primary">{state}</h2>
            <ul className="list-disc ml-6">
              {locationsByState[state].map((location, idx) => (
                <li key={idx} className="text-stone-500">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4">
        <SectionTitle
          title="Our Regular Routes"
          description="With 16 routine routes, Winner Circle is able to provide a reliable and consistent service to all of our customers. We are always looking to add new routes to our schedule, so if you don’t see your location listed, please reach out to us and we will do our best to accommodate your needs."
        />
      </div>
      <div className="relative">
        <div
          className={`absolute inset-x-0 flex gap-4 z-30 ${
            view === "list" ? "bg-stone-300/50 rounded-t-md p-4 w-full md:max-w-6xl mx-auto justify-center" : "pl-16 w-fit pt-4"
          }`}
        >
          <div className={view === "list" ? "w-full max-w-sm" : ""}>
            <Button
              secondary
              icon={MapIcon}
              active={view === "map"}
              onClick={() => setView("map")}
              className={`w-full ${view === "list" ? "bg-stone-300/50" : ""}`}
            >
              Map View
            </Button>
          </div>
          <div className={view === "list" ? " w-full max-w-sm" : ""}>
            <Button
              secondary
              icon={ListBulletIcon}
              active={view === "list"}
              onClick={() => setView("list")}
              className={`w-full ${view === "list" ? "bg-stone-300/50" : ""}`}
            >
              List View
            </Button>
          </div>
        </div>

        {view === "map" ? renderMapView() : renderListView()}
      </div>
    </div>
  );
}
