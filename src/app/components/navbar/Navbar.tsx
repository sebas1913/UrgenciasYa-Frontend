'use client';
import React, { useState } from 'react';
import styles from './navbar.module.scss';
import Button from '../UI/button/Button';
import { CgCloseO } from "react-icons/cg";
import RegisterForm from '../register-form/Register-form';
import LoginForm from '../login-form/Login-form';
// import FormularioLogin from '../FormularioLogin'; 

const Navbar: React.FC = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm); // Alterna la visibilidad del formulario
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false); // Cierra el formulario
  };

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showRegisterForm); // Alterna la visibilidad del formulario
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false); // Cierra el formulario
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <img className={styles.image} src="./images/UrgenciasYa.png" alt="Logo"/>
        </div>
        <div className={styles.links}>
          <Button type="button" onClick={handleToggleLoginForm} className={styles.navButton}>
            Iniciar sesión
          </Button>
          <Button type="button" onClick={handleToggleRegisterForm} className={styles.navButton}>
            Registrarse
          </Button>
        </div>
      </nav>
      {/* Mostrar el formulario cuando showForm sea true */}
      {showRegisterForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseRegisterForm}>
            <CgCloseO/>
          </button>
          <div className={styles.formContainer}>
            <RegisterForm></RegisterForm>
          </div>
        </div>
      )}
      {showLoginForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseLoginForm}>
            <CgCloseO/>
          </button>
          <div className={styles.formContainer}>
            <LoginForm></LoginForm>
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;
