import React, { useEffect, useState } from 'react';
import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core';
import Axios from 'axios';
import { SERVER_URL } from './utils/constants';
import { Edit, Save } from '@material-ui/icons';

const Marcas = () => {
  const [lista, setLista] = useState([]);
  const [editingMarca, setEditingMarca] = useState({});
  const [atualiza, setAtualiza] = useState(true)
  console.log(lista);

  const atualizarMarca = marca => {
    Axios
      .put(SERVER_URL + 'marca/' + marca.id, {nome: marca.nome})
      .then(response => {
        setEditingMarca({})
        setAtualiza(!atualiza)
        console.log("Deu tudo certo", response.data)
      })
      .catch(error => {console.log("Erroooooouuu!", error)})
  }

  useEffect(() => {
    let ignore = false;
    async function getMarcas() {
      const marcas = await Axios(SERVER_URL + 'marcas/');
      if (!ignore) setLista(marcas.data.sort((a,b) => a.id.toString().localeCompare(b.id.toString())));
    }
    getMarcas();
    return () => {
      ignore = true;
    };
  }, [atualiza]);

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div>Lista de Marcas</div>
        <Paper style={{ padding: 20, margin: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map(marca => {
                return (
                  <TableRow key={marca.id}>
                    <TableCell>{marca.id}</TableCell>
                    <TableCell>
                      {marca.id === editingMarca.id ? (
                        <TextField id="editingMarca" value={editingMarca.nome} onChange={e => setEditingMarca({ ...editingMarca, nome: e.target.value })} />
                      ) : (
                        marca.nome
                      )}
                    </TableCell>
                    <TableCell>
                      {marca.id === editingMarca.id ? (
                        <IconButton onClick={() => atualizarMarca(editingMarca)}>
                          <Save />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => setEditingMarca(marca)}>
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Marcas;
