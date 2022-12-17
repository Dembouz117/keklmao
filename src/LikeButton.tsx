import Image from "next/Image"

import styles from "../styles/Article.module.css"
import heartImg from '../public/Heart-empty.png'

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, LAMPORTS_PER_SOL, TransactionSignature, SystemProgram, PublicKey } from '@solana/web3.js';
import { FC, useCallback } from 'react';

// export const RequestPay: FC = () => {

//     return (
//         <div>
//             <button
//                 className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
//                 onClick={onClick}
//             >
//                 <span>LESGOOOOOO</span>
//             </button>
//         </div>
//     );
// }

interface ButtonProp {
    buttonProp?: any
}

const ArticleButton = (props: ButtonProp) => {
    //console.log(props.ButtonProp)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const SOL_PRICE_OF_LIKE = 0.1;

    //REMOVE HARDCODED AUTHORS & SHARES LATER

    //author is data.contributors 
    //shares is data.roles and roles is data.shares
    const authors = props.buttonProp.contributors;
    const shares = props.buttonProp.roles;

    console.log("This is authors list");
    console.log(props.buttonProp.contributors);

    const likeHandler = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            alert('Wallet not Connected!');
            return;
        }

        const transaction = new Transaction();
        try {

            // const ix1 = SystemProgram.transfer({
            //     fromPubkey: publicKey,
            //     toPubkey: new PublicKey("FkvNBs5TruvbAuUkrKdBXZW9zJSrRi6ZrV8n5Fjnad7F"),
            //     lamports: LAMPORTS_PER_SOL * 0.01
            // });
            // const ix2 = SystemProgram.transfer({
            //     fromPubkey: publicKey,
            //     toPubkey: new PublicKey("7WNRBicA8MmZ5U7gnKZ6FhgVwZrfa915zZ8QS8vYL2sj"),
            //     lamports: LAMPORTS_PER_SOL * 0.02
            // });

            // transaction.add(ix1, ix2);
            for (let i = 0; i < authors.length; i++) {
                const ix = SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(authors[i]),
                    lamports: LAMPORTS_PER_SOL * SOL_PRICE_OF_LIKE * (shares[i] / 100)
                });
                transaction.add(ix);
            }

            const tx = await sendTransaction(transaction, connection);
            await connection.confirmTransaction({
                blockhash: (await connection.getLatestBlockhash("max")).blockhash,
                lastValidBlockHeight: (await connection.getLatestBlockhash("max")).lastValidBlockHeight,
                signature: tx,
            });
            alert("Transaction Confirmed!");

        } catch (error: any) {
            alert(error);
            console.log(error);
        }
    }, [publicKey, connection])



    return (
        <button className={styles["likes-button"]} type="button" onClick = {likeHandler}>
            <Image src={heartImg} style = {{height:"25px", width:"25px"}} alt="heart-icon-not-filled" />
        </button>
        )
}

export default ArticleButton;