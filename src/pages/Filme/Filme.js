import React, { useState } from 'react';
import { collection,  addDoc, setDoc, doc } from 'firebase/firestore';
import {useLocation, useNavigate} from 'react-router-dom';
import { db } from '../../firebase-config';

import './Filme.css';

const Filme = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [nome, setNome] = useState(state?.filme ? state.filme.nome : '');
  const [genero, setGenero] = useState(state?.filme ? state.filme.genero : '');
  const [diretor, setDiretor] = useState(state?.filme ? state.filme.diretor : '');
  const [quantidade, setQuantidade] = useState(state?.filme ? state.filme.quantidade : 0);

  const filmesCollectionRef = collection(db, 'filmes');

  const createFilme = async () => {
    if (nome && genero && diretor && quantidade > 0) {
      try {
        await addDoc(filmesCollectionRef, {
          nome: nome,
          genero: genero,
          diretor: diretor,
          quantidade: quantidade
        });
        alert('filme adicionado');
      } catch {
        alert('Erro ao adicionar filme');
      }
      navigate("/");
    }
  };

  const editFilme = async () => {
    if(nome !== state.filme.nome || genero !== state.filme.genero || diretor !== state.filme.autor || quantidade !== state.filme.quantidade) {
      const docRef = doc(db, "filmes", state.filme.id);
      try {
        await setDoc(docRef, {
          nome: nome,
          genero: genero,
          diretor: diretor,
          quantidade: quantidade
        });
        alert("Editado com sucesso!");
        
      } catch (e) {
        alert('erro ao editar!');
      }
      navigate("/");
    }
  }
  return (
    <div className="formFilme">
      <h1>{state?.filme ? "Editar" : "Adicionar"} filme</h1>
      <div className='FormLista'>
      <span className='fieldset'>
        Nome: <input  className='inputo' value={nome} onChange={(e) => setNome(e.target.value)} />
      </span>
      <span className='fieldset'>
        Genero:{' '}
        <input className='inputo' value={genero} onChange={(e) => setGenero(e.target.value)} />
      </span>
      <span className='fieldset'>
        Diretor:{' '}
        <input className='inputo' value={diretor} onChange={(e) => setDiretor(e.target.value)} />
      </span>
      <span className='fieldset'>
        Quantidade:{' '}
        <input className='inputo'
          value={quantidade}
          type="number"
          onChange={(e) => setQuantidade(e.target.value)}
        />
      </span>
      <button className='btnFilme' onClick={state?.filme ? editFilme : createFilme}>{state?.filme ? "Editar" : "Adicionar"}</button>
      <button className='btnFilme' onClick={() => navigate("/")}>Voltar</button>
      </div>
    </div>
  );
};

export default Filme;
