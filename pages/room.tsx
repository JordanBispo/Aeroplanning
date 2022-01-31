import type { NextPage } from 'next'
import Head from 'next/head'
import io from 'socket.io-client'
import { useState } from 'react'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

//implement socket connection

const socket = io('http://0.0.0.0:3333')



const Room: NextPage = (props) => {

    const [activated, active] = useState(0)

    type card = {
        title: string,
        value: number,
        image?: string
    }
    const [message, setMessage] = useState<string>('')

    const emitCard = (value: number) => {
        socket.emit('selectCard', value)
    }

    const conect = () => {
        socket.emit("newClient", "!QAZ@WS#ED")
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

            <header className={styles.title} style={!!activated ? { backgroundColor: "#00974c", color: "#fff" } : undefined} onClick={() => { active(0); conect(); console.log("teste") }} >
                {!!activated ? "Back to Home" : "Select one card"}
            </header>
            <main className={styles.main}>
                <div>{message}</div>
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



export default Room
