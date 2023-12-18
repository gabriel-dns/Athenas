import React, { useState } from 'react';
import './panel.css'
import Typewriter from 'typewriter-effect';
import Loading from '../loading/loading'
import {Text, Tooltip,TextoComSubstituicao} from './textRender/text'
import {getTooltip, getSummarize}  from '../../Api/api'

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');


pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
var selected ='tooltip'



//INUTILIZEI POR ENQUANTO
function MenuLateral(){

  return(
    <div className='menuLateral'>

      <div className='headerMenu'>
        
        <button className='newChat'>

        <spam>◯ New Tab</spam>   ◗
        </button>
        <button onClick={() => {selected="sumarize"; console.log(selected)} } className='newChat'>

        <spam >Sumarização</spam>   ◗
        </button>

        <button onClick={() =>{selected="tooltip"; console.log(selected)}} className='newChat'>
        <spam>Indexação</spam>   ◗
        </button>

        

      </div>
    </div>
  )
}

 function Panel() {
  const [title, setTitle] = useState('INDEXAÇÃO');
  const [pdfText, setPdfText] = useState();
  
  const [removeLoading, setRemoveLoading] = useState(false);
  const setMenu = (currentSelected) => {

    selected =currentSelected
  
    if(currentSelected == 'sumarize') setTitle('SUMARIZAÇÃO')
    else  setTitle('INDEXAÇÃO')
  
    
  
    
  }
  

    const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfData = new Uint8Array(event.target.result);
        const pdf = await pdfjs.getDocument(pdfData).promise;
        let text = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();
          pageText.items.forEach(item => {text += item.str + ' ';});
        }

      const dataRequest = { data: {text} };
      if(selected == 'tooltip'){
        setPdfText("")
        console.log(title)
        getTooltip(dataRequest)
        .then((response) =>  {
        
          setPdfText(
            <Text
            words= {response.data.words}
            text={text}
            tooltips= {response.data.tooltips}  
            
  
            />
          )
          
          console.log('Sucess: ', response.data)
        }
        )
        .catch((error) =>  {
          setPdfText("Não foi Possivel Ler o PDF")
          console.error('deu erro:', error);
        } );
        }else{
          console.log(title)
          setPdfText("")
          getSummarize(dataRequest)
          .then((response) =>  {
  
            setPdfText(response.data[0].data)
            console.log('Sucess: ', response.data)
          }
          )
          .catch((error) =>  {
            setPdfText("Não foi Possivel Ler o PDF")
            console.error('deu erro:', error);
          } );
        }
      }
     
     



      reader.readAsArrayBuffer(file);
    }
  };
  const textoOriginal = "Este é um grande texto com algumas palavras importantes.";
  const palavrasImportantes = ["grande", "importantes"];
  return (
    <> <div className='menuLateral'>

    <div className='headerMenu'>
      
      <button className='newChat'>

      <spam>◯ New Tab</spam>   ◗
      </button>
      <button onClick={() => {setMenu('sumarize'); console.log(selected)} } className='newChat'>

      <spam >Sumarização</spam>   ◗
      </button>

      <button onClick={() =>{ setMenu('tooltip'); console.log(selected)}} className='newChat'>
      <spam>Indexação</spam>   ◗
      </button>

      

    </div>
  </div>
    <section className="panel">
      <div className='headerPanel'>
      <h1>Athena </h1>

      <h1>
        Painel de: 
        
        <span> {title}  </span>
      
       
      
      </h1>
      </div>
      


     

<div className='panelText'>



{/* {<Text
 words= {["CRIADA2","alvos"]}
text='A biologia molecular é um ramo da biologia que estuda a estrutura e função das moléculas biológicas, incluindo DNA, RNA e proteínas. Seus CRIADA2 fundamentos se baseiam nos princípios da quimica organica, bioquimica, genética molecular e tecnologia de DNA recombinante. Na biologia molecular, é fundamental entender como as moléculas interagem entre si dentro das células vivas para compreender os processos celulares. A análise dos ácidos nucleicos (DNA e RNA) permite descobrir novos genes, estudar mutações genéticas associadas a doenças hereditárias alvos terapêuticos.'
tooltips= {[
  {
    "concept": "alvos",
    "tooltip": "Significado termo sexo sexo sexo"
  },
  {
    "concept": "CRIADA2",
    "tooltip": "Significado termo2 sexo sexo sexo"
  }


]}  /> } */}

{/* <Tooltip data={"palavra"} tooltip= {"texto sexo sexo sexo sexo sexo"} video={"https://www.youtube.com/embed/4insPVOTwTk"} />; */}

{pdfText && (
        <div>
          
        
          <div className="pdf-text">
            {pdfText} 

          
          </div>
        </div>
      )}
</div>
{removeLoading && <Loading/>}

<div className='inputPdf'>

  <div className='inputWrapper'>
       
        <p>Selecione seu PDF...</p>
       

        
        <div className='custom-file-input'>
        <input type="file" accept=".pdf" onChange={handleFileChange} /> 
        
        </div>
       
    

 


  </div>
  

</div>



    </section>

    </>



  )
}



export {MenuLateral, Panel}

