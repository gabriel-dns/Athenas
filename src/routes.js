import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Main from './pages/Main/Main'
import Panel from './pages/Panel/Panel'


export default function(){
    return(
        <BrowserRouter>
           <Routes>
           <Route path='/' element={<Main/>}  />
           <Route path='/panel' element={<Panel/>}  /> 

           </Routes>
               
             
        </BrowserRouter>
    )
}


