import { useContext } from 'react'

import { ChallengesContext } from 'contexts/ChallengesContext'
import styles from 'styles/components/CompletedChallenges.module.scss'

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext)

  return (
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
