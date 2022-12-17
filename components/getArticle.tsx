import {
    AnchorWallet,
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import {
    Keypair,
    PublicKey,
    SystemProgram
} from "@solana/web3.js";
import React, { FC, useCallback, useState, useEffect } from "react";
import * as anchor from "@project-serum/anchor";
import { BN, Idl, Program, AnchorProvider } from "@project-serum/anchor";
import { Journalist } from "../data/journalist";
import * as idl from "../data/journalist.json";
import { NodeWallet } from "@metaplex/js";
import { Metaplex } from "@metaplex-foundation/js";
import Spinner from 'react-bootstrap/Spinner';

import Article from "../src/Article";




const GetArticle: FC = () => {
    const { connection } = useConnection();
    const metaplex = new Metaplex(connection);
    // const { publicKey, sendTransaction } = useWallet();
    const dummyKp = Keypair.fromSecretKey(
        Uint8Array.from([
            208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242, 120, 4, 78, 75, 19, 227, 13, 215,
            184, 108, 226, 53, 111, 149, 179, 84, 137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57,
            158, 226, 207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
        ])
    );
    const wallet = new NodeWallet(dummyKp);
    const PROGRAM_ID = "AMNRPsNsDgSxWmxJ3WJ4PwXXSNhGcCbseCYCxqvEDGGV";
    
    const provider = new AnchorProvider(
        connection,
        wallet as any,
        AnchorProvider.defaultOptions()
    );
    const journalistProgram = new anchor.Program<Journalist>(
        idl as any,
        PROGRAM_ID,
        provider
    );
    const [loading, setLoading] = useState(false);

    const [articleList, setArticleList] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        console.log("First!");
        (async () => {
            console.log("Second!");
            try {
                setLoading(true);
                console.log("Third!");
                // setLoading(true);
                let pdas = await journalistProgram.account.articleAccountState.all();
                // console.log(pdas);
                // let lmfao = await connection.getParsedAccountInfo(new PublicKey("GoMp6aZ3U7KxsxVCo3FmZ8gkEaxPhcE9aL82Z695zrss"))
                // 
                let loadedArticle: any[]= [];
                
                // const mintAddress = new PublicKey(pdas[2].account.mintAddress)
                // const nft = await metaplex.nfts().findByMint({mintAddress})
                // // console.log(nft.uri);
                // let data  = await (await fetch(nft.uri)).json();
                // // console.log(data)
                // let pdfurl = data.properties.files[0].uri;
                // console.log(pdas);
                // console.log(pdfurl)
                // console.log(Date.now());
    
              

                console.log(`pdas is`);
                console.log(pdas);
    
                pdas.map(async (pda: any)=>{
                    
                    if(pda.account.author !== "samuel"){
                  
                        const mintAddress = new PublicKey(pda.account.mintAddress);
                        console.log(`The main address is ${pda.account.mintAddress}`);
                        const nft = await metaplex.nfts().findByMint({mintAddress});
                        //console.log(nft.uri);
                        let data = await(await fetch(nft.uri)).json();
                        console.log(data);
                        // console.log(data);
                        // let pdfurl = data.properties.files[0].uri;
                        // console.log(pdfurl)
                        // setLoading(false);
                        
                        //This is a temporary condition to render only a valid jsx from the current program
              
                        loadedArticle.push( <Article title = {data.title} description = {data.description} buttonProp = {data} ></Article>);
                        
                        // loadedArticle.push( <Article title = {data.name} description = {data.description} loading = {loading} buttonProp = {data}></Article>);
                        // loadedArticle.push(<React.Fragment>This is a pushed Hello world!!!</React.Fragment>)
                        console.log("I am here!");
                        console.log("The list article is  " + loadedArticle);
                        setArticleList(loadedArticle);
                    }
                   
                    
                });

                console.log("Made it out of map block!");
                
                console.log("The final articleList is " + articleList);

                setLoading(false);
     
                
            } catch (error: any) {
                alert(error);
                console.log(error);
                setLoading(false);
            }

         
        })()
       
    },[]);

   

    console.log("This is out of the useEffect entirely!");
    console.log(`This is the articleList outside of useEffect! It is = ${articleList}`);


    // const vars = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         let pdas = await journalistProgram.account.articleAccountState.all();
    //         // console.log(pdas);
    //         // let lmfao = await connection.getParsedAccountInfo(new PublicKey("GoMp6aZ3U7KxsxVCo3FmZ8gkEaxPhcE9aL82Z695zrss"))
    //         // 

            
    //         const mintAddress = new PublicKey(pdas[2].account.mintAddress)
    //         const nft = await metaplex.nfts().findByMint({mintAddress})
    //         // console.log(nft.uri);
    //         let data  = await (await fetch(nft.uri)).json();
    //         // console.log(data)
    //         let pdfurl = data.properties.files[0].uri;
    //         console.log(pdas);
    //         console.log(pdfurl)
    //         console.log(Date.now());

    //         setLoading(false);

    //         pdas.map(async (pda: any)=>{
    //             const mintAddress = new PublicKey(pda.account.mintAddress);
    //             const nft = await metaplex.nfts().findByMint({mintAddress});
    //             //console.log(nft.uri);
    //             let data = await(await fetch(nft.uri)).json();
    //             // console.log(data);
    //             // let pdfurl = data.properties.files[0].uri;
    //             // console.log(pdfurl)
    //             console.log(Date.now());
    //             setLoading(false);

                
    //         })
 
            
    //     } catch (error: any) {
    //         alert(error);
    //         console.log(error);
    //     }
    // }, []);

    return (
        <>
        {
        !loading ? articleList.map((jsxArticle) => {
            return (jsxArticle);
        }) : 
        <>
        <Spinner animation = "grow" style = {{height:"10rem",width:"10rem"}}>
        </Spinner><Spinner animation  = "grow" style = {{height:"10rem",width:"10rem"}}>
        </Spinner><Spinner  animation = "grow" style = {{height:"10rem",width:"10rem"}}></Spinner>
        <Spinner animation = "grow" style = {{height:"10rem",width:"10rem"}}></Spinner>
        <Spinner animation = "grow" style = {{height:"10rem",width:"10rem"}}></Spinner>
        <Spinner animation = "grow" style = {{height:"10rem",width:"10rem"}}></Spinner>
        <Spinner animation = "grow" style = {{height:"10rem",width:"10rem"}}></Spinner>
        </>
        }
        {/* {articleList.map((jsxArticle) => {
            return (jsxArticle);
        })} */}
        </>
    )
    // onClick();
    // return (
    //     <div>
    //         <button onClick={onClick}>Console.log Articles</button>
    //     </div>
    // );
};

export default GetArticle;
