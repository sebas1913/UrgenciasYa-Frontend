import React, { ReactNode } from 'react';
import styles from './modal.module.scss';
import { CgCloseO } from 'react-icons/cg';
import Button from '../UI/button/Button';

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
	if (!isVisible) return null;

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalContent}>
				<div className={styles.containerButton}>
					<Button className={styles.closeButton} onClick={onClose}>
						<CgCloseO></CgCloseO>
					</Button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
