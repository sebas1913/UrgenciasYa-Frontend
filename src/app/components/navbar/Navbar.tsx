'use client';
import React, { useState } from 'react';
import styles from './navbar.module.scss';
import Button from '../UI/button/Button';
import { AiOutlineClose } from 'react-icons/ai';
// import FormularioLogin from '../FormularioLogin'; 

const Navbar: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm); // Alterna la visibilidad del formulario
  };

  const handleCloseForm = () => {
    setShowForm(false); // Cierra el formulario
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <img className={styles.image} src="./images/UrgenciasYa.png" alt="Logo" />
        </div>
        <div className={styles.links}>
          <Button type="button" onClick={handleToggleForm} className={styles.navButton}>
            Iniciar sesión
          </Button>
          <Button type="button" onClick={handleToggleForm} className={styles.navButton}>
            Registrarse
          </Button>
        </div>
      </nav>

      {/* Mostrar el formulario cuando showForm sea true */}
      {showForm && (
        <div className={styles.formContainer}>
          <button className={styles.closeButton} onClick={handleCloseForm}>
            <AiOutlineClose size={24} /> 
          </button>
          <h1>Hola</h1>
        </div>
      )}
    </header>
  );
};

export default Navbar;
