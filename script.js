const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to voiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'b9d36d1439ff45a3a6fb7149ffafa174',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();
        data.setup ?
            joke = `${data.setup} ... ${data.delivery}` :
            joke = data.joke;
        tellMe(joke)
        toggleButton()
    } catch (err) {
        console.log(err);
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)