import './App.css';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import { useState } from 'react';
import { Spotify } from '../../util/Spotify'

function App() {
  const [searchResults, setSearchResults] = useState([
  ]);
  
  const [playlist, setPlayList] = useState(
    {
      name: 'New Playlist',
      tracks:[]
    }
  )

  const addTrack = (track) => {
    if(!playlist.tracks.some(x => x.id === track.id)){
      setPlayList(prev => {
        return {...prev, tracks: [...prev.tracks, track]}
      });
    }
  }

  const removeTrack = (track) => {
    if(playlist.tracks.some(x => x.id === track.id)) {
      setPlayList(prev => {
        return {...prev, tracks: prev.tracks.filter(x => x.id !== track.id)}
      });
    }
  }

  const updatePlaylistname = (newName) => {
    setPlayList(prev => {
      return {...prev, name: newName}
    })
  }

  const savePlaylist = async () => {
    let trackURIs = playlist.tracks.map(x => x.uri);
    await Spotify.savePlayList(playlist.name, trackURIs);
    setPlayList(
      {
        name: 'New Playlist',
        tracks: []        
      }
    )
  }

  const search = async (term) => {
    console.log(term);
    let results = await Spotify.search(term);
    setSearchResults(results);
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <Playlist 
            name={playlist.name} 
            tracks={playlist.tracks} 
            onRemove={removeTrack}
            onNameChange={updatePlaylistname}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
