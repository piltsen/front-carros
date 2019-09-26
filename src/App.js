import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Paper, TableHead, TableBody, TableRow, TableCell, Table, IconButton } from '@material-ui/core';
import { AdicionaCarro } from './AdicionaCarro';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';
import './App.css';
import { SERVER_URL } from './utils/constants';
import Marcas from './Marcas';

const Titulo = ({qualquercoisa, ...props}) => {
  return (
    <div>
      <div>{qualquercoisa}</div>
    </div>
  );
};

function CarroTitulo(props) {
  return (
    <div className="titulo">
      <Titulo qualquercoisa={'Controle de Carros PWX'} carro={1}  />
    </div>
  );
}

const CarroLista = () => {
  const [lista, setLista] = useState([]);
  const [altera, setAltera] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function getCarros() {
      const carros = await axios(SERVER_URL + 'carros/');
      if (!ignore) setLista(carros.data);
    }
    getCarros();
    return () => {
      ignore = true;
    };
  }, [altera]);

  const deleteCarro = codigo => {
    axios.delete(SERVER_URL + 'carros/' + codigo).then(response => {
      window.alert('Carro ' + codigo + ' apagado');
      setAltera(!altera);
    });
  };

  console.log(lista);

  return (
    <div>
      <div className="titulo">Lista de Carros</div>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((carro, index) => {
              return (
                <TableRow key={carro.codigo + '' + index}>
                  <TableCell>{carro.codigo}</TableCell>
                  <TableCell>{carro.marca}</TableCell>
                  <TableCell>{carro.modelo}</TableCell>
                  <TableCell>{carro.preco}</TableCell>
                  <TableCell>
                    <Link to={'/carros/' + carro.codigo}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteCarro(carro.codigo)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/carros">
          <Button>Lista de Carros</Button>
        </Link>
        <Link to="/novo">
          <Button>Novo Carro</Button>
        </Link>
        <Link to="/marcas">
          <Button>Marcas</Button>
        </Link>

        <Route path="/" exact component={CarroTitulo} />
        <Route path="/carros" exact component={CarroLista} />
        <Route path="/novo" exact component={AdicionaCarro} />
        <Route path="/carros/:id" exact component={AdicionaCarro} />
        <Route path="/marcas" exact component={Marcas} />
      </div>
    </Router>
  );
}

export default App;
