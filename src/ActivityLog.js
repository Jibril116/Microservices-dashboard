// src/ActivityLog.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Sample data for activity log
const data = [
  { name: 'Mon', activity: 400 },
  { name: 'Tue', activity: 300 },
  { name: 'Wed', activity: 500 },
  { name: 'Thu', activity: 200 },
  { name: 'Fri', activity: 400 },
  { name: 'Sat', activity: 600 },
  { name: 'Sun', activity: 700 },
];

const ActivityLog = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Activity Log</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activity" stroke="#00796b" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityLog;
