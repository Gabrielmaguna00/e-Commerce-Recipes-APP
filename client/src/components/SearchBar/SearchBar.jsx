import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../actions";
import "./SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInputChange=(e)=>{
        e.preventDefault()
        setName(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getRecipesName(name))
        setName('')
    }
return (
    <div className="input">
        <input type="text" placeholder="Search..." onChange={(e)=>handleInputChange(e)} className="searchBar"/>
        <button type="submit"  onClick={(e)=>handleSubmit(e)} className="searchBbutton">Search </button>
    </div>
)
}