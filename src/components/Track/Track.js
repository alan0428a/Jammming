import './Track.css'

const Track = (props) => {
    const { track, isRemoval, onAdd, onRemove } = props;
    
    const handleClick = (event) => {
        if(isRemoval){
            onRemove(track);
        } else {
            onAdd(track);
        }
    }


    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action" onClick={handleClick}>{isRemoval ? '-' : '+'}</button>           
        </div>
    )
}

export { Track }