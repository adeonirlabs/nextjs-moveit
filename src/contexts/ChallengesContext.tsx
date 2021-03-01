import 'react-toastify/dist/ReactToastify.css'

import { createContext, ReactNode, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

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
  completeChallenge: () => void
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

    new Audio('/notification.mp3').play()

    toast.info(`Valendo ${challenge.amount}xp`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= nextExperience) {
      finalExperience = finalExperience - nextExperience
      levelUp()
    }

    setActiveChallenge(null)
    setCurrentExperience(finalExperience)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <>
      <ToastContainer />
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
          completeChallenge,
        }}
      >
        {children}
      </ChallengesContext.Provider>
    </>
  )
}
