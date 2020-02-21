import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { createDocument } from '../actions/createapp';
import {searchUsersData,removeDocumentImage,removeBankStatementDocumentImage,removeAdharCardBackDocumentImage,removePassportPhotoDocumentImage,removePassportDocumentImage,removePancardDocumentImage,removeOriginalCertificateDocumentImage,removeLeavingLetterDocumentImage} from '../actions/auth';
import {getEmployeeDocument } from '../actions/customads';
import {updateDocument } from '../actions/monetization';
import Document from '../../views/document/document';
import Auth from '../Auth';

class DocumentContainer extends Component {
    
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
        const {auth,createDocument,searchUsersData,getEmployeeDocument,updateDocument,removeBankStatementDocumentImage,removeLeavingLetterDocumentImage,removeOriginalCertificateDocumentImage,removePancardDocumentImage,removePassportDocumentImage,removePassportPhotoDocumentImage,removeDocumentImage,removeAdharCardBackDocumentImage} = this.props;
      
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <Document auth={auth} createDocument={createDocument} updateDocument={updateDocument} removeBankStatementDocumentImage={removeBankStatementDocumentImage} removeLeavingLetterDocumentImage={removeLeavingLetterDocumentImage} removeOriginalCertificateDocumentImage={removeOriginalCertificateDocumentImage} removePancardDocumentImage={removePancardDocumentImage} removePassportDocumentImage={removePassportDocumentImage} removePassportPhotoDocumentImage={removePassportPhotoDocumentImage} removeAdharCardBackDocumentImage={removeAdharCardBackDocumentImage} removeDocumentImage={removeDocumentImage} searchUsersData={searchUsersData} getEmployeeDocument={getEmployeeDocument} {...this.props}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    createDocument:(data) => dispatch(createDocument(data)),
    updateDocument:(data) => dispatch(updateDocument(data)),
    searchUsersData:(data) => dispatch(searchUsersData(data)),
    getEmployeeDocument:(data) => dispatch(getEmployeeDocument(data)),
    removeDocumentImage:(data) => dispatch(removeDocumentImage(data)),
    removeAdharCardBackDocumentImage:(data) => dispatch(removeAdharCardBackDocumentImage(data)),
    removePassportPhotoDocumentImage:(data) => dispatch(removePassportPhotoDocumentImage(data)),
    removePassportDocumentImage:(data) => dispatch(removePassportDocumentImage(data)),
    removePancardDocumentImage:(data) => dispatch(removePancardDocumentImage(data)),
    removeOriginalCertificateDocumentImage:(data) => dispatch(removeOriginalCertificateDocumentImage(data)),
    removeLeavingLetterDocumentImage:(data) => dispatch(removeLeavingLetterDocumentImage(data)),
    removeBankStatementDocumentImage:(data) => dispatch(removeBankStatementDocumentImage(data))
    // blockUser:(data) => dispatch(blockUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentContainer));