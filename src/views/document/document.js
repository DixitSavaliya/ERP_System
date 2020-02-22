import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import './document.css';
import { EventEmitter } from '../../event';
import { REMOTE_URL } from '../../redux/constants/index';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
// import './listapp.css';
import checkRights from '../../rights';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    CardTitle,
    DropdownToggle,
    Fade,
    Form,
    CustomInput,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import Auth from '../../redux/Auth';
import { Modal } from 'react-bootstrap';

class Document extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            adhar_card_front: null,
            adhar_card_front_error: '',
            adhar_card_back: null,
            adhar_card_back_error: '',
            pan_card: null,
            pan_card_error: '',
            passport_photo: null,
            passport_photo_error: '',
            passport: null,
            passport_error: '',
            leaving_letter: null,
            leaving_letter_error: '',
            original_certificate: null,
            original_certificate_error: '',
            bank_statement: null,
            bank_statement_error: '',
            items: [],
            employee_id: '',
            selectEmployee: null,
            showModal: false,
            isButton: false,
            document_id: ''
        }

        this.onAdharCardFrontChangeHandler = this.onAdharCardFrontChangeHandler.bind(this);
        this.onAdharCardBackChangeHandler = this.onAdharCardBackChangeHandler.bind(this);
        this.onPanCardChangeHandler = this.onPanCardChangeHandler.bind(this);
        this.onPassportPhotoChangeHandler = this.onPassportPhotoChangeHandler.bind(this);
        this.onCancelChequeChangeHandler = this.onCancelChequeChangeHandler.bind(this);
        this.onEducationCertificateChangeHandler = this.onEducationCertificateChangeHandler.bind(this);
        this.onLeavingLetterChangeHandler = this.onLeavingLetterChangeHandler.bind(this);
        this.onPhotoChangeHandler = this.onPhotoChangeHandler.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.filterList = this.filterList.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
        this.openFeedback = this.openFeedback.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.removeAdharCardBackIcon = this.removeAdharCardBackIcon.bind(this);
        this.removePancardIcon = this.removePancardIcon.bind(this);
        this.removePassportPhotoIcon = this.removePassportPhotoIcon.bind(this);
        this.removeLevingLetterIcon = this.removeLevingLetterIcon.bind(this);
        this.removeOriginalCertificateIcon = this.removeOriginalCertificateIcon.bind(this);
        this.removeBankStatementIcon = this.removeBankStatementIcon.bind(this);
        this.removePassportIcon = this.removePassportIcon.bind(this);
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
        EventEmitter.subscribe('isDisplay', (value) => {
            this.setState({ isDisplay: this.state.isDisplay = true });
        });
    }

    validate() {
        let adhar_card_back_error = "";
        let adhar_card_front_error = "";
        let pan_card_error = "";
        // let passport_error = "";
        let passport_photo_error = "";
        let leaving_letter_error = "";
        let bank_statement_error = "";
        let original_certificate_error = "";

        if (!this.state.adhar_card_back) {
            adhar_card_back_error = "please select adhar card back image";
        }

        if (!this.state.adhar_card_front) {
            adhar_card_front_error = "please select adhar card front image";
        }

        if (!this.state.pan_card) {
            pan_card_error = "please select pan card image";
        }

        // if (!this.state.passport) {
        //     passport_error = "please select passport image";
        // }

        if (!this.state.passport_photo) {
            passport_photo_error = "please select passport photo image";
        }

        if (!this.state.original_certificate) {
            original_certificate_error = "please select original certificate image";
        }

        if (!this.state.leaving_letter) {
            leaving_letter_error = "please select leaving letter image";
        }

        if (!this.state.bank_statement) {
            bank_statement_error = "please select bank statement image";
        }

        if (adhar_card_back_error || bank_statement_error || original_certificate_error || passport_photo_error || pan_card_error || adhar_card_front_error || adhar_card_back_error || leaving_letter_error) {
            this.setState({ adhar_card_back_error, bank_statement_error, original_certificate_error, passport_photo_error, pan_card_error, adhar_card_front_error, adhar_card_back_error, leaving_letter_error });
            return false;
        }
        return true;
    };


    onAdharCardFrontChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    adhar_card_front: this.state.adhar_card_front = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onAdharCardBackChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    adhar_card_back: this.state.adhar_card_back = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onPanCardChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    pan_card: this.state.pan_card = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onPassportPhotoChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    passport_photo: this.state.passport_photo = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onPhotoChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    passport: this.state.passport = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onLeavingLetterChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    leaving_letter: this.state.leaving_letter = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onEducationCertificateChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    original_certificate: this.state.original_certificate = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onCancelChequeChangeHandler() {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Document/createDocumentImage", data)
            .then(response => {
                this.setState({
                    bank_statement: this.state.bank_statement = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    save() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                adhar_card_back_error: '',
                adhar_card_front_error: '',
                pan_card_error: '',
                // passport_error: '',
                passport_photo_error: '',
                original_certificate_error: '',
                leaving_letter_error: '',
                bank_statement_error: ''
            })

            if (this.state.adhar_card_back && this.state.adhar_card_front && this.state.pan_card && this.state.passport_photo && this.state.original_certificate && this.state.leaving_letter && this.state.bank_statement) {
                const obj = {
                    employee_id: this.state.employee_id,
                    adhar_card_front: this.state.adhar_card_front,
                    adhar_card_back: this.state.adhar_card_back,
                    pan_card: this.state.pan_card,
                    passport_photo: this.state.passport_photo,
                    passport: this.state.passport,
                    original_certificate: this.state.original_certificate,
                    leaving_letter: this.state.leaving_letter,
                    bank_statement: this.state.bank_statement
                }
                this.props.createDocument(obj).then((res) => {
                    if (res.response.status == 1) {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'success'
                        });
                        // this.props.history.push(this.props.from || { pathname: '/list' });
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                });

            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        }
    }


    update() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                adhar_card_back_error: '',
                adhar_card_front_error: '',
                pan_card_error: '',
                // passport_error: '',
                passport_photo_error: '',
                original_certificate_error: '',
                leaving_letter_error: '',
                bank_statement_error: ''
            })

            if (this.state.document_id && this.state.adhar_card_back && this.state.adhar_card_front && this.state.pan_card && this.state.passport_photo && this.state.original_certificate && this.state.leaving_letter && this.state.bank_statement) {
                const obj = {
                    id: this.state.document_id,
                    employee_id: this.state.employee_id,
                    adhar_card_front: this.state.adhar_card_front,
                    adhar_card_back: this.state.adhar_card_back,
                    pan_card: this.state.pan_card,
                    passport_photo: this.state.passport_photo,
                    passport: this.state.passport,
                    original_certificate: this.state.original_certificate,
                    leaving_letter: this.state.leaving_letter,
                    bank_statement: this.state.bank_statement
                }
                this.props.updateDocument(obj).then((res) => {
                    if (res.response.status == 1) {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'success'
                        });
                        // this.props.history.push(this.props.from || { pathname: '/list' });
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                });

            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        }
    }

    filterList(event) {
        const obj = {
            searchkey: event.target.value
        }
        this.props.searchUsersData(obj).then((res) => {
            this.setState({
                items: this.state.items = res.response.data
            })
        });
    }

    handleAppClick(data, event, item) {
        this.setState({
            selectEmployee: this.state.selectEmployee = item
        })
        let _id = event;
        this.setState({
            employee_id: this.state.employee_id = _id
        })
        const obj = {
            employee_id: this.state.employee_id
        }
        this.props.getEmployeeDocument(obj).then((res) => {
            if (res.response.status == 1 && res.response.data) {
                this.setState({
                    isButton: this.state.isButton = true,
                    document_id: this.state.document_id = res.response.data.id,
                    adhar_card_front: res.response.data.adhar_card_front,
                    adhar_card_back: res.response.data.adhar_card_back,
                    pan_card: res.response.data.pan_card,
                    passport_photo: res.response.data.passport_photo,
                    passport: res.response.data.passport,
                    original_certificate: res.response.data.original_certificate,
                    leaving_letter: res.response.data.leaving_letter,
                    bank_statement: res.response.data.bank_statement
                })
            } else {
                this.setState({
                    isButton: this.state.isButton = false,
                    adhar_card_front: this.state.adhar_card_front = null,
                    adhar_card_back: this.state.adhar_card_back = null,
                    pan_card: this.state.pan_card = null,
                    passport_photo: this.state.passport_photo = null,
                    passport: this.state.passport = null,
                    original_certificate: this.state.original_certificate = null,
                    leaving_letter: this.state.leaving_letter = null,
                    bank_statement: this.state.bank_statement = null
                })
            }
        })
        this.setState({
            items: this.state.items = []
        })
        this.state.items = [];
        document.getElementById('searchInput').value = '';
    }

    removeIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    adhar_card_front: this.state.adhar_card_front = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    adhar_card_front: this.state.adhar_card_front = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeAdharCardBackIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeAdharCardBackDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    adhar_card_back: this.state.adhar_card_back = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removePassportPhotoIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removePassportPhotoDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    passport_photo: this.state.passport_photo = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removePassportIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removePassportDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    passport: this.state.passport = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removePancardIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removePancardDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    pan_card: this.state.pan_card = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeOriginalCertificateIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeOriginalCertificateDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    original_certificate: this.state.original_certificate = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeLevingLetterIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeLeavingLetterDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    leaving_letter: this.state.leaving_letter = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeBankStatementIcon(data) {
        const obj = {
            file_path: data,
            employee_id: this.state.employee_id
        }
        this.props.removeBankStatementDocumentImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    bank_statement: this.state.bank_statement = null
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    openFeedback() {
        $('#myModal').modal('show');
    };


    render() {
        return (
            <section>
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 welcome_list">
                            <h1>Employee Documents</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center employeeForm media-m">
                        <div className="col-lg-10 document_bg">
                            <form>
                                <div className="row">
                                    <div className="col-lg-6 employeeForm-label" style={{marginBottom: '16px'}}>
                                        <div className="form-group">
                                            <label>Search Emp_ID</label>
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="searchInput"
                                                className="form-control search-emp"
                                                placeholder="Search Emp_ID"
                                                onChange={this.filterList}
                                            />
                                            <div className="input-group-append">
                                                <button className="btn" type="button">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                            <ul className="list-group">{
                                                this.state.items.map((item, index) =>
                                                    <li className="list-group-item" key={index} value={item.id} onClick={() => this.handleAppClick(item.package, item.id, item)}>
                                                        <img style={{ width: '70px', height: '50px', padding: '0 10px', borderRadius: '7px', display: 'inline-block', marginTop: '3px' }} src={REMOTE_URL + item.add_image} />
                                                        <p style={{ wordBreak: 'break-all', padding: '0 10px', display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 70px)' }}>
                                                            {item.name}<br />
                                                            <small style={{ wordBreak: 'break-all', paddingTop: '0px', display: 'inline-block' }}>
                                                                {item.department == 1 ? 'HR' : (item.department == 2 ? 'Admin' : (item.department == 3 ? 'Account' : (item.department == 4 ? 'Software Developer/Designer' : (item.department == 5 ? 'Business Developer' : (item.department == 6 ? 'Project Manager' : null)))))}
                                                            </small>
                                                        </p>
                                                    </li>
                                                )
                                            }</ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 back">
                            <a href="/#/document-list" className="btn">Back</a>
                            {
                                this.state.isButton == false ? (

                                    <a onClick={this.save} className="btn" style={{color:'#fff'}}>Save</a>
                                ) : (
                                        <a onClick={this.update} className="btn" style={{color:'#fff'}}>Update</a>
                                    )
                            }
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center employeeForm media-m">
                        <div className="col-lg-10 document_bg">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Adhhar Card <span>(Front)</span></label>
                                        </div>
                                        {
                                            this.state.adhar_card_front != null && this.state.adhar_card_front != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removeIcon(this.state.adhar_card_front)}></i>
                                                        <img src={REMOTE_URL + this.state.adhar_card_front} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel1">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel1" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>aadhar-card-front.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.adhar_card_front} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="adhar_card_front"
                                                                id="file8"
                                                                onChange={this.onAdharCardFrontChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }



                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.adhar_card_front_error}
                                        </div>



                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Adhhar Card <span>(Back)</span></label>
                                        </div>
                                        {
                                            this.state.adhar_card_back != null && this.state.adhar_card_back != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removeAdharCardBackIcon(this.state.adhar_card_back)}></i>
                                                        <img src={REMOTE_URL + this.state.adhar_card_back} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel2">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel2" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>aadhar-card-back.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.adhar_card_back} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="adhar_card_back"
                                                                id="file7"
                                                                onChange={this.onAdharCardBackChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.adhar_card_back_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Pancard</label>
                                        </div>
                                        {
                                            this.state.pan_card != null && this.state.pan_card != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removePancardIcon(this.state.pan_card)}></i>
                                                        <img src={REMOTE_URL + this.state.pan_card} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel3">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel3" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>pan-card.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.pan_card} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="pan_card"
                                                                id="file6"
                                                                onChange={this.onPanCardChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.pan_card_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Passport_Photo</label>
                                        </div>
                                        {
                                            this.state.passport_photo != null && this.state.passport_photo != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removePassportPhotoIcon(this.state.passport_photo)}></i>
                                                        <img src={REMOTE_URL + this.state.passport_photo} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel4">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel4" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>passport-photo.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.passport_photo} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="passport_photo"
                                                                id="file5"
                                                                onChange={this.onPassportPhotoChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.passport_photo_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Passport</label>
                                        </div>
                                        {
                                            this.state.passport != null && this.state.passport != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removePassportIcon(this.state.passport)}></i>
                                                        <img src={REMOTE_URL + this.state.passport} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel5">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel5" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>passport.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.passport} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="passport"
                                                                id="file4"
                                                                onChange={this.onPhotoChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.passport_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Leaving Letter</label>
                                        </div>
                                        {
                                            this.state.leaving_letter != null && this.state.leaving_letter != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removeLevingLetterIcon(this.state.leaving_letter)}></i>
                                                        <img src={REMOTE_URL + this.state.leaving_letter} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel6">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel6" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>leaving-letter.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.leaving_letter} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="leving_letter"
                                                                id="file3"
                                                                onChange={this.onLeavingLetterChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.leaving_letter_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Education  Ceretificat</label>
                                        </div>
                                        {
                                            this.state.original_certificate != null && this.state.original_certificate != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removeOriginalCertificateIcon(this.state.original_certificate)}></i>
                                                        <img src={REMOTE_URL + this.state.original_certificate} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel7">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel7" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>original-certificate.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.original_certificate} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="original_certificate"
                                                                id="file2"
                                                                onChange={this.onEducationCertificateChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.original_certificate_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 employeeForm-label">
                                        <div className="form-group">
                                            <label>Cancel Cheque</label>
                                        </div>
                                        {
                                            this.state.bank_statement != null && this.state.bank_statement != "" ? (
                                                <div>
                                                    <div className="document_image">
                                                        <i className="fas fa-trash-alt" onClick={() => this.removeBankStatementIcon(this.state.bank_statement)}></i>
                                                        <img src={REMOTE_URL + this.state.bank_statement} alt="" className="docs_img" />
                                                        <div className="overlay">
                                                            <a className="view_docs" data-toggle="modal" data-target="#myModel8">
                                                                <i className="fas fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade bd-example-modal-lg show" id="myModel8" role="dialog">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5>bank-statement.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    <img src={REMOTE_URL + this.state.bank_statement} className="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="add-image_bg">
                                                        <div className="add-image fas fa-upload">
                                                            <input
                                                                type="file"
                                                                name="bank_statement"
                                                                id="file1"
                                                                onChange={this.onCancelChequeChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.bank_statement_error}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Document;