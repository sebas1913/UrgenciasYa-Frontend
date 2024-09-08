
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss"
import { MdAccountCircle } from "react-icons/md";

const Navbar : React.FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div>
                    <img className={styles.image} src="./images/UrgenciasYa.png"/>
                </div>
                <div className={styles.links}>
                    <a className={styles.a} href="/">Inicio</a>
                    <a  className={styles.a}href="/search-results">Resultados de Búsqueda</a>
                </div>
                <div>
                    <button className={styles.button}><MdAccountCircle className={styles.icon}/></button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;