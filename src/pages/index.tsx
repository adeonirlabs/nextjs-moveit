import { ChallengeBox } from 'components/ChallengeBox'
import { CompletedChallenges } from 'components/CompletedChallenges'
import { Countdown } from 'components/Countdown'
import { ExperienceBar } from 'components/ExperienceBar'
import { Profile } from 'components/Profile'
import { ChallengesProvider } from 'contexts/ChallengesContext'
import { CountdownProvider } from 'contexts/CountdownContext'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from 'styles/pages/Home.module.scss'

type Props = {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: Props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <Head>
        <title>Move.It!</title>
      </Head>
      <div className={styles.container}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}
