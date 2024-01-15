import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    start: false,
    minutes: 25,
    seconds: 0,
  }

  intervalId = null

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  changeStartbtn = () => {
    const {start} = this.state

    if (start) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.updateTimer, 1000)
    }

    this.setState(prevState => ({
      start: !prevState.start,
    }))
  }

  clickResetBtn = () => {
    clearInterval(this.intervalId)

    this.setState(() => ({
      start: false,
      minutes: 25,
      seconds: 0,
    }))
  }

  decreaseBtn = () => {
    const {start, minutes} = this.state
    if (!start && minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  increaseBtn = () => {
    const {start} = this.state
    if (!start) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  updateTimer = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.intervalId)
      this.setState({
        start: false,
      })
    } else {
      this.setState(prevState => ({
        minutes:
          prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes,
        seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {start, minutes} = this.state
    const startText = start ? 'Pause' : 'Start'
    const altImg = start ? 'pause icon' : 'play icon'
    const startImg = start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const timerText = start ? 'Running' : 'Paused'

    return (
      <div className="timer-app-bg-container">
        <h1 className="digital-time-heading">Digital Timer</h1>
        <div className="img-and-settings-container">
          <div className="img-bg-container">
            <div className="time-details-container">
              <h1 className="time-details">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="details-action">{timerText}</p>
            </div>
          </div>
          <div className="start-reset-container">
            <div className="large-start-container">
              <div className="start-container">
                <button
                  type="button"
                  className="play-btn"
                  onClick={this.changeStartbtn}
                >
                  <img src={startImg} alt={altImg} className="play-icon-img" />
                </button>
                <p className="start-text">{startText}</p>
              </div>
              <div className="start-container">
                <button
                  type="button"
                  className="play-btn"
                  onClick={this.clickResetBtn}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-icon-img"
                  />
                </button>
                <p className="start-text">Reset</p>
              </div>
            </div>

            <p className="timer-limit-text">Set Timer limit</p>

            <div className="increase-decrease-btn-container">
              <button
                type="button"
                className="decrease-btn"
                onClick={this.decreaseBtn}
              >
                -
              </button>
              <p className="time-display-btn">{minutes}</p>
              <button
                type="button"
                className="increase-btn"
                onClick={this.increaseBtn}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
