// src/components/Navbar.tsx
'use client'
import React, { useState } from 'react';
import styles from './navbar.module.scss';
import Button from '../UI/button/Button';
import { CgCloseO } from "react-icons/cg";
import RegisterForm from '../register-form/Register-form';
import LoginForm from '../login-form/Login-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Importa el contexto

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();

  const handleToggleRegisterForm = () => setShowRegisterForm(!showRegisterForm);
  const handleCloseRegisterForm = () => setShowRegisterForm(false);
  const handleToggleLoginForm = () => setShowLoginForm(!showLoginForm);
  const handleCloseLoginForm = () => setShowLoginForm(false);

  const home = () => router.push('/');
  const profile = () => router.push('/profile-user');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <Button className={styles.buttonImage} onClick={home}>
            <img className={styles.image} src="./images/white_logo.png" alt="Logo" />
          </Button>
        </div>
        <div className={styles.links}>
          {!isAuthenticated ? (
            <>
              <Button type="button" onClick={handleToggleLoginForm} className={styles.navButton}>
                Iniciar sesión
              </Button>
              <Button type="button" onClick={handleToggleRegisterForm} className={styles.navButton}>
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={profile} className={styles.navButton}>
                  Mi perfil
              </Button>
              <Button type="button" onClick={logout} className={styles.navButton}>
                Cerrar sesión
              </Button>
            </>
          )}
        </div>
      </nav>
      {showRegisterForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseRegisterForm}>
            <CgCloseO />
          </button>
          <div className={styles.formContainer}>
            <RegisterForm onSuccess={handleCloseRegisterForm} />
          </div>
        </div>
      )}
      {showLoginForm && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={handleCloseLoginForm}>
            <CgCloseO />
          </button>
          <div className={styles.formContainer}>
            <LoginForm onSuccess={handleCloseLoginForm} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

