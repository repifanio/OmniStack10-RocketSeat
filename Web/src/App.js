import React, { useEffect, useState } from 'react';
import api from './services/api';
import DevItem from './components/devItem';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';
import DevForm from './components/devForm';


//Componente: Bloco isoladao de css, html, js na qual não interfere no resto da aplicação;
//Propriedade: Informações que um componente pai passa para o componente filho;
//Estado: Informações mantidas e monitoradas pelo componente (lembras: Imutabilidade);

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;
