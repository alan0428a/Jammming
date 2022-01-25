import { useState } from 'react';
import './SearchBar.css'

const SearchBar = (props) => {
    const [term, setTerm] = useState('');
    
    const handleChange = ({target}) => {
        setTerm(target.value);
    }

    const handleClick = () => {
        props.onSearch(term);
    }

    return (
        <div className="SearchBar" >
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleChange}/>
            <button className="SearchButton" onClick={handleClick}>SEARCH</button>
        </div >
    );
}

export { SearchBar }