import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createInvoice,getInvoice} from '../actions/invoice';
import Invoice from '../../views/invoice/invoice';

class InvoiceContainer extends Component {
    
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
        // this.props.getUserRole();
    }

    render() {
      const {auth,createInvoice,getInvoice} = this.props;
      return (
        <Invoice auth={auth} createInvoice={createInvoice} getInvoice={getInvoice} {...this.props} />
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    createInvoice:(obj) => dispatch(createInvoice(obj)),
    getInvoice:(obj) => dispatch(getInvoice(obj)),
    // applicationPGData:(data) => dispatch(applicationPGData(data)),
    // deleteApp:(data) => dispatch(deleteApp(data)),
    // searchApplicationData:(data) => dispatch(searchApplicationData(data)),
    // activeAppAds:(data) => dispatch(activeAppAds(data)),
    // InactiveAppAds:(data) => dispatch(InactiveAppAds(data)),
    // AddAppMonetization:(data) => dispatch(AddAppMonetization(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InvoiceContainer));