
import {useState} from 'react'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';

import logo from '../../assets/logo.png';
import user from '../../assets/user.png';
import lock from '../../assets/lock.png';
import React from 'react';
import './Login.css';


function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const loginCollectionRef = collection(db, 'login');

    const navigate = useNavigate();

    
    const handleLogin = async () => {
      const userQuery = query(loginCollectionRef, where("nome", "==", nome));
      setLoading(true);
      const user = await getDocs(userQuery);
      setLoading(false);
      user.forEach(async (doc) => {
        if(doc.data().senha && doc.data().senha === senha) {
          await localStorage.setItem("user", JSON.stringify({id: doc.id, nome: doc.data().nome}));
          navigate("/");
        } else {
          alert("erro no login!");
          setLoading(false);
        }
      });
    }

    return (
      <div class="wrapper">
        <div className='login-container'>
            <form className='formulario' onSubmit={e => e.preventDefault()}>
              <img className='logo' src={logo}/>
              <h1>Thai Locadora</h1>
              <fieldset >
                <label>
                <img className='icone' src={user}/>
                  Nome  de  Usuário
                </label>
                <input name='nome' type='text' className='input' placeholder='Usuário' value={nome} onChange={e => setNome(e.target.value)}/>
              </fieldset>

              <fieldset>

                <label>
              <img className='icone' src={lock}/>
                  Senha

                </label>
                <input name='senha' type='password' className='input' placeholder='Senha' value={senha} onChange={e => setSenha(e.target.value)}/>
              </fieldset>
               <button className='entrar' onClick={handleLogin} onSubmit={e => e.preventDefault()}>
                {loading ? "Carregando..." : "Entrar"}
               </button>
                <a href='Home'>Criar conta</a>
            </form>
            </div>
        </div>
    );
  };

export default Login;
