// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import './App.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const mockMicroservices = [
  { id: 1, name: 'User Service', status: 'stopped' },
  { id: 2, name: 'Order Service', status: 'running' },
  { id: 3, name: 'Payment Service', status: 'stopped' },
  { id: 4, name: 'Inventory Service', status: 'running' },
  { id: 5, name: 'Shipping Service', status: 'stopped' },
  { id: 6, name: 'Notification Service', status: 'running' },
  { id: 7, name: 'Authentication Service', status: 'stopped' },
  { id: 8, name: 'Analytics Service', status: 'running' },
  { id: 9, name: 'Search Service', status: 'stopped' },
  { id: 10, name: 'Email Service', status: 'running' },
  { id: 11, name: 'Recommendation Service', status: 'stopped' },
  { id: 12, name: 'Logging Service', status: 'running' },
];

function App() {
  const [microservices, setMicroservices] = useState(mockMicroservices);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleServiceAction = (id, action) => {
    setMicroservices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, status: action === 'start' ? 'running' : 'stopped' } : service
      )
    );
  };

  // Data for the sample graph
  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'API Requests',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <div className="graph-container">
        <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );

  const renderMicroservices = () => (
    <div className="microservices-content">
      <Typography variant="h4" gutterBottom>
        Microservices Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {microservices.map((service) => (
          <Grid item xs={12} sm={6} md={3} key={service.id}>
            <Card className={`service-card ${service.status}`}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="service-status"
                  style={{ margin: '10px 0', color: service.status === 'running' ? 'green' : 'red' }}
                >
                  Status: {service.status.toUpperCase()}
                </Typography>
                <Button
                  variant="contained"
                  color={service.status === 'running' ? 'secondary' : 'primary'}
                  onClick={() =>
                    handleServiceAction(service.id, service.status === 'running' ? 'stop' : 'start')
                  }
                  style={{ marginRight: '10px' }}
                >
                  {service.status === 'running' ? 'Stop' : 'Start'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Sidebar>
          <Menu>
            <MenuItem icon={<DashboardIcon />} onClick={() => setActiveMenu('dashboard')}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<MiscellaneousServicesIcon />} onClick={() => setActiveMenu('microservices')}>
              Micro Services
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className="main-content">
          {activeMenu === 'dashboard' ? renderDashboard() : renderMicroservices()}
        </main>
      </div>
    </Router>
  );
}

export default App;
