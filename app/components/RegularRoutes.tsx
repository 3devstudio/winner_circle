// NOTE: We should probably consider storing location data in the database
// incase routes change or we need to add more locations
import { useEffect, useState } from "react";

const locations = [
  { name: "LEXINGTON, KY", coords: [38.0406, -84.5037] },
  { name: "HOUSTON, TX", coords: [29.7601, -95.3701] },
  { name: "KATY, TX", coords: [29.7858, -95.8245] },
  { name: "DALLAS, TX", coords: [32.7767, -96.797] },
  { name: "HOUSTON, TX", coords: [29.7604, -95.3698] },
  { name: "SAN FRANCISCO, CA", coords: [37.7749, -122.4194] },
  { name: "LOS ANGELES, CA", coords: [34.0522, -118.2437] },
  { name: "ST. LOUIS, MO", coords: [38.627, -90.1994] },
  { name: "KANSAS CITY, MO", coords: [39.0997, -94.5786] },
  { name: "CHICAGO, IL", coords: [41.8781, -87.6298] },
  { name: "LAS VEGAS, NV", coords: [36.1699, -115.1398] },
  { name: "SCOTTSDALE, AZ", coords: [33.4949, -111.9217] },
  { name: "PHOENIX, AZ", coords: [33.4484, -112.074] },
  { name: "DENVER, CO", coords: [39.7392, -104.9903] },
  { name: "PORTLAND, OR", coords: [45.5152, -122.6784] },
  { name: "BOISE, ID", coords: [43.615, -116.2023] },
  { name: "SALT LAKE CITY, UT", coords: [40.7608, -111.891] },
  { name: "BILLINGS, MT", coords: [45.7833, -108.5007] },
  { name: "ROCK SPRINGS, WY", coords: [41.5875, -109.2029] },
];

export default function RegularRoutes() {
  const [Leaflet, setLeaflet] = useState(null);
  const [ReactLeaflet, setReactLeaflet] = useState(null);

  useEffect(() => {
    (async () => {
      const leafletModule = await import("leaflet");
      const reactLeafletModule = await import("react-leaflet");
      setLeaflet(leafletModule);
      setReactLeaflet(reactLeafletModule);

      // Fix for default marker icon not showing
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

  return (
    <div className="flex flex-col gap-4">
      <div className="h-full w-full flex flex-col gap-4 md:gap-6 justify-center p-4">
        <div className="flex flex-col gap-4 md:gap-6 justify-center items-center md:justify-start md:items-start">
          <h1 className="text-center md:text-start text-secondary text-2xl md:text-4xl font-semibold uppercase">
            Our Regular Routes
          </h1>
          <div className="w-1/2 h-1 bg-primary" />
        </div>
        <span className="text-center md:text-start text-stone-700">
          With 16 routine routes, Winner Circle is able to provide a reliable
          and consistent service to all of our customers. We are always looking
          to add new routes to our schedule, so if you don’t see your location
          listed, please reach out to us and we will do our best to accommodate
          your needs.
        </span>
      </div>
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
    </div>
  );
}
