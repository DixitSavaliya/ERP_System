import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REMOTE_URL } from '../../redux/constants/index';
import Auth from '../../redux/Auth';
import { EventEmitter } from '../../event';
import { Link, withRouter } from 'react-router-dom';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isImage: false,
      image: ''
    }

    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.sidebarMinimize = this.sidebarMinimize.bind(this);
    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.asideToggle = this.asideToggle.bind(this);
    this.Logout = this.Logout.bind(this);
    this.myFunction = this.myFunction.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
  }

  componentDidMount() {
    // if(this.props.auth.auth_data) {
    //   this.props.getUser(this.props.auth.auth_data.id).then((res) => {

    //   });
    // }

    EventEmitter.subscribe('updateImage', (data) => {
      this.setState({
        isImage: this.state.isImage = true,
        image: this.state.image = data
      })
    });

    EventEmitter.subscribe('removeImage', (data) => {
      this.setState({
        isImage: this.state.isImage = false
      })
    });
  }


  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  myFunction() {
    document.getElementById("myprofile").classList.toggle("show");
    window.onclick = function (event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  Logout() {
    Auth.removeAuthenticateUser('ad_network_user');
    Auth.removeAuth('ad_network_auth');
    window.sessionStorage.removeItem('ad_network_auth_right');
    this.props.history.push(this.props.from || { pathname: '/login' });
  }

  changeUrl() {
    this.props.history.push(this.props.from || { pathname: '/dashboard' });
  }

  render() {
    let auth = JSON.parse(window.sessionStorage.getItem('ad_network_user'));
    let authRights = JSON.parse(window.sessionStorage.getItem('ad_network_auth_right'));
    if (auth) {
      this.props.auth.user = auth;
    }
    if (authRights) {
      this.props.auth.rights = authRights;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 bg-header">
            <img onClick={this.changeUrl} className="logo" src={require('./images/logo.png')} alt="" />
            <div className="profile">
              {
                this.state.isImage == false ? (
                  <div>
                    {
                      this.props.auth.user.avatar ? (
                        <img onClick={this.myFunction} src={REMOTE_URL + this.props.auth.user.avatar} className="dropbtn" alt="" />
                      ) : (
                          <img onClick={this.myFunction} className="dropbtn" src={require('./images/profile.png')} alt="" />
                        )
                    }
                  </div>
                ) : (
                    <div>
                      {
                        this.state.image ? (
                          <img onClick={this.myFunction} src={REMOTE_URL + this.state.image} className="dropbtn" alt="" />
                        ) : (
                            <img onClick={this.myFunction} src={require('./images/profile.png')} className="dropbtn" alt="" />
                          )
                      }
                    </div>
                  )
              }
              <div id="myprofile" className="profile-list">
                <div className="profilelogged">
                  <h5>Logged in as:</h5>
                  <h4>{this.props.auth.user.first_name} {this.props.auth.user.last_name}</h4>
                  <h6>{this.props.auth.user.user_role_id == 1 ? 'HR' : (this.props.auth.user.user_role_id == 2 ? 'Admin' : (this.props.auth.user.user_role_id == 3 ? 'Account' : (this.props.auth.user.user_role_id == 4 ? 'Software Developer/Designer' : (this.props.auth.user.user_role_id == 5 ? 'Business Developer' : (this.props.auth.user.user_role_id == 6 ? 'Project Manager' : null)))))}</h6>
                </div>
                <Link to="/Profile"><i className="fas fa-user"></i>Profile</Link>
                <Link to="/change-password"><i className="fas fa-wrench"></i>Change Password</Link>
                <a href="#"><i className="fas fa-cog"></i>Setting</a>
                <a href="#" onClick={this.Logout}><i className="fas fa-sign-out-alt"></i>Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
