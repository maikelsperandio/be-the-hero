import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profiles', {
            headers: {
                Authorization: ongId
            }
        }).then(resp => {
            console.log(resp.data);
            setIncidents(resp.data);
        })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter(inc => inc.id !== id));
        } catch (error) {
            alert('Erro ao excluir o incidente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the HERO"/>
                <span>Bem vinda {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(inc => (
                    <li key={inc.id}>
                        <strong>CASO:</strong>
                        <p>{inc.title}</p>

                        <strong>Descrição:</strong>
                        <p>{inc.description}</p>

                        <strong>Valor:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(inc.value)}
                        </p>

                        <button onClick={() => handleDelete(inc.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}