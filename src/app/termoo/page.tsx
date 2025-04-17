'use client'
// Na linha acima, informamos ao Next.js que nosso componente é exclusivamente
// um componente que executa no cliente (navegador) do usuário.
// Isso vai permitir que usemos algumas funcionalidades como a função
// useEffect e a função useState, conforme você observará.
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function Termoo({ palavraInicial }: { palavraInicial: string[]}) {
    const palavras: string[] = [
        'torta',
        'cinco',
        'texto',
        'pedro',
        'dorme',
    ]
    
    //const escolhida: string[] = [...palavras[aleatorio]]
    // Visto que queremos que nosso componente no futuro
    // lembre da palavra aleatória gerada, comentamos a linha acima
    // que gerava a palavra e abaixo informamos ao Next.js que
    // queremos que ele prepare para nós uma função chamada "setEscolhida"
    // relacionada a variável "escolhida".
    // Em geral usamos a função useState para o componente "lembrar"
    // os valores de variáveis desde a última vez que ele apareceu
    // na interface do usuário. Aqui vamos iniciar com valor nulo
    // pois vamos usar uma outra abordagem, devido geração aleatória
    // da palavra no início.
    const [escolhida, setEscolhida] = useState<string[] | null>(null)
    

    // Quando geramos a palavra aleatória na versão anterior do código
    // isto ocorria a cada vez que o componente era exibido ao usuário.
    // Como estamos usando a "memória" do Next.js (chamamos a useState de hook, tá?)
    // se a gente mantivesse gerando a palavra sempre, o componente entrava
    // num loop infinito de renderização (o processo para exibir ele).
    // Por isso, vamos utilizar esse outro hook, o "useEffect". Ele faz a mesma
    // lógica pretendida, mas como uma de suas etapas é funcionar de forma
    // assíncrona, ele nos protege do loop de renderização.
    // Por causa dessas especificidades técnicas, passamos a gerar a palavra
    // aleatória aqui caso ela já não esteja presente. Presente onde?
    // Não coloquei comentário, mas a função do nosso componente também mudou.
    // Ela agora pede um objeto que chamamos de palavraInicial. O Next.js
    // cuidará de entregar nessa variável o último estado salvo pela função
    // setEscolhida, que criamos com a ajuda dele ali acima, onde
    // utilizamos o hook useState.
    useEffect(() => {
        const setaPrimeiraPalavra = async () => {
            if(!palavraInicial || palavraInicial.length === 0){
                const aleatorio: number = Math.floor(Math.random()* palavras.length)
                setEscolhida([...palavras[aleatorio]])
            } else {
                setEscolhida(palavraInicial)
            }
        }

        setaPrimeiraPalavra()
    }, [])
    

    // A função abaixo faz a lógica de mudar as cores
    // das caixinhas conforme a lógica do Termooo.
    // Nela nós buscamos qual foi o elemento em que o jogador
    // digitou a letra, a partir do id do elemento,
    // e comparamos se a letra está correta, se tem na palavra
    // ou se não tem na palavra, e aplicamos a classe css
    // correta para cada caso.
    // Vamos configurar para chamar essa função sempre
    // que o usuário digitar e o foco de digitação sair do 
    // input em questão.
    const compara = (id:string) => {
        const digitado: Element|null = document.querySelector(`#${id}`)
        const posicao = parseInt(digitado?.id.slice(5,6) || '0')
        
        if(digitado?.value === escolhida[posicao]){ // Posição certa
            digitado.parentElement?.classList.add(styles.letraCerta)
        } else if(escolhida?.includes(digitado?.value)){ // Posição errada
            digitado.parentElement?.classList.add(styles.temLetra)
        } else { // Não tem a letra na palavra
            digitado.parentElement?.classList.add(styles.naoTem)
        }
    }

    // Como apertar tab pra mudar de caixinha de letra é chato
    // Essa função vai fazer a tarefa de sair da caixinha atual
    // e colocar o cursor na próxima.
    const proximo = (id: string, idprox: string) => {
        const atual: Element|null = document.querySelector(`#${id}`)
        const prox: Element|null = document.querySelector(`#${idprox}`)

        if(prox) {
            prox.focus();
        } else {
            atual?.blur();
        }

        

    }

    // Observe que as funções definidas acima foram configuradas
    // nos eventos de onBlur e onChange
    // onBlur é o evento de saída de um elemento
    // onChange é o evento de alteração de conteúdo de um elemento
    return <>
        <div   className={styles.termoo}>
       {escolhida?.map((letra, index) => 
       <div className={styles.letra} key={index}>
        <input className={styles.input}
         onBlur={() => {compara(`letra${index}`)}}
         onChange={() => {proximo(`letra${index}`, `letra${index+1}`)}}
         type="text"
         maxLength={1} 
         name={`letra${index}`} 
         id={`letra${index}`} /></div>)}
       </div>
    </>
}
// O que falta a gente fazer?
// Nossa próxima empreitada é colocar para expor
// as tentativas erradas até o usuário acertar a palavra.