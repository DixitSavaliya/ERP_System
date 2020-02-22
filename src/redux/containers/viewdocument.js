import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getViewEmployeeDetailsById} from '../actions/createapp';
import {getEmployeeDocument } from '../actions/customads';
import ViewDocument from '../../views/viewdocument/viewdocument';

class ViewDocumentContainer extends Component {
    
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
      const {auth,getViewEmployeeDetailsById,getEmployeeDocument} = this.props;
      this.id = this.props.location.pathname.split('/')[2];
      return (
        <ViewDocument auth={auth} {...this.props} id={this.id} getViewEmployeeDetailsById={getViewEmployeeDetailsById} getEmployeeDocument={getEmployeeDocument}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getViewEmployeeDetailsById:(data) => dispatch(getViewEmployeeDetailsById(data)),
    getEmployeeDocument:(data) => dispatch(getEmployeeDocument(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewDocumentContainer));