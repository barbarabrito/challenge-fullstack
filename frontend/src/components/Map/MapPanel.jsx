import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import './MapPanel.css';

const MapPanel = ({deliveries}) => {

    const position = [-15.749997, -47.9499962]
    // const position = pstn

    return (
        <MapContainer center={position} zoom={4} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {deliveries.map(delivery => (
                <Marker key={delivery._id} position={[delivery.endereco.geolocalizacao.latitude, delivery.endereco.geolocalizacao.longitude]}>
                    <Popup>
                        {delivery.nome}
                        <br/>
                        {delivery.peso} kg
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
};


export default MapPanel;