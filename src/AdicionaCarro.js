import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from "./utils/constants";

const AdicionaCarro = ({ match, history }) => {
  const [valores, setValores] = useState({
    codigo: 0,
    marca: '',
    modelo: '',
    preco: 0
  });

  useEffect(() => {
    async function getCarros(id) {
      const carros = await axios(SERVER_URL + 'carros/' + id);
      setValores(carros.data);
    }
    if (match.params.id) {
      getCarros(match.params.id);
    }
  }, [match.params.id]);

  console.log(valores);

  const handleChange = name => event => {
    setValores({ ...valores, [name]: event.target.value });
  };
  const handleNumberChange = name => event => {
    setValores({ ...valores, [name]: parseInt(event.target.value) });
  };
  const handlePriceChange = name => event => {
    setValores({ ...valores, [name]: parseInt(event.target.value ? event.target.value : 0) });
  };

  const atualizarCarro = (carro, id) => {
    axios
      .put(SERVER_URL + 'carros/' + id, carro)
      .then(response => {
        window.alert('Carro ' + carro.codigo + ' foi atualizado');
      })
      .catch(response => {
        window.alert('Deu nhaca!');
      });
  };

  const salvarCarro = carro => {
    axios.post('http://localhost:5000/carros/', carro).then(response => {
      console.log('Carro Adicionado');
    });
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div style={{ padding: 20 }}>Novo Carro</div>
        <form>
          <div className="menu">
            <TextField
              variant="outlined"
              style={{ margin: 10 }}
              id="codigo"
              label="Código"
              value={valores.codigo}
              onChange={handleNumberChange('codigo')}
              disabled={true}
            />
            <TextField
              variant="outlined"
              style={{ margin: 10 }}
              id="marca"
              label="Marca"
              value={valores.marca}
              onChange={handleChange('marca')}
            />
            <TextField
              variant="outlined"
              style={{ margin: 10 }}
              id="modelo"
              label="Modelo"
              value={valores.modelo}
              onChange={handleChange('modelo')}
            />
            <TextField
              variant="outlined"
              style={{ margin: 10 }}
              id="preco"
              label="Preço"
              value={valores.preco}
              onChange={handlePriceChange('preco')}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                endAdornment: <InputAdornment position="end">,00</InputAdornment>
              }}
            />
            {Boolean(match.params.id) ? (
              <Button onClick={() => atualizarCarro(valores, match.params.id)}>Salvar Carro</Button>
            ) : (
              <Button onClick={() => salvarCarro(valores)}>Cadastrar Carro</Button>
            )}
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export { AdicionaCarro };
