import React, {useState, useEffect} from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';


export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ong_id = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                authorization: ong_id,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ong_id]);

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ong_id,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert ('Erro ao Deletar')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be The Hero' />
                <span>Bem Vindo, {ongName}</span>

                <Link className="button" to='/incidents/new'>
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => {
                    return (
                        <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                
                        <strong>DESCRICAO:</strong>
                        <p>{incident.description}</p>
                
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency :'BRL'}).format(incident.value)}</p>
                
                        <button type="button" onClick = {() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                    )
                })}
            </ul>
        </div>
    );
}