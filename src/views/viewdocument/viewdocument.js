import React, { Fragment } from 'react';
import { REMOTE_URL } from '../../redux/constants/index';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import checkRights from '../../rights';
import './viewdocument.css';
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

class ViewDocument extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData: '',
            App: '',
            id: '',
            appviewArray: '',
            rightdata: '',
            flag: 1,
            adhar_card_front: null,
            adhar_card_back: null,
            pan_card: null,
            passport_photo: null,
            passport: null,
            leaving_letter: null,
            original_certificate: null,
            bank_statement: null,
            documentList: { document: true }
        }
        this.list = this.list.bind(this);
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
        if (this.props.id) {
            const obj = {
                employee_id: this.props.id
            }
            this.props.getViewEmployeeDetailsById(obj).then((res) => {
                var array = [];
                array.push(res.response.data);
                this.setState({
                    App: this.state.App = array
                })
            })

            const obj1 = {
                employee_id: this.props.id
            }
            this.props.getEmployeeDocument(obj1).then((res) => {
                if (res.response.status == 1 && res.response.data) {
                    this.setState({
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
        }
    }

    list() {
        this.props.location.state = this.state.documentList;
        this.props.history.push("/list", { response: this.props });
    }


    render() {
        return (
            <section className="employee_register_bg">

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 welcome_list">
                            <h1>Employee Document Details</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 back">
                            <a href="/#/document-list" className="btn">Back</a>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center media-m">
                        <div className="col-md-12 col-lg-10 employee_details_bg">
                            <h5>Employee Detail</h5>
                            <div className="emp_details_bg">
                                {
                                    this.state.App.length > 0 ? (
                                        <div className="col-md-2 col-lg-2 profile_picture">
                                            {
                                                this.state.App[0].add_image != null ? (

                                                    <img src={REMOTE_URL + this.state.App[0].add_image} className="img-fluid" alt="" />
                                                ) : (
                                                        <img src={require('./2.png')} className="img-fluid" alt="" />
                                                    )
                                            }
                                        </div>
                                    ) : (
                                            <div className="col-md-2 col-lg-2 profile_picture">
                                                <img src={require('./1.jpg')} className="img-fluid" alt="" />
                                            </div>
                                        )
                                }
                                <div className="row d-flex flex-row-reverse">
                                    <div className="col-md-10 col-lg-10 emp_details_main">
                                        {
                                            this.state.App.length > 0 ? (
                                                <div className="row" style={{ marginLeft: '5px' }}>
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Emp_ID</h4>
                                                        <h6>{this.state.App[0].emp_id}</h6>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Emp_Name</h4>
                                                        <h6>{this.state.App[0].name}</h6>
                                                    </div>
                                                    {/* <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Personal Email</h4>
                                                                <h6>{this.state.App[0].personal_email}</h6>
                                                            </div> */}
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Offical Email</h4>
                                                        <h6>{this.state.App[0].official_email}</h6>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Contact Number</h4>
                                                        <h6>{this.state.App[0].contact_number}</h6>
                                                    </div>
                                                    {/* <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Emercany Number</h4>
                                                                <h6>{this.state.App[0].emergency_number}</h6>
                                                            </div> */}
                                                    {/* <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Current Address</h4>
                                                                <h6>{this.state.App[0].current_address}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Perment Address</h4>
                                                                <h6>{this.state.App[0].permanent_address}</h6>
                                                            </div> */}
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Department</h4>
                                                        <h6>{this.state.App[0].department == 1 ? 'HR' : (this.state.App[0].department == 2 ? 'Admin' : (this.state.App[0].department == 3 ? 'Account' : (this.state.App[0].department == 4 ? 'Software Developer/Designer' : (this.state.App[0].department == 5 ? 'Business Developer' : (this.state.App[0].department == 6 ? 'Project Manager' : null)))))}</h6>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 emp_details_view">
                                                        <h4>Reporting Manager</h4>
                                                        <h6>{this.state.App[0].reporting_to == 1 ? 'HR' : (this.state.App[0].reporting_to == 2 ? 'Admin' : (this.state.App[0].reporting_to == 3 ? 'Account' : (this.state.App[0].reporting_to == 4 ? 'Software Developer/Designer' : (this.state.App[0].reporting_to == 5 ? 'Business Developer' : (this.state.App[0].reporting_to == 6 ? 'Project Manager' : null)))))}</h6>
                                                    </div>
                                                    {/* <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Status</h4>
                                                                {
                                                                    this.state.App[0].status == 1 ? (

                                                                        <h6>Active</h6>
                                                                    ) : (
                                                                            <h6>InActive</h6>
                                                                        )
                                                                }
                                                            </div> */}
                                                </div>
                                            ) : (
                                                    null
                                                )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center employeeForm">
                                    <div className="col-lg-12 document-title">
                                        <h5>Document Detail</h5>
                                        <form>
                                            <div className="row document_bg">
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Adhhar Card <span>(Front)</span></label>
                                                    </div>

                                                    <div className="document_image">
                                                        {
                                                            this.state.adhar_card_front != null ? (
                                                                <img src={REMOTE_URL + this.state.adhar_card_front} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    {
                                                                        this.state.adhar_card_front != null ? (
                                                                            <img src={REMOTE_URL + this.state.adhar_card_front} className="img-fluid" alt="" />
                                                                        ) : (

                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>




                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Adhhar Card <span>(Back)</span></label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.adhar_card_back != null ? (
                                                                <img src={REMOTE_URL + this.state.adhar_card_back} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    {
                                                                        this.state.adhar_card_back != null ? (
                                                                            <img src={REMOTE_URL + this.state.adhar_card_back} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Pancard</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.pan_card != null ? (
                                                                <img src={REMOTE_URL + this.state.pan_card} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    <h5>pan_card.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    {
                                                                        this.state.pan_card != null ? (
                                                                            <img src={REMOTE_URL + this.state.pan_card} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Passport_Photo</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.passport_photo != null ? (
                                                                <img src={REMOTE_URL + this.state.passport_photo} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    {
                                                                        this.state.passport_photo != null ? (
                                                                            <img src={REMOTE_URL + this.state.passport_photo} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Passport</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.passport != null ? (
                                                                <img src={REMOTE_URL + this.state.passport} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    {
                                                                        this.state.passport != null ? (
                                                                            <img src={REMOTE_URL + this.state.passport} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Leaving Letter</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.leaving_letter != null ? (
                                                                <img src={REMOTE_URL + this.state.leaving_letter} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    <h5>Leaving-Letter.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    {
                                                                        this.state.leaving_letter != null ? (
                                                                            <img src={REMOTE_URL + this.state.leaving_letter} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Education  Ceretificat</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.original_certificate != null ? (
                                                                <img src={REMOTE_URL + this.state.original_certificate} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    <h5>Education-Certificate.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    {
                                                                        this.state.original_certificate != null ? (
                                                                            <img src={REMOTE_URL + this.state.original_certificate} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 employeeForm-label">
                                                    <div className="form-group">
                                                        <label>Cancel Cheque</label>
                                                    </div>
                                                    <div className="document_image">
                                                        {
                                                            this.state.bank_statement != null ? (
                                                                <img src={REMOTE_URL + this.state.bank_statement} alt="" className="docs_img" />
                                                            ) : (
                                                                    <img src={require('./2.png')} alt="" className="docs_img" />
                                                                )
                                                        }

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
                                                                    <h5>Bank-Statement.jpg</h5>
                                                                    <button type="button" className="close" data-dismiss="modal">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body" id="dynamic-content">
                                                                    {
                                                                        this.state.bank_statement != null ? (
                                                                            <img src={REMOTE_URL + this.state.bank_statement} className="img-fluid" alt="" />
                                                                        ) : (
                                                                                <img src={require('./2.png')} alt="" className="img-fluid" />
                                                                            )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ViewDocument;