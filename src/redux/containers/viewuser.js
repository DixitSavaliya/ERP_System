import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getViewEmployeeDetailsById} from '../actions/createapp';
import ViewEmployee from '../../views/viewuser/viewuser';

class viewEmployeeContainer extends Component {
    
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
      const {auth,getViewEmployeeDetailsById} = this.props;
      this.id = this.props.location.pathname.split('/')[2];
      return (
        <ViewEmployee auth={auth} id={this.id} getViewEmployeeDetailsById={getViewEmployeeDetailsById}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getViewEmployeeDetailsById:(data) => dispatch(getViewEmployeeDetailsById(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(viewEmployeeContainer));