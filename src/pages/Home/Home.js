
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

import Modal from '../../Components/Modal';
import { db } from '../../firebase-config';

import trash from '../../assets/trash.png';
import edit from '../../assets/edit.png';

import './Home.css';

function Home() {
  const [user, setUser] = useState();
  const [filmes, setFilmes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFilme, setSelectedFilme] = useState(null);

  const navigate = useNavigate();

  const filmesCollectionRef = collection(db, 'filmes');

  const checkLogin = async () => {
    const user = await localStorage.getItem("user");
    if(!user) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }

   const getFilmes = async () => {
     const data = await getDocs(filmesCollectionRef);
     setFilmes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   };

   const handleDelete = (filme) => {
    setOpen(true);
    setSelectedFilme(filme);
   }

   const deleteFilme = async () => {
    try {
      await deleteDoc(doc(db, "filmes", selectedFilme.id));
      alert("item deletado com sucesso!");
      getFilmes();
    } catch (e) {
      console.log(e);
      alert("erro ao deletar item");
    }
    setSelectedFilme(null);
    setOpen(false);
   };

  useEffect(() => {
    getFilmes();
  }, [getFilmes]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
    <div className="wrapper-home">
    <div className="container-home">
      <div className='header'>
      <h1>Locadora de Filmes</h1>
      <Link className='adicionar' to="/filme">Adicionar</Link>
      </div>

      <div className='item'>
        <span>Nome</span>
        <span>Diretor</span>
        <span>Gênero</span>
        <div>Quantidade</div>
      </div>
      
      {filmes ? (
        filmes.map((filme) => {
          return (
              <div className="list" key={filme.nome}>
                {' '}
                <span>{filme.nome}</span>
                <span>{filme.diretor}</span>
                <span> {filme.genero}</span>
                <span>{filme.quantidade}</span>

                <div className='icon'>
                <img className='edit' src={edit} onClick={() => navigate('/filme', {state: {filme: filme}})}/>
                <img className='trash' src={trash} onClick={() => handleDelete(filme)}/>
                </div>
              </div>
            
          );
        })
        
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    </div>
    <Modal open={open} onCancel={() => setOpen(false)} onConfirm={deleteFilme}/>
    </>
  );
}
export default Home;
