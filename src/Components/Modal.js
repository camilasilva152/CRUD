import React, { useState } from 'react';
import './Modal.css';


function Modal({open, onCancel, onConfirm}){

    return open ? (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <button className='excluir' onClick={onCancel}>X</button>
            <div className='title'>
            <h1>excluir</h1>
            </div>
            <div className='body'>
            <p>Tem certeza de que deseja excluir o item selecionado?</p>
            </div>
            <div className='footer'>
                <button className='btnExcluir' onClick={onConfirm}>excluir</button>
                <button className='btnCancelar' onClick={onCancel}>cancelar</button>
            </div>
        </div>
    </div>
    ) : null;
}
export default Modal;