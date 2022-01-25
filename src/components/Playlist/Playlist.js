import './Playlist.css'
import { TrackList } from '../TrackList/TrackList'

const Playlist = (props) => {
    const handleChange = ({target}) => {
        props.onNameChange(target.value);
    }

    return (
        <div className="Playlist">
            <input value={props.name} onChange={handleChange} />
            <TrackList tracks={props.tracks} isRemoval={true} onRemove={props.onRemove} />
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export { Playlist }