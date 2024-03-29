import { useContext } from 'react'

import { ChallengesContext } from 'contexts/ChallengesContext'
import styles from 'styles/components/LevelUpModal.module.scss'

export function LevelUpModal() {
  const { level, closeModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns!</strong>
        <p>Você alcançou um novo nível.</p>

        <button type="button" onClick={closeModal}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  )
}
