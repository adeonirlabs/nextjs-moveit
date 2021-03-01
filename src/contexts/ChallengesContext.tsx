import { createContext, ReactNode, useState } from 'react'

import challengesList from '../../challenges.json'

type ContextProps = {
  level: number
  currentExperience: number
  nextExperience: number
  challengesCompleted: number
  activeChallenge: Challenge
  levelUp: () => void
  newChallenge: () => void
  resetChallenge: () => void
}

type ProviderProps = {
  children: ReactNode
}

type Challenge = {
  type: 'body' | 'eye'
  description: string
  amount: number
}

export const ChallengesContext = createContext({} as ContextProps)

export function ChallengesProvider({ children }: ProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const nextExperience = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function newChallenge() {
    const randomChallenge = Math.floor(Math.random() * challengesList.length)
    const challenge = challengesList[randomChallenge]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        nextExperience,
        challengesCompleted,
        activeChallenge,
        levelUp,
        newChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}