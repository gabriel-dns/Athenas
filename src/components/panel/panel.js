import React, { useState } from 'react';
import './panel.css'
import Typewriter from 'typewriter-effect';
import Loading from '../loading/loading'
import { Text, Tooltip, TextoComSubstituicao } from './textRender/text'
import { getTooltip, getSummarize } from '../../Api/api'

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');


pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
var selected = 'tooltip'

function MenuLateral() {
  return (
    <div className='menuLateral'>
      <div className='headerMenu'>
        <button className='newChat'>
          <spam>◯ New Tab</spam>   ◗
        </button>
        <button onClick={() => { selected = "sumarize"; console.log(selected) }} className='newChat'>
          <spam >Sumarização</spam>   ◗
        </button>

        <button onClick={() => { selected = "tooltip"; console.log(selected) }} className='newChat'>
          <spam>Indexação</spam>   ◗
        </button>
      </div>
    </div>
  )
}

function Panel() {
  const [pdfText, setPdfText] = useState();

  const [removeLoading, setRemoveLoading] = useState(false);


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
          pageText.items.forEach(item => { text += item.str + ' '; });
        }

        const dataRequest = { data: text };
        if (selected == 'tooltip') {
          setPdfText("Carregando sua experiência, aguarde...")
          getTooltip(dataRequest)
            .then((response) => {
              console.log('Sucess: ', response.data)
              var data = response.data.data;
              setPdfText(
                <Text
                  words={data.words}
                  text={text}
                  tooltips={data.tooltips}
                />
              )
            }
            )
            .catch((error) => {
              setPdfText("Não foi Possivel Ler o PDF")
              console.error('deu erro:', error.message);
            });
        } else {
          setPdfText("Carregando sua experiência, aguarde...")
          getSummarize(dataRequest)
            .then((response) => {
              var data = response.data.data;
              setPdfText(data)
              console.log('Sucess: ', response.data)
            }
            )
            .catch((error) => {
              setPdfText("Não foi Possivel Ler o PDF")
              console.error('deu erro:', error);
            });
        }
      }





      reader.readAsArrayBuffer(file);
    }
  };
  const textoOriginal = "Este é um grande texto com algumas palavras importantes.";
  const palavrasImportantes = ["grande", "importantes"];
  return (
    <section className="panel">
      <div className='headerPanel'>
        <h1>Athenas </h1>
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


        {pdfText && (
          <div>


            <div className="pdf-text">
              {pdfText}
              {/* {
           <Typewriter
          onInit={(typewriter) =>{
            typewriter
              .changeDelay(0.05)
              .typeString(pdfText)
              .start();
          }} 
          /> } */}

            </div>
          </div>
        )}
      </div>
      {removeLoading && <Loading />}

      <div className='inputPdf'>

        <div className='inputWrapper'>

          <p>Selecione seu PDF...</p>



          <div className='custom-file-input'>
            <input type="file" accept=".pdf" onChange={handleFileChange} />

          </div>






        </div>


      </div>



    </section>
  );
}



export { MenuLateral, Panel }

