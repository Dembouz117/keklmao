import React, { useState } from "react";
import { useRouter } from 'next/router'


// const ArticleViewer = () => {
//   const reactPdf = require("react-pdf/dist/esm/entry.webpack5");
//   const { Document, Page } = reactPdf;
//   const [numPages, setNumPages] = useState(null);

//   function onDocumentLoadSuccess({ numPages }: any) {
//     setNumPages(numPages);
//   }
//   return (
//       <div style={{ textAlign: "center" }}>
//           <Document
//       file="https://nftstorage.link/ipfs/bafybeiae5utnautsfe4yekkbi66zbpsxpriduf6ht4lkhdcnn3fmgkplwq"
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       {Array.from(
//         new Array(numPages),
//         (el, index) => (
//           <Page
//           renderMode="none"
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//           />
//         ),
//       )}
//     </Document>

//       </div>
//   );
// };
// export default ArticleViewer;

//pdfurl is data.properties.files.uri

const ArticleViewer = () => {

    // const router = useRouter();
    // const data = router.query;

    // console.log(`This is the data for: ${data}`);
    // console.log(Object.keys(data)[0]);

    const router = useRouter();
    const{
        query: {uri,files,properties,fullData},
    } = router;
    //I'll name this props to make it more intuitive to insert even tho not really props
    const props = {
        uri,
        files,
        properties,
        fullData,
    }

    console.log("This is props.uri");
    console.log(props.uri);

    console.log("This is props.files");
    console.log(props.files);

    console.log("This is props.properties");
    console.log(props.properties);

    console.log("This is props.fullData");
    console.log(props.fullData);




    const reactPdf = require("react-pdf/dist/esm/entry.webpack5");
    const { Document, Page } = reactPdf;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    return (
        <div style={{ textAlign: "center" }}>
            <nav>
                <button onClick={goToPrevPage} style = {{backgroundColor:"#D4D4D4"}}>Prev</button>
                <button onClick={goToNextPage} style = {{backgroundColor:"#D4D4D4"}}>Next</button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </nav>
            <div>
            {/* similar code as yesterday */}
                <Document
                    file= {props.uri}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <div style={{ textAlign: "center" }}>
                        <Page
                            renderMode="none"
                            // renderTextLayer={false}
                            pageNumber={pageNumber}
                            width={700}
                        />
                    </div>
                </Document>
            </div>
        </div>
    );
}

export default ArticleViewer;