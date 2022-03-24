import React from "react";
import './Paginado.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado, currentPage}){
    let pageNumber=[]

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumber.push(i)        
    }
    // console.log('este es mi allrecipes',allRecipes)
    return (
        
        <div class='paginado'>
                    {pageNumber && pageNumber.map(number=>(
                            <a key={number}>
                                <button onClick={()=>paginado(number)} class={currentPage===number?'active':'none'}>{number}</button>                            
                            </a>
                    ))}  
        </div>
    )
}