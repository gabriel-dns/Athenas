import React, { useState } from 'react';
import './textRender.css'; // Importe o arquivo de estilos CSS

const Tooltip = (props) => {
    var word = props.data
    var tooltip = props.tooltip
    var video = props.video

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
          
        >
          {word} 
          {isTooltipVisible && (
          <div 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          className="tooltip-content">
           {tooltip}
           <br/>
           {/* {video} */}

{video && (
 <iframe
      
 src={video }
 title="YouTube video player"
 frameBorder="0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
/>

)}
          





        </div>
        )}
        </span>

        
        
       
        
        
      
    );
  };




  var Text = (props) =>{
    var words = props.words
    var text = props.text
    var tooltips = props.tooltips ? props.tooltips : []



    var result = [];
    if(words !=null){
        console.log("OBJ antes")
        console.log(result)



     words.forEach((word) => {
       const index = text.indexOf(word);
        var currentTooltip = tooltips.find(item => item.concept === word)
        
        var video = currentTooltip != null ? currentTooltip.video : ''
        console.log("video")
        console.log(video)
        currentTooltip = currentTooltip != null ? currentTooltip.tooltip : 'sem descricao'

        if (index !== -1) {
          const textBefore = text.substring(0, index) ;
          const currentWord = <Tooltip data={word} tooltip= {currentTooltip} video={video} />;
          text = text.substring(index + word.length);
   
          result.push(textBefore, currentWord);
        } 




     });



    }
    




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

  }


 

  export {Tooltip, Text}
