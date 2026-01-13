import { useState } from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      gap: '2rem',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <header>
        <h1 style={{ 
          fontSize: '3.5rem', 
          background: 'linear-gradient(to right, var(--primary-color), var(--text-accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem' 
        }}>
          E-Commerce API Client
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px' }}>
          A premium frontend interface powered by React and Vite. 
          Ready for your Google Stitch implementation.
        </p>
      </header>
      
      <main style={{
        background: 'var(--bg-secondary)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Project Status</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
           <StatusItem label="Frontend Setup" status="Completed" />
           <StatusItem label="Design Structure" status="Ready" />
           <StatusItem label="API Integration" status="Pending" />
           <StatusItem label="Custom Implementation" status="Waiting for input" />
        </div>
      </main>

      <footer style={{ marginTop: 'auto', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        &copy; 2026 E-Commerce Project
      </footer>
    </div>
  );
}

function StatusItem({ label, status }) {
  const isCompleted = status === 'Completed' || status === 'Ready';
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      width: '100%', 
      padding: '0.8rem',
      background: 'var(--bg-primary)',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-color)'
    }}>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span style={{ 
        color: isCompleted ? 'var(--success)' : 'var(--warning)',
        fontWeight: 600
      }}>
        {status}
      </span>
    </div>
  );
}

export default App;
