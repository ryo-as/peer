const request = require('request');
const os = require('os');
const interfaces = os.networkInterfaces();

const getLocalAddress = () => {
  let ips = [];

  Object.keys(interfaces).forEach((name) => {
    interfaces[name].forEach( (details) => {
      if (details.internal) return;
      // IPv6は除外
      if (details.family == 'IPv6') return;
      // リストに追加
      ips.push({ name: name, address: details.address });
    });
  });

  return ips;
};

request.post(
  'https://slack.com/api/chat.postMessage',
  {
    form: {
      token:    'xoxp-20402353301-21309158545-179259113428-993710d58dced4c1b1cab441736a7d35',
      channel:  '#event',
      username: '会議室PHP',
      text:     `配信を開始しました! http://${getLocalAddress()[0].address}:8080/`,
    }
  },
  (error, response, body) => {
    console.log(error)
  }
);
