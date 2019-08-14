import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios'

const AdicionaCarro = () => {
  const [valores, setValores] = useState({
    codigo: 0,
    marca: '',
    modelo: '',
    preco: 0
  })

  console.log(valores)

  const handleChange = name => event => {
    setValores({...valores, [name]: event.target.value})
  }
  const handleNumberChange = name => event => {
    setValores({...valores, [name]: parseInt(event.target.value)})
  }

  const salvarCarro = carro => {
    axios
      .post('http://devtests.powers.com.br:8888/carros/', carro)
      .then(response => {
        console.log("Carro Adicionado")
    })
  }
  return (
  <div>
    <div>Novo Carro</div>
    <form>
      <TextField
        id="codigo"
        label="Código"
        value={valores.codigo}
        onChange={handleNumberChange('codigo')}
       />
       <TextField
        id="marca"
        label="Marca"
        value={valores.marca}
        onChange={handleChange('marca')}
       />
       <TextField
        id="modelo"
        label="Modelo"
        value={valores.modelo}
        onChange={handleChange('modelo')}
       />
       <TextField
        id="preco"
        label="Preço"
        value={valores.preco}
        onChange={handleNumberChange('preco')}
       />
       <Button onClick={() => salvarCarro(valores)}>Salvar Carro</Button>
    </form>
  </div>)
}

export { AdicionaCarro }

