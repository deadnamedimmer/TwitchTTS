import _ from 'lodash';
const tmi = require('tmi.js');

//Getting/refreshing tokens

var access_token = "";

var data = {
  client_id: '', // TODO: Fill in id's / Tokens
  client_secret: '',
  grant_type: 'refresh_token',
  refresh_token: '',
};

var formBody = [];
for (var property in data) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(data[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody,
})
.then((response) => response.json())
.then((data) => {
  access_token = data.access_token;
  // Define configuration options
  const opts = {
    identity: {
      username: 'Picea',
      password: 'oauth:' + access_token,
    },
    channels: [
      'mlh'
    ]
  };

  // Create a client with our options
  const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);

  // Connect to Twitch:
  client.connect();

  // Called every time a message comes in
  function onMessageHandler (target, context, msg, self) {
        // Remove whitespace from chat message
        const trimmedMessage = msg.trim();
        var message = new SpeechSynthesisUtterance();
        message.text = trimmedMessage;
        message.lang = 'en-US';
        message.rate = ".9"
        window.speechSynthesis.speak(message);
      }

  });

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function component() {
  const element = document.createElement('div');
  element.innerHTML = '<h1 style="font-family:Atkinson Hyperlegible; color:white">TTS On <svg style="fill:white" width="1em" height="1em" lns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg></h1>'
  return element;
}

document.body.appendChild(component());