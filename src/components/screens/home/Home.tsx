import { useState } from 'react'
import { Form } from '../../ui/form/Form'
import styles from './Home.module.scss'
function Home() {
  const [isSuccess, setIsSuccess] = useState(false)

  return <div>
    {isSuccess ? <h1 className={styles.success}>Success</h1> : <Form setIsSuccess={setIsSuccess} />}
  </div>
}

export default Home
