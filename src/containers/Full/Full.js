import React, { Component } from 'react';
import { Switch, Route, Redirect, HashRouter as Router, } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../redux/containers/Header';
import Sidebar from '../../redux/containers/Sidebar';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';

//right managment
import UserRole from '../../redux/containers/userrole';
import UserRight from '../../redux/containers/userright';
import UserRoleToRight from '../../redux/containers/userroletoright';

import Profile from '../../redux/containers/Profile';
import ChangePassword from '../../redux/containers/changepassword';
import CreateEmployee from '../../redux/containers/createemployee';
import ListEmployee from '../../redux/containers/listemployee';
import Document from '../../redux/containers/document';
import ViewEmployee from '../../redux/containers/viewuser';
import ViewDocument from '../../redux/containers/viewdocument';
import PageNotFound from '../../views/Pages/Page404/Page404';


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header {...this.props}/>
        <div className="app-body" style={{marginTop:'0px'}}>
          {/* <Sidebar {...this.props} /> */}
          <main className="main" style={{marginLeft:'0px'}}>
            {/* <Breadcrumb {...this.props}/> */}
            <Container fluid style={{margin:'0px',padding:'0px 0px'}}>
              <Router>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" >
                    <Dashboard {...this.props} />
                  </Route>
                  <Route path="/profile" name="Profile" component={Profile} />
                  <Route path="/change-password" name="ChangePassword" component={ChangePassword} />
                  <Route path="/create" name="CreateEmployee" component={CreateEmployee} />
                  <Route path="/list" name="ListEmployee" component={ListEmployee} />        
                  <Route path="/view/:id" name="ViewEmployee" component={ViewEmployee} />
                  <Route path="/view-document/:id" name="ViewDocument" component={ViewDocument} />
                  <Route path="/document" name="Document" component={Document} />
                  <Route path="/userrole" name="UserRole" component={UserRole} />
                  <Route path="/userright" name="UserRight" component={UserRight} />
                  <Route path="/userroletoright" name="UserRoleToRight" component={UserRoleToRight} />
                  {
                    this.props.history.location.pathname != '/' ? (
                      <Route path="*" component={PageNotFound}/>
                    ) : (
                      ""
                    )
                  }
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Router>
            </Container>
          </main>
          {/* <Aside {...this.props} /> */}
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default Full;
