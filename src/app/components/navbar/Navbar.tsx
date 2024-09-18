'use client';
import React, { useState } from 'react';
import styles from './navbar.module.scss';
import Button from '../UI/button/Button';
import { CgCloseO } from "react-icons/cg";
import RegisterForm from '../register-form/Register-form';
import LoginForm from '../login-form/Login-form';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();

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

  const home = () => {
    router.push('/');
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <Button className={styles.buttonImage} onClick={home}>
            <img className={styles.image} src="./images/white_logo.png" alt="Logo" />

          </Button>
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
      {/* Cuando sea true se muestra el form */}
      {showRegisterForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseRegisterForm}>
            <CgCloseO />
          </button>
          <div className={styles.formContainer}>
            <RegisterForm onSuccess={handleCloseRegisterForm}></RegisterForm>
          </div>
        </div>
      )}
      {showLoginForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseLoginForm}>
            <CgCloseO />
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
