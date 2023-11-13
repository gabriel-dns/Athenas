import React, { useState } from 'react';
import './panel.css'


const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


function MenuLateral(){
  return(
    <div className='menuLateral'>

      <div className='headerMenu'>
        
        <button className='newChat'>
        <spam>+</spam>  New tab
        </button>
        <button className='closeOpen'>
          X
        </button>

      </div>
    </div>
  )
}

 function Panel() {
  const [pdfText, setPdfText] = useState('');
  
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
          pageText.items.forEach(item => {
            text += item.str + ' ';
          });
        }
        setPdfText(text);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <section className="panel">
      <h1>Leitor de PDF</h1>


      <input type="file" accept=".pdf" onChange={handleFileChange} />


      {pdfText && (
        <div>
          <h2>Texto do PDF:</h2>

          <div className="pdf-text">{pdfText}</div>
        </div>
      )}


    </section>
  );
}



export {MenuLateral, Panel}
