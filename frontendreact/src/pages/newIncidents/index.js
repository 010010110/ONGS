import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import './style.css';

export default function NewIncidents(){
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();
    const ong_id = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ong_id,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao Cadastrar caso!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section >
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro novo caso</h1>
                    <p>Escreva detalhadamente para encontrar um heroi para resolver isso!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar Para Home!
                    </Link>
                
                </section>
                <form onSubmit={ handleNewIncident }>

                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor"/>
                    
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                    
                </form>
            </div>
        </div>
    );

}