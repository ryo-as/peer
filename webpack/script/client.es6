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

    this.peer = new Peer({ key: PEERJS_API_KEY, debug: 3 });
  }

  /**
   *  アンマウント時
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  componentDidMount () {
    // 閲覧側からの接続要求をハンドリングします
    this.peer.on('call', (call) => {
      // 受信のみなのでコールバックなし
      call.answer();
      // サーバーからのStreamをVideoタグに渡す
      call.on('stream', (stream) => {
        this.refs.video.src = URL.createObjectURL(stream);
      });
    });

    // カメラ側に接続します
    this.peer.connect(APPLICATION_KEY);

    window.onbeforeunload = () => {
      if (!this.peer.destroyed) this.peer.destroy();
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
   *  表示処理
   *  @version 2016/05/02
   *  @author ryo.aso
   */
  render() {
    return (
      <div>
        <video id='video' autoPlay ref='video'></video>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('application'));
