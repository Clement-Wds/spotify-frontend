import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <button className={styles.button} aria-label="Reculer" disabled>
          {/* Ici, vous pouvez ajouter l'icône de la flèche vers la gauche */}
        </button>
        <button className={styles.button} aria-label="Avancer" disabled>
          {/* Ici, vous pouvez ajouter l'icône de la flèche vers la droite */}
        </button>
      </div>
      <div className={styles.content}>
        {/* Ici, vous pouvez ajouter le contenu de votre en-tête */}
      </div>
      <div className={styles.user}>
        <button className={styles.button} aria-label="Nouveautés">
          {/* Ici, vous pouvez ajouter l'icône de nouveautés */}
        </button>
        <button className={styles.button} aria-label="Nom d'utilisateur">
          {/* Ici, vous pouvez ajouter l'icône de l'utilisateur */}
        </button>
      </div>
    </header>
  );
};

export default Header;
