import Image from "next/image"
import styles from '../styles/Home.module.css'

const card = (props: any) => {
    return (
        <div className={styles.card} onClick={() => { props.clickCallback() }}>
            <Image src="/favicon.ico" alt={props.title} width={128} height={128}></Image>
            <h2>{props.card.title}</h2>
        </div>
    )
}

export default card