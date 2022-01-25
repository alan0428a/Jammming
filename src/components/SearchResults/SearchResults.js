import './SearchResults.css'
import { TrackList } from '../TrackList/TrackList'
import { Track } from '../Track/Track'
import PropTypes from 'prop-types';

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    )
}

export { SearchResults }