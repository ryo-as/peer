navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

import React from 'react'
import ReactDOM from 'react-dom'

const PEERJS_API_KEY  = 'y8hl9fmr8zx5hfr';
const APPLICATION_KEY = 'meeting-space2';

/**
 *  Application Class
 *  @version 2017/01/05
 *  @author ryo-as
 */
class Application extends React.Component {
  /**
   *  コンストラクタ
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  constructor (props) {
    super(props);

    this.peer = new Peer(APPLICATION_KEY, { key: PEERJS_API_KEY, debug: 3 });

    // 閲覧側からの接続要求をハンドリングします
    this.peer.on('connection', (dataConnection) => {
       var mediaConnection = this.peer.call(dataConnection.peer, props.stream);
    });
  }

  /**
   *  表示処理
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  render() {
    return (
      <div>Hello Webpakcer!!</div>
    );
  }
}

navigator.getUserMedia(
  {video: true, audio: true},
  (stream) => {
    ReactDOM.render(<Application {...stream} />, document.getElementById('application'));
  },
  (error) => {
    console.log('Failed to get local stream', error);
  }
);
