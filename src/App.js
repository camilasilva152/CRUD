import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {collection, getDocs, addDoc}from "firebase/firestore";
import { async } from "@firebase/util";


function App() {
    const [newNome, setNewNome] = useState("");
    const [newGenero, setNewGenero] = useState("");
    const [newDiretor, setNewDiretor] = useState("");

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        await addDoc(usersCollectionRef, {nome: newNome, genero: newGenero, autor: newDiretor})
    }


    useEffect (() => {
        const getUsers = async() => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers();
    }, [usersCollectionRef]);
    console.log(users);

    return (
    <div className="App"> 
    <input placeholder="nome..." onChange={(event) => 
        {setNewNome(event.target.value)}}/>

    <input placeholder="genero..." onChange={(event) => 
        {setNewGenero(event.target.value)}}/>

    <input placeholder="Diretor..." onChange={(event) => 
        {setNewDiretor(event.target.value)}}/>
    <button onClick={createUser}>Criar</button>

    {users ? users.map((user)=>{
       return <div>
        {" "}
        <h1>Nome: {user["nome"]}</h1>
        <h1>Gênero: {user["genero"]}</h1>
        <h1>Diretor: {user["diretor"]}</h1>
       </div>
      })
    :
    (<p>Carregando...</p>)
    }
      </div>
    );
}
export default App;