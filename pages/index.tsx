import type { NextPage } from 'next'
import Head from 'next/head'
import io from 'socket.io-client'
import { useState } from 'react'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

//implement socket connection

const socket = io('http://0.0.0.0:3333')



const Home: NextPage = () => {

  const [activated, active] = useState(0)

  type card = {
    title: string,
    value: number,
    image?: string
  }

  const [showDown, setShowDown] = useState<boolean>(false)
  const [userList, setUserList] = useState<any[]>([])

  socket.on('newUser', (data: any) => {
    setUserList(userList.concat([data]))
  })

  // socket emmit function
  const setValue = (value: number) => {
    socket.emit('setValue', { name: "teste", value: value })
  }

  socket.on("changeValue", (data: any) => {
    setUserList(userList.map(u => {
      if (u.name === data.name) {
        return data
      } else {
        return u
      }
    }))
    const awaitUser = userList.findIndex(u => {
      u.value === 0
    })
    if (awaitUser === -1) setShowDown(true)
  })

  const conect = () => {
    socket.emit("connectUser", { name: "UserTest", value: 3 })
  }


  const card_list: card[] = [{
    title: "Tenda",
    value: 1,
    image: "https://cdn-icons-png.flaticon.com/512/77/77447.png"
  }, {
    title: "Barraco",
    value: 3,
    image: "http://homemdepalavra.com.br/wp-content/uploads/2014/12/barraco_logo.jpg"
  }, {
    title: "Casa",
    value: 7,
    image: "https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/05/Condom%C3%ADnio-Casa-PNG.png"
  }, {
    title: "Prédio",
    value: 15
  }, {
    title: "Empire State",
    value: 31
  }, {
    title: "Estação Espacial",
    value: 63
  }]

  return (
    <div className={styles.container}>
      <Head>
        <title>Aero Planning</title>
        <meta name="description" content="Aeroscan planning poker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.sidebar_container} >
        {userList.map((user, i) => {
          return <div className={styles.sidebar_item} key={i}>
            <label className={styles.sidebar_text} >{user.name}</label>
            <label className={styles.sidebar_points} style={user.value !== 0 ? { color: '#FFE033' } : undefined} >{user.value !== 0 ? "ready" : "await"}</label>
            {user.value === 0 && <span className={styles.loading}></span>}
          </div>
        })}
      </div>

      <header className={styles.title} style={!!activated ? { backgroundColor: "#00974c", color: "#fff" } : undefined} onClick={() => { active(0); conect() }} >
        {!!activated ? "Back to Home" : "Select one card"}
      </header>
      <main className={styles.main}>
        {!activated && card_list.map((c, i) => {
          return <Card card={c} key={i} clickCallback={() => { active(card_list[i].value) }} />
        })}
        {!!activated && <div className={styles.selected_card} >{activated}</div>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/jordanbispo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' JORDAN BISPO '}

        </a>
      </footer>
    </div>
  )
}



export default Home
