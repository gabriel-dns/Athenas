import React, { useState } from 'react';
import './textRender.css'; // Importe o arquivo de estilos CSS

const Tooltip = (props) => {
  var word = props.data
  var tooltip = props.tooltip

  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisibility(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisibility(false);
  };

  return (
    <span
      className="tooltip"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {word}
      {isTooltipVisible && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="tooltip-content">
          {tooltip}
        </div>
      )}
    </span>







  );
};


var Text = (props) => {
  var words = props.words
  var text = props.text
  var tooltips = props.tooltips ? props.tooltips : []

  var result = [];
  if (words != null) {
    console.log("OBJ antes")
    console.log(result)

    words.forEach((word) => {
      const index = text.indexOf(word);
      var currentTooltip = tooltips.find(item => item.concept === word)
      currentTooltip = currentTooltip != null ? currentTooltip.tooltip : 'sem descricao'

      if (index !== -1) {
        const textBefore = text.substring(0, index);
        const currentWord = <Tooltip data={word} tooltip={currentTooltip} />;
        text = text.substring(index + word.length);

        result.push(textBefore, currentWord);
      }else{
        console.log("Não achei a palavra '", word, "' no texto.")
      }
    });
  }else console.log("Não chegou as tooltips aqui")


  result.push(text);
  return (
    <div className='textRender'>

      {result.map((elemento, index) => (

        <React.Fragment key={index}>

          {elemento}
        </React.Fragment>
      ))}
    </div>
  );

  // result.push(text);
  // console.log("OBJ ")
  // console.log(result)
  // return (retorno)


}

export { Tooltip, Text }
