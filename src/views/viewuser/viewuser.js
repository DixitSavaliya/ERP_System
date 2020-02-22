import React, { Fragment } from 'react';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import checkRights from '../../rights';
import { REMOTE_URL } from '../../redux/constants/index';
import './viewuser.css';
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

class ViewEmployee extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData: '',
            App: [],
            id: '',
            fb_ads: false,
            mopub_ads: false,
            admob_ads: false,
            flag: 1,
            rightdata: ''
        }
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
        }
    }


    render() {

        return (
            <div>
                {(checkRights('employee', 'read') == true) ? (
                    <section>

                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-10 welcome_list">
                                    <h1>Employee Details</h1>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-10 back">
                                    <a href="/#/list" className="btn">Back</a>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center media-m">
                                <div className="col-md-12 col-lg-10 employee_details_bg">
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
                                            <div className="col-md-9 col-lg-9 emp_details_main">
                                                {
                                                    this.state.App.length > 0 ? (
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Emp_ID</h4>
                                                                <h6>{this.state.App[0].emp_id}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Emp_Name</h4>
                                                                <h6>{this.state.App[0].name}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Personal Email</h4>
                                                                <h6>{this.state.App[0].personal_email}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Offical Email</h4>
                                                                <h6>{this.state.App[0].official_email}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Contact Number</h4>
                                                                <h6>{this.state.App[0].contact_number}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Emercany Number</h4>
                                                                <h6>{this.state.App[0].emergency_number}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Current Address</h4>
                                                                <h6>{this.state.App[0].current_address}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Perment Address</h4>
                                                                <h6>{this.state.App[0].permanent_address}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Department</h4>
                                                                <h6>{this.state.App[0].department == 1 ? 'HR' : (this.state.App[0].department == 2 ? 'Admin' : (this.state.App[0].department == 3 ? 'Account' : (this.state.App[0].department == 4 ? 'Software Developer/Designer' : (this.state.App[0].department == 5 ? 'Business Developer' : (this.state.App[0].department == 6 ? 'Project Manager' : null)))))}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Reporting Manager</h4>
                                                                <h6>{this.state.App[0].reporting_to == 1 ? 'HR' : (this.state.App[0].reporting_to == 2 ? 'Admin' : (this.state.App[0].reporting_to == 3 ? 'Account' : (this.state.App[0].reporting_to == 4 ? 'Software Developer/Designer' : (this.state.App[0].reporting_to == 5 ? 'Business Developer' : (this.state.App[0].reporting_to == 6 ? 'Project Manager' : null)))))}</h6>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 emp_details_view">
                                                                <h4>Status</h4>
                                                                {
                                                                    this.state.App[0].status == 1 ? (

                                                                        <h6>Active</h6>
                                                                    ) : (
                                                                            <h6>InActive</h6>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                            null
                                                        )
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    {/* <div class="container-fluid">
                                        <div class="row align-items-center justify-content-center employeeForm">
                                            <div class="col-lg-12 document-title">
                                                <h5>Document Detail</h5>
                                                <form>
                                                    <div class="row document_bg">
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Adhhar Card <span>(Front)</span></label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Adhhar Card <span>(Back)</span></label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Pancard</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Passport_Photo</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Photo</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Leaving Letter</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Education  Ceretificat</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 employeeForm-label">
                                                            <div class="form-group">
                                                                <label>Cancel Cheque</label>
                                                            </div>
                                                            <div class="document_image">
                                                                <img src="images/aadhar-card.jpg" alt="" class="docs_img" />
                                                                <div class="overlay">
                                                                    <a href="#myModal" class="view_docs" data-toggle="modal">
                                                                        <i class="fas fa-eye"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5>aadhar-card.jpg</h5>
                                                                            <button type="button" class="close" data-dismiss="modal">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body" id="dynamic-content">
                                                                            <img src="images/aadhar-card.jpg" class="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}


                                </div>
                            </div>
                        </div>
                    </section>
                    // <div>
                    //     {
                    //         this.state.App.length > 0 ? (
                    //             <div>
                    //                 <div>
                    //                     <Row>
                    //                         <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    //                             <Link to="/list">
                    //                                 <Button classNameName="mb-2 mr-2" color="primary">
                    //                                     Go back
                    //                                                                    </Button>
                    //                             </Link>
                    //                         </Col>
                    //                     </Row>
                    //                     <Row>
                    //                         <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    //                             <Card classNameName="main-card mb-3">
                    //                                 <CardHeader>
                    //                                     <CardTitle
                    //                                         classNameName="font"
                    //                                     >
                    //                                         Employee Detail
                    //                                                                                </CardTitle>
                    //                                 </CardHeader>
                    //                                 <CardBody>
                    //                                     <Row>
                    //                                         <Col md="6">
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5 style={{ wordBreak: ' break-all' }}>Name:</h5>
                    //                                                         <p classNameName="blue">{data.name}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <Col md="6">
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5 style={{ wordBreak: ' break-all' }}>Personal_Email:</h5>
                    //                                                         <p classNameName="blue">{data.personal_email}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <br />
                    //                                         <Col md="6">
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5 style={{ wordBreak: ' break-all' }}>Official_Email:</h5>
                    //                                                         <p classNameName="blue">{data.official_email}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <Col md="6">
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5 style={{ wordBreak: ' break-all' }}>Current_Address:</h5>
                    //                                                         <p classNameName="blue">{data.current_address}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <br />


                    //                                         <Col md="6">
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5 style={{ wordBreak: ' break-all' }}>Permanent_Address:</h5>
                    //                                                         <p classNameName="blue">{data.permanent_address}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <Col md="6" style={{ marginTop: '15px' }}>
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5>Contact_Number:</h5>
                    //                                                         <p classNameName="blue">{data.contact_number}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <br />
                    //                                         <Col md="6" style={{ marginTop: '15px' }}>
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5>Emergency_Number:</h5>
                    //                                                         <p classNameName="blue">{data.emergency_number}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <Col md="6" style={{ marginTop: '15px' }}>
                    //                                             {
                    //                                                 this.state.App.map((data, index) =>
                    //                                                     <div key={index}>
                    //                                                         <h5>Department:</h5>
                    //                                                         <p classNameName="blue">{data.department == 1 ? 'HR' : (data.department == 2 ? 'Admin' : (data.department == 3 ? 'Account' : (data.department == 4 ? 'Software Developer/Designer' : (data.department == 5 ? 'Business Developer' : (data.department == 6 ? 'Project Manager' : null)))))}</p>
                    //                                                     </div>
                    //                                                 )
                    //                                             }
                    //                                         </Col>
                    //                                         <br />
                    //                                     </Row>
                    //                                 </CardBody>
                    //                             </Card>
                    //                         </Col>
                    //                     </Row>
                    //                 </div>
                    //             </div>
                    //         ) : (
                    //                 null
                    //             )
                    //     }
                    // </div>
                ) : (null)}
            </div>
        );
    }
}

export default ViewEmployee;