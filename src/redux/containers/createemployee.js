import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createEmployee,getEmployeeDataById,updateEmployee} from '../actions/createapp';
import {removeImage} from '../actions/auth';
import CreateEmployee from '../../views/Createemployee/createemployee';

class createEmployeeContainer extends Component {
    
    transferToDashboardIfLoggedIn(){
        if (!this.props.auth.auth_data.access_token){
            this.props.history.push(this.props.from || {pathname: '/login'});
        }
    }

    componentWillMount() {
        this.transferToDashboardIfLoggedIn();
    }
    
    componentDidUpdate() {        
        this.transferToDashboardIfLoggedIn();
    }

    componentDidMount() {
    }

    render() {
      const {auth , createEmployee,getEmployeeDataById,updateEmployee,removeImage} = this.props;
      this.id = this.props.location.pathname.split('/')[2];
      return (
        <CreateEmployee {...this.props} auth={auth} createEmployee={createEmployee} id={this.id} getEmployeeDataById={getEmployeeDataById} updateEmployee={updateEmployee} removeImage={removeImage}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    createEmployee:(data) => dispatch(createEmployee(data)),
    getEmployeeDataById:(data) => dispatch(getEmployeeDataById(data)),
    updateEmployee:(data) => dispatch(updateEmployee(data)),
    removeImage:(data) => dispatch(removeImage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createEmployeeContainer));