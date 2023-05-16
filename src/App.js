import './App.css';
import Cookies from './componentes/cookies';
import { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import ConfigMeme from './componentes/configMeme';

function App() {
  const [cookiesSet, setCookiesSet] = useState(false);

  useEffect(() => {
    if (!cookiesSet) {
      // Aquí se puede establecer la lógica para configurar las cookies
      setCookiesSet(true);
    }
  }, [cookiesSet]);

  return (
    <div className="App">
      <Cookies />

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Generador de Memes
          </Navbar.Brand>
        </Container>
      </Navbar>

      <main>

        <ConfigMeme />
        
      </main>
      
      </div>
  );
}

export default App;
