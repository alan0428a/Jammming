// Add your Spotify application client ID below
const clientId = '';
const redirectUrl = 'http://localhost:3000/'
var token = '';
var userId = '';

const getUserId = async (accessToken) => {
    if (userId) return;

    let url = 'https://api.spotify.com/v1/me';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        userId = jsonResponse.id;
    }
}
const createPlayList = async (name, accessToken) => {
    let url = `https://api.spotify.com/v1/users/${userId}/playlists`
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({name: name})
    }
    const response = await fetch(url, options);

    if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.id;        
    }
    return null;
}

const addTracksToList = async (playlistId, uris, accessToken) => {
    let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({uris: uris})
    }

    const response = await fetch(url, options);

    if(response.ok){
        const jsonResponse = await response.json();    
    }
}

const getAccessToken = () => {
    if(token){
        return token;
    }

    let url = window.location.href;
    let regexToken = /access_token=([^&]*)/;
    let regexExpire = /expires_in=([^&]*)/;

    let tokenResult = url.match(regexToken);
    let expireResult = url.match(regexExpire);

    if(tokenResult && expireResult){
        token = tokenResult[1];
        let expiresIn = Number(expireResult[1]);
        window.setTimeout(() => {
            token = '';
            userId = '';
        }, expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return token;
    }
    else {
        console.log('Before redirect')
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        console.log('After redirect')
    }
}

const Spotify = {
    search: async (term) => {
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const accessToken = getAccessToken();

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if(response.ok){
            let jsonResponse = await response.json();

            if(jsonResponse.tracks.items)
            {
                return jsonResponse.tracks.items.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        artist: x.artists[0].name,
                        album: x.album.name,
                        uri: x.uri
                    }
                })
            }
        }


    },

    savePlayList: async (name, uris) => {
        if(!name || !uris) return;

        const accessToken = getAccessToken();

        await getUserId(accessToken);
        const playListId = await createPlayList(name, accessToken);
        await addTracksToList(playListId, uris, accessToken);    
    }
}

export { Spotify }