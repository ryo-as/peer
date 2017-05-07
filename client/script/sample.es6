import React from 'react'
import ReactDOM from 'react-dom'

/**
 *  Application Class
 *  @version 2017/01/05
 *  @author ryo-as
 */
class Application extends React.Component {
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

ReactDOM.render(<Application />, document.getElementById('application'));
