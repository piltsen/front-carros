import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios'

const AdicionaCarro = ({match, history}) => {
  const [valores, setValores] = useState({
    codigo: 0,
    marca: '',
    modelo: '',
    preco: 0
  }) 

  console.log(match)
  
  useEffect(() => {
    async function getCarros(id) {
      const carros = await axios('http://localhost:5000/carros/'+id);
      setValores(carros.data)
    }
    getCarros(match.params.id);

  }, [match.params.id]);

  console.log(valores)

  const handleChange = name => event => {
    setValores({...valores, [name]: event.target.value})
  }
  const handleNumberChange = name => event => {
    setValores({...valores, [name]: parseInt(event.target.value)})
  }

  const atualizarCarro = (carro, id) => {
    axios
      .put('http://localhost:5000/carros/' + id, carro)
      .then(response => {
        window.alert('Carro ' + carro.codigo + ' foi atualizado')
      })
      .catch(response => {
        window.alert("Deu nhaca!")
      })
  }

  const salvarCarro = carro => {
    axios
      .post('http://localhost:5000/carros/', carro)
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
        {Boolean(match.params.id) 
          ? <Button onClick={() => atualizarCarro(valores, match.params.id)}>Salvar Carro</Button>
          : <Button onClick={() => salvarCarro(valores)}>Cadastrar Carro</Button>
        }
       
    </form>
  </div>)
}

export { AdicionaCarro }

