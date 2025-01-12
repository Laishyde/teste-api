import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [catUrl, setCatUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para buscar a imagem do gatinho
  const fetchCatImage = async () => {
    setLoading(true); // Define loading como verdadeiro ao iniciar a requisição
    try {
      // URL do seu backend na Vercel
      const response = await axios.get('https://testando-ewbe.vercel.app/gatinhos'); // Ajuste a URL aqui
      setCatUrl(response.data[0].url); // Acesse a URL da imagem corretamente
      setLoading(false); // Define loading como falso após a resposta
    } catch (err) {
      setError('Não foi possível obter a imagem do gatinho.');
      setLoading(false);
    }
  };

  // Chama fetchCatImage ao montar o componente
  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Aqui está um gatinho para você!</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {catUrl && <img src={catUrl} alt="Gatinho" style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />}
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchCatImage} style={buttonStyle}>
          Ver outro gatinho
        </button>
      </div>
    </div>
  );
};

// Estilos para o botão
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default App;
