import HomeProfile from '../src/HomeProfile'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainHeader from '../src/MainHeader'
import Articles from '../src/Articles'
import 'bootstrap/dist/css/bootstrap.min.css';

import OYCLogo from "../public/ghostIcon2.png";




export default function Home() {
  return (
    <div style = {{border:"none"}}>
      <Head key = "specialFontPurposes">
        <title>OYC</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap" rel="stylesheet"></link>
          <link rel = "shortcut icon" href = "../public/OYCLogoBig.png" type = "image/x-icon"></link>
      </Head>
      <div >
        <br></br><br></br>
          <h1 className = {styles.authorName}>Read from our diverse <br></br>community of creatives today.</h1><br></br><br></br><br></br>
      </div>
      <Articles></Articles>
      <HomeProfile/>
    </div>

  )
}
