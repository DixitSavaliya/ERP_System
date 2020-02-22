import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {countuser,usersPGData,searchUsersData,blockUser} from '../actions/auth';
import ListEmployee from '../../views/Listemployee/listemployee';

class listEmployeeContainer extends Component {
    
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
        const {auth,countuser,usersPGData,searchUsersData,blockUser} = this.props;

      
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <ListEmployee auth={auth} {...this.props} countuser={countuser} usersPGData={usersPGData} searchUsersData={searchUsersData} blockUser={blockUser}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    countuser:() => dispatch(countuser()),
    usersPGData:(obj) => dispatch(usersPGData(obj)),
    searchUsersData:(data) => dispatch(searchUsersData(data)),
    blockUser:(data) => dispatch(blockUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(listEmployeeContainer));