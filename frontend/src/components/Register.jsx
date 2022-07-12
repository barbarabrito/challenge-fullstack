import './Register.css';
import { useState, useEffect } from "react";
import api from '../services/api'; 

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
    const [endereco, setEndereco] = useState('');

    async function handleSearchAddress(e){

        e.preventDefault();

        fetch(`https://nominatim.openstreetmap.org/search/${enderecoCliente}?format=json&addressdetails=1`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
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

    function handleRegisterDelivery(e){
        e.preventDefault();

        const endereco = {
            bairro,
            numero,
            cidade,
            estado,
            pais,
            latitude,
            longitude
        };

        api.post('/deliveries/register', {
            nome,
            peso,
            endereco
        })
        .then(response => {  
            console.log(response.data)
        })
        .catch(error => {
           console.log(error)
        })
    }
        
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
                {/* <h3>panel</h3>/ */}
                
            </div>
        </main>
    )
}
export default Register