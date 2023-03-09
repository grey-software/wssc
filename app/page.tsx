
import Form from '@/components/Complaint-Form/Form'
import HomeScreen from '@/components/Complaint-Form/HomeScreen/HomeScreen'
import Timeline from '@/components/Complaint-Timeline/Timeline'
import { Inter } from 'next/font/google'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main} >
      {/* <Form /> */}
      {/* <Timeline/> */}
      <HomeScreen/>
    </main>
  )
}
