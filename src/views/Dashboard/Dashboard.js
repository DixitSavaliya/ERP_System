import React, { Component } from 'react';
import './dashboard.css';
import checkRights from '../../rights';
import { connect } from 'react-redux';
import { EventEmitter } from '../../event';
import axios from 'axios';
import { REMOTE_URL } from '../../redux/constants/index';
import Auth from '../../redux/Auth';
import Link from 'react-router-dom/Link';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      publisher: [],
      advertiser: [],
      name: '',
      display: false,
      flag: 1,
      rightdata: '',
      first_name: props.auth.user.first_name ? (props.auth.user.first_name) : (null)
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.update = this.update.bind(this);
    // this.myFunction = this.myFunction.bind(this);
    // this.Logout = this.Logout.bind(this);
  }

  handleChangeEvent() {
    event.preventDefault();
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
    // this.setState({
    //   first_name:this.state.name
    // })
  }

  componentDidUpdate() {
    if (this.state.flag == 0) {
      this.setState({
        rightdata: this.state.rightdata = JSON.parse(Auth.getRight()),
        flag: this.state.flag = 1
      })
    }
  }

  componentDidMount() {
    EventEmitter.subscribe('updated_rights', (value) => {
      this.setState({ flag: this.state.flag = 0 });
    });
    if (this.props.auth.auth_data.user_group == "publisher") {
      let auth = this.props.auth.auth_data;
      axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
      axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
      let data = {
        publisher_id: this.props.auth.auth_data.id
      }
      axios.post(REMOTE_URL + "Application/getPublisherAppHitCount", data)
        .then(response => {
          this.setState({
            publisher: this.state.publisher = response.data.data
          })
        }).catch(error => {
          console.log("error", error);
        });
    } else {
      let auth = this.props.auth.auth_data;
      axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
      axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
      let data = {
        advertiser_id: this.props.auth.auth_data.id
      }
      axios.post(REMOTE_URL + "Application/getAdvertiserAppHitCount", data)
        .then(response => {
          this.setState({
            advertiser: this.state.advertiser = response.data.data
          })
        }).catch(error => {
          console.log("error", error);
        });
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  update() {
    this.props.auth.user.first_name = this.state.name;
    this.props.changeName(this.props.auth.user);
  }

  render() {
    let auth = JSON.parse(window.sessionStorage.getItem('ad_network_user'));
    if (auth) {
      this.props.auth.user = auth;
    }

    return (
      <div>
        {(checkRights('dashboard', 'read') == true) ? (
          <div className="row align-items-center justify-content-center bg-mainManu">
            <div className="col-lg-10">
              <h1 className="welcome_erp">Welcome to ERP System</h1>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/list">
                    <div className="mainManu">
                      <img src={require('./images/employee1.svg')} alt="Employee Management" />
                      <h4>Employee Management</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/document-list">
                    <div className="mainManu">
                      <img src={require('./images/documents1.svg')} alt="Employee Documents" />
                      <h4>Employee Documents</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/create">
                    <div className="mainManu">
                      <img src={require('./images/attendance1.svg')} alt="Attendance Management" />
                      <h4>Attendance Management</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <a href="#">
                    <div className="mainManu">
                      <img src={require('./images/payroll1.svg')} alt="Payroll Management" />
                      <h4>Payroll Management</h4>
                    </div>
                  </a>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <a href="#">
                    <div className="mainManu">
                      <img src={require('./images/salary1.svg')} alt="Salary Slip" />
                      <h4>Salary Slip</h4>
                    </div>
                  </a>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/invoice">
                    <div className="mainManu">
                      <img src={require('./images/invoice1.svg')} alt="Invoice" />
                      <h4>Invoice</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (null)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (user) => { dispatch({ type: 'CHANGE_NAME', payload: user }) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
