export const getChargingStatus = async () => {
    const response = await fetch("http://localhost:5000/api/charging-status");
    const data = await response.json();
    return data;
  };
  
  export const getEnergySources = async () => {
    const response = await fetch("http://localhost:5000/api/energy-sources");
    const data = await response.json();
    return data;
  };  