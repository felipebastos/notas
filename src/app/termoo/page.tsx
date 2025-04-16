import styles from './styles.module.css'

export default function Termoo() {
    const palavras: string[] = [
        'torta',
        'cinco',
        'texto',
        'pedro',
        'dorme',
    ]

    const aleatorio: number = Math.floor(Math.random()* palavras.length)

    
    const escolhida: string[] = [...palavras[aleatorio]]


    return <>
        <div   className={styles.termoo}>
       {escolhida.map((letra, index) => <div className={styles.letra} key={index}>{letra}</div>)}
       </div>
    </>
}