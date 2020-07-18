import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './style.css';

export default function Resgister(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

  async  function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de Acesso: ${response.data.id} ANOTE!`);
            history.push('/');

        } catch(err){
            alert('Erro ao cadastrar. Tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section >
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já sou cadastrado!
                    </Link>
                
                </section>
                <form onSubmit={handleRegister}>
                    <input  value={name}  onChange={e => setName(e.target.value)} placeholder="Nome da ONG"/>
                    <input value={email}  onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail"/>
                    <input value={whatsapp}  onChange={e => setWhatsApp(e.target.value)}placeholder="WhatsApp"/>
                    <div className="input-group">                        
                        <input value={city}  onChange={e => setCity(e.target.value)} placeholder="Cidade"/>
                        <input value={uf} onChange={e => setUF(e.target.value)}placeholder="UF" style={{width: 80}} />
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                    
                </form>
            </div>
        </div>
    );
}