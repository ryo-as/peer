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

    this.state = {
      delivery: false
    };
  }

  /**
   *  アンマウント時
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  componentWillUnmount () {
    if (!this.peer.destroyed) this.peer.destroy();
  }

  /**
   *  配信開始
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  start () {
    // 閲覧側からの接続要求をハンドリングします
    this.peer.on('connection', (dataConnection) => {
       var mediaConnection = this.peer.call(dataConnection.peer, window.stream);
    });

    window.onbeforeunload = () => {
      if (!this.peer.destroyed) this.peer.destroy();
    };

    this.setState({ delivery: true });
  }

  /**
  *  配信終了
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  end () {
    this.peer.destroy();
    this.setState({ delivery: false });
  }

  /**
   *  表示処理
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  render() {
    if (this.state.delivery) return (
      <div className='wrap'>
        <marquee>配信中です。STOPボタンを押すと配信を停止します</marquee>
        <div className='textWrap'>
          <div className='text' onClick={this.end.bind(this)}>STOP</div>
        </div>
      </div>
    );

    return (
      <div className='wrap'>
        <marquee>待機中です。STARTボタンを押すと配信を開始します</marquee>
        <div className='textWrap'>
          <div className='text' onClick={this.start.bind(this)}>START</div>
        </div>
      </div>
    );
  }
}

navigator.getUserMedia(
  {video: true, audio: true},
  (stream) => {
    window.stream = stream;
    ReactDOM.render(<Application />, document.getElementById('application'));
  },
  (error) => {
    console.log('Failed to get local stream', error);
  }
);
