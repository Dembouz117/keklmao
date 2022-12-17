import Article from "./Article";
import GetArticle from "../components/getArticle";
import React from 'react';




const Articles = () => {


    return (
        <div style = {{position:"relative", backgroundColor: "#F2F3F5", paddingBottom: "30px"}}>
            {/* <Article></Article>
            <Article></Article> */}
            <GetArticle></GetArticle>
  
        </div>

    )

}

export default Articles;