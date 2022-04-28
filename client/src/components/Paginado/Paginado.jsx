import React from "react";
import './Paginado.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado, currentPage}){
    let pageNumber=[]

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumber.push(i)        
    }
    let ejemplo=[1, 2, 3 ,4 ,5,6,7,8,9,10,11]
    return (
        
        <div class='paginado'>
                    {pageNumber && pageNumber.map(number=>(
                            <a key={number}>
                                <button onClick={()=>paginado(number)} class={currentPage===number?'active':'none'}>{number}</button>                            
                            </a>
                    ))} 
                    {/* {ejemplo && ejemplo.map(number=>(
                        <a key={number}>
                        <button onClick={()=>paginado(number)} >{number}</button>                            
                    </a>
                    ))

                    }  */}
        </div>
    )
}