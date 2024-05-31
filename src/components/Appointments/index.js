// Appointments.js
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    name: '',
    userDate: '',
    initialList: [],
    isValid: false,
  }

  nameToggle = event => {
    this.setState({name: event.target.value})
  }

  dateToggle = event => {
    this.setState({userDate: event.target.value})
  }

  formTrigger = event => {
    event.preventDefault()
    const {name, userDate} = this.state
    const object = {
      id: uuidv4(),
      userName: name,
      date: userDate,
      isFavourite: false,
    }
    if (name !== '' && userDate !== '') {
      this.setState(prevState => ({
        initialList: [...prevState.initialList, object],
        name: '',
        userDate: '',
      }))
    }
  }

  likedStar = id => {
    this.setState(prevState => ({
      initialList: prevState.initialList.map(each =>
        each.id === id ? {...each, isFavourite: !each.isFavourite} : each,
      ),
    }))
  }

  staredList = () => {
    this.setState(prevState => ({
      isValid: !prevState.isValid,
    }))
  }

  render() {
    const {name, userDate, initialList, isValid} = this.state

    const filteredList = isValid
      ? initialList.filter(each => each.isFavourite === true)
      : initialList

    return (
      <div className="con">
        <div className="subCon">
          <div className="imgInputCon">
            <div className="inputCon">
              <form onSubmit={this.formTrigger}>
                <h1>Add Appointment</h1>
                <label htmlFor="textLabel">Title</label>
                <br />
                <input
                  type="text"
                  id="textLabel"
                  style={{width: '100%'}}
                  value={name}
                  onChange={this.nameToggle}
                />
                <br />
                <label htmlFor="dateLabel">Date</label>
                <br />
                <input
                  type="date"
                  id="dateLabel"
                  style={{width: '100%'}}
                  value={userDate}
                  onChange={this.dateToggle}
                />
                <br />

                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className=""
              />
            </div>
          </div>
          <hr className="hrCustom" />
          <div className="appointmentCon">
            <h1>Appointments</h1>
            <div>
              <button
                type="button"
                onClick={this.staredList}
                data-testid="starred-toggle"
              >
                Starred
              </button>
            </div>
          </div>
          <ul>
            {filteredList.map(each => (
              <li key={each.id}>
                <AppointmentItem
                  initialList={each}
                  likedStar={this.likedStar}
                  key={each.id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
