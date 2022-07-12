import './Register.css';
import { useState, useEffect } from "react";

function Register() {

    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    async function handleSearchAddress(e){

        e.preventDefault();

        fetch(`https://nominatim.openstreetmap.org/search/${enderecoCliente}?format=json&addressdetails=1`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            setLatitude(data[0].lat)
            setLongitude(data[0].lon)
        })

        .catch((err) => {
            setError(err);
        })
    }  

    return (
        <main className="main_container">
            <div className="register">
                <div className="form_container">
                    <form>
                        <input type="text" id="nome_cliente" name="nomeCliente" placeholder="Nome Cliente" />
                        <input type="text" id="peso_entrega" name="pesoEntrega" placeholder="Peso da Entrega" />
                        <input
                            type="text" id="enedereco_cliente"
                            name="enderecoCliente"
                            value={enderecoCliente}
                            placeholder="Endereço da Entrega"
                            onChange={(e) => setEnderecoCliente(e.target.value)}
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

                        <button id="btn_register">Registrar cliente</button>
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