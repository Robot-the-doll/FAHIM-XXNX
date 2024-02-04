module.exports.config = {
  name: "shoti",
  aliase: ["shoti2"],
  version: "1.0.0",
  credits: "libyzxy0",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "other",
  usage: "[shotiv2]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs")
  let response = await axios.post('https://shoti-api.libyzxy0.repl.co/api/get-shoti', { apikey: "shoti-1h7ccntg3mgjvqi8hso" });
  var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
  var rqs = request(encodeURI(response.data.data.url));
  rqs.pipe(file);
  file.on('finish', () => {
    return api.sendMessage({
      body: `@${response.data.user.username}`, 
      attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
    }, event.threadID, event.messageID)
  })
  file.on('error', (err) => {
      api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
  })
};