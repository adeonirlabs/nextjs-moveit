import { useState, useEffect } from 'react'
import styles from '../styles/components/CountDown.module.scss'

import { ReactComponent as CloseIcon } from '../assets/images/close.svg'

let countdownTimeout: NodeJS.Timeout

export function CountDown() {
  const initialTime = 0.1 * 60
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinish, setHasFinish] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteTen, minuteUnit] = String(minutes).padStart(2, '0').split('')
  const [secondTen, secondUnit] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => {
    setIsActive(true)
  }

  const leaveCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(initialTime)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinish(true)
      setIsActive(false)
      setTime(initialTime)
    }
  }, [isActive, time])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.numbers}>
          <span>{minuteTen}</span>
          <span>{minuteUnit}</span>
        </div>

        <span>:</span>

        <div className={styles.numbers}>
          <span>{secondTen}</span>
          <span>{secondUnit}</span>
        </div>
      </div>

      {hasFinish ? (
        <button
          className={styles.button}
          disabled
        >
          Ciclo encerrado
          <img src="icons/check.svg" alt="Arrow right" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.button} ${styles.button_active}`}
              onClick={leaveCountdown}
            >
              Abandonar o ciclo
              <CloseIcon />
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img src="icons/arrow-right.svg" alt="Arrow right" />
            </button>
          )}
        </>
      )}
    </>
  )
}
