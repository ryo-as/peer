const express = require('express');
const router = express.Router();
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

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/service', (req, res, next) => {
  res.render('service', { title: 'Express' });
});

router.get('/slack/:action', (req, res, next) => {
  const action = req.params.action;

  if (!action) return res.json({message: 'not action name.'});

  const message = (action == 'start') ? `配信を開始しました! http://${getLocalAddress()[0].address}:3000/`: '配信を終了します！'

  request.post(
    'https://slack.com/api/chat.postMessage',
    {
      form: {
        token:    'xoxp-20402353301-21309158545-179760214227-7e3ababd06b6e2d04c49648d5ffbee7c',
        channel:  '#event',
        username: '会議室PHP',
        text:     message,
      }
    },
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

module.exports = router;
