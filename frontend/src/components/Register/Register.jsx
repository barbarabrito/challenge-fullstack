import './Register.css';
import { useState, useEffect } from "react";
import api from '../../services/api';
import MapPanel from '../Map/MapPanel';


function Register() {

    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState(0);
    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [deliveries, setDeliveries] = useState([]);

    async function handleSearchAddress(e) {

        e.preventDefault();

        fetch(`https://nominatim.openstreetmap.org/search/${enderecoCliente}?format=json&addressdetails=1`)
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                setLogradouro(data[0].address.road)
                setLatitude(data[0].lat)
                setLongitude(data[0].lon)
                setBairro(data[0].address.city_district)
                setCidade(data[0].address.city)
                setEstado(data[0].address.state)
                setPais(data[0].address.country)
            })
            .catch((err) => {
                setError(err);
            })
    }

    function handleRegisterDelivery(e) {

        e.preventDefault();

        const geolocalizacao = {latitude, longitude};

        const endereco = {
            logradouro,
            bairro,
            numero,
            cidade,
            estado,
            pais,
            geolocalizacao
        };

        api.post('/deliveries/register', {
            nome,
            peso,
            endereco
        })
        .then(response => {
            console.log(response.data.deliveries)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        api.get('/deliveries')
        .then((response)=> {
            setDeliveries(response.data.deliveries) 
            console.log(response.data)
        })
    },[])

    return (
        <main className="main_container">
            <div className="register">
                <div className="form_container">
                    <form>
                        <input type="text"
                            id="nome_cliente"
                            name="nomeCliente"
                            placeholder="Nome Cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type="text"
                            id="peso_entrega"
                            name="pesoEntrega"
                            placeholder="Peso da Entrega"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />
                        <input
                            type="text" id="enedereco_cliente"
                            name="enderecoCliente"
                            value={enderecoCliente}
                            placeholder="Endereço da Entrega"
                            onChange={(e) => setEnderecoCliente(e.target.value)}
                        />
                        <input
                            type="text" id="numero"
                            name="numero"
                            value={numero}
                            placeholder="Numero"
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <button id="btn-search" onClick={(e) => handleSearchAddress(e)}>&#x1F50D;</button>

                        <span className="geolocal">
                            <input type="text"
                                id="latitude"
                                name="latitude"
                                placeholder="Latitude"
                                value={latitude}
                                disabled />
                            &nbsp;
                            <input type="text"
                                id="longitude"
                                name="longitude"
                                placeholder="Longitude"
                                value={longitude}
                                disabled />
                        </span>

                        <button id="btn_register" onClick={(e) => handleRegisterDelivery(e)}>Registrar cliente</button>
                    </form>
                    <div className="reset-container">
                        <button id="btn-reset">Resetar cadastro</button>
                    </div>
                </div>
            </div>

            <hr />

            <div className="panel">
                <div className="container_p">
                    <MapPanel deliveries ={deliveries}/>
                </div>
                <div className="container_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Rua</th>
                                <th>Cidade</th>
                                <th>País</th>
                                <th>Peso</th>
                                <th>Lat</th>
                                <th>Lng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map(delivery => (
                                <tr key={delivery._id}>
                                    <td>{delivery.nome}</td>
                                    <td>{delivery.endereco.logradouro}</td>
                                    <td>{delivery.endereco.cidade}</td>
                                    <td>{delivery.endereco.pais}</td>
                                    <td>{delivery.peso}</td>
                                    <td>{delivery.endereco.geolocalizacao.latitude}</td>
                                    <td>{delivery.endereco.geolocalizacao.longitude}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
export default Register