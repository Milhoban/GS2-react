// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [chargingStatus, setChargingStatus] = useState([]);
  const [energySources, setEnergySources] = useState([]);
  const [newChargingStatus, setNewChargingStatus] = useState({
    vehicle_id: '',
    status: '',
    progress: 0,
  });
  const [newEnergySource, setNewEnergySource] = useState({
    source_name: '',
    renewable: false,
  });
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  

  // Estilos em JS
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f6f9',
      borderRadius: '10px',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
      marginBottom: '10px',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
    submitButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    errorMessage: {
      color: '#d9534f',
      backgroundColor: '#f2dede',
      padding: '10px',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      padding: '8px',
      borderBottom: '1px solid #ddd',
    },
  };

  useEffect(() => {
    if (!user?.token) return; 

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const statusResponse = await axios.get('http://localhost:5000/api/auth/charging_status', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChargingStatus(statusResponse.data);

        const energyResponse = await axios.get('http://localhost:5000/api/auth/energy_sources', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEnergySources(energyResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
        setError('Erro ao carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddChargingStatus = async () => {
    if (!newChargingStatus.vehicle_id || !newChargingStatus.status || newChargingStatus.progress < 0) {
      setError('Todos os campos devem ser preenchidos corretamente.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/charging_status',
        newChargingStatus,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setChargingStatus(prevStatus => [...prevStatus, response.data]);
      setNewChargingStatus({ vehicle_id: '', status: '', progress: 0 });
    } catch (error) {
      console.error('Erro ao adicionar status de recarga', error);
      setError('Erro ao adicionar status de recarga. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEnergySource = async () => {
    if (!newEnergySource.source_name) {
      setError('O nome da fonte de energia é obrigatório.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/energy_sources',
        newEnergySource,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setEnergySources(prevSources => [...prevSources, response.data]);
      setNewEnergySource({ source_name: '', renewable: false });
    } catch (error) {
      console.error('Erro ao adicionar fonte de energia', error);
      setError('Erro ao adicionar fonte de energia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      {/* Mensagem de erro */}
      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.section}>
        {/* Adicionar Status de Recarga */}
        <h3>Adicionar Status de Recarga</h3>
        <div>
          <input
            style={styles.inputField}
            type="text"
            placeholder="ID do Veículo"
            value={newChargingStatus.vehicle_id}
            onChange={(e) => setNewChargingStatus({ ...newChargingStatus, vehicle_id: e.target.value })}
          />
          <input
            style={styles.inputField}
            type="text"
            placeholder="Status"
            value={newChargingStatus.status}
            onChange={(e) => setNewChargingStatus({ ...newChargingStatus, status: e.target.value })}
          />
          <input
            style={styles.inputField}
            type="number"
            placeholder="Progresso"
            value={newChargingStatus.progress}
            onChange={(e) => setNewChargingStatus({ ...newChargingStatus, progress: parseFloat(e.target.value) })}
          />
        </div>
        <button
          style={{ ...styles.submitButton, ...(loading && styles.submitButtonDisabled) }}
          onClick={handleAddChargingStatus}
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Status'}
        </button>
      </div>

      <div style={styles.section}>
        {/* Adicionar Fonte de Energia */}
        <h3>Adicionar Fonte de Energia</h3>
        <div>
          <input
            style={styles.inputField}
            type="text"
            placeholder="Nome da Fonte"
            value={newEnergySource.source_name}
            onChange={(e) => setNewEnergySource({ ...newEnergySource, source_name: e.target.value })}
          />
          <label style={styles.checkboxLabel}>
            Renovável
            <input
              type="checkbox"
              checked={newEnergySource.renewable}
              onChange={(e) => setNewEnergySource({ ...newEnergySource, renewable: e.target.checked })}
            />
          </label>
        </div>
        <button
          style={{ ...styles.submitButton, ...(loading && styles.submitButtonDisabled) }}
          onClick={handleAddEnergySource}
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Fonte'}
        </button>
      </div>

      <h3>Status de Recarga</h3>
      {chargingStatus.length === 0 ? (
        <p>Não há status de recarga para exibir.</p>
      ) : (
        <ul style={styles.list}>
          {chargingStatus.map((status) => (
            <li key={status.id} style={styles.listItem}>
              {status.vehicle_id} - {status.status} - {status.progress}%  
            </li>
          ))}
        </ul>
      )}

      <h3>Fontes de Energia</h3>
      {energySources.length === 0 ? (
        <p>Não há fontes de energia para exibir.</p>
      ) : (
        <ul style={styles.list}>
          {energySources.map((source) => (
            <li key={source.id} style={styles.listItem}>
              {source.source_name} - {source.renewable ? 'Renovável' : 'Não renovável'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
