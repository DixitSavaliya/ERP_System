import YearMonthPicker from 'react-year-month-picker';
import React, { Component } from 'react';
import './dashboard.css';
import checkRights from '../../rights';
import { connect } from 'react-redux';
import { EventEmitter } from '../../event';
import axios from 'axios';
import { REMOTE_URL } from '../../redux/constants/index';
import Auth from '../../redux/Auth';
import Link from 'react-router-dom/Link';
import Swal from 'sweetalert2';
import {
  Badge,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import MonthPickerInput from 'react-month-picker-input';
import "react-month-picker-input/dist/react-month-picker-input.css";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      publisher: [],
      advertiser: [],
      name: '',
      display: false,
      flag: 1,
      rightdata: '',
      first_name: props.auth.user.first_name ? (props.auth.user.first_name) : (null),
      items: [],
      employee_id: '',
      scheduled: null,
      startDate: new Date(),
      working_day: '',
      working_day_error: '',
      items_error: '',
      month: '',
      month_error: '',
      modal: false,
      emp_id: '',
      emp_name: '',
      monthyear: '',
      selectEmployee: [],
      department: ''
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.update = this.update.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(date) {
    this.setState({
      month: this.state.month = date
    })
  }

  handleChangeEvent() {
    event.preventDefault();
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
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
    if (this.props.auth.auth_data.user_group == "publisher") {
      let auth = this.props.auth.auth_data;
      axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
      axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
      let data = {
        publisher_id: this.props.auth.auth_data.id
      }
      axios.post(REMOTE_URL + "Application/getPublisherAppHitCount", data)
        .then(response => {
          this.setState({
            publisher: this.state.publisher = response.data.data
          })
        }).catch(error => {
          console.log("error", error);
        });
    } else {
      let auth = this.props.auth.auth_data;
      axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
      axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
      let data = {
        advertiser_id: this.props.auth.auth_data.id
      }
      axios.post(REMOTE_URL + "Application/getAdvertiserAppHitCount", data)
        .then(response => {
          this.setState({
            advertiser: this.state.advertiser = response.data.data
          })
        }).catch(error => {
          console.log("error", error);
        });
    }
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  update() {
    this.props.auth.user.first_name = this.state.name;
    this.props.changeName(this.props.auth.user);
  }

  filterList(event) {
    let auth = this.props.auth.auth_data;
    axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
    axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
    const obj = {
      searchkey: event.target.value
    }
    axios.post(REMOTE_URL + "Employee/searchEmployeeData", obj)
      .then(response => {
        this.setState({
          items: this.state.items = response.data.data
        })
      }).catch(error => {
        console.log("error", error);
      });
  }

  handleAppClick(event, item) {
    var arrayss = [];
    arrayss.push(item);
    this.setState({
      selectEmployee: this.state.selectEmployee = arrayss
    })
    console.log("select employee", this.state.selectEmployee);
    let _id = event;
    this.setState({
      employee_id: this.state.employee_id = _id
    })
    // const obj = {
    //     employee_id: this.state.employee_id
    // }
    // this.props.getEmployeeDocument(obj).then((res) => {
    //     if (res.response.status == 1 && res.response.data) {
    //         this.setState({
    //             isButton: this.state.isButton = true,
    //             document_id: this.state.document_id = res.response.data.id,
    //             adhar_card_front: res.response.data.adhar_card_front,
    //             adhar_card_back: res.response.data.adhar_card_back,
    //             pan_card: res.response.data.pan_card,
    //             passport_photo: res.response.data.passport_photo,
    //             passport: res.response.data.passport,
    //             original_certificate: res.response.data.original_certificate,
    //             leaving_letter: res.response.data.leaving_letter,
    //             bank_statement: res.response.data.bank_statement
    //         })
    //     } else {
    //         this.setState({
    //             isButton: this.state.isButton = false,
    //             adhar_card_front: this.state.adhar_card_front = null,
    //             adhar_card_back: this.state.adhar_card_back = null,
    //             pan_card: this.state.pan_card = null,
    //             passport_photo: this.state.passport_photo = null,
    //             passport: this.state.passport = null,
    //             original_certificate: this.state.original_certificate = null,
    //             leaving_letter: this.state.leaving_letter = null,
    //             bank_statement: this.state.bank_statement = null
    //         })
    //     }
    // })
    // this.setState({
    //   items: this.state.items = []
    // })
    // this.state.items = [];
    // document.getElementById('searchInput').value = '';
  }

  validate() {
    let items_error = "";
    let month_error = "";
    let working_day_error = "";

    if (!this.state.items) {
      items_error = "please select employee name";
    }

    if (!this.state.month) {
      month_error = "please select month";
    }

    if (!this.state.working_day) {
      working_day_error = "please enter working day";
    }


    if (items_error || month_error || working_day_error) {
      this.setState({ items_error, month_error, working_day_error });
      return false;
    }
    return true;
  };


  add() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        items_error: "",
        month_error: "",
        working_day_error: ""
      })

      if (this.state.items.length > 0 && this.state.month) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
        const obj = {
          employee_name: this.state.selectEmployee,
          month: this.state.month
        }
        axios.post(REMOTE_URL + "SalarySlip/createSalarySlip", obj)
          .then(response => {
            if (response.data.status == 1) {
              this.setState({
                items: this.state.items = [],
                month:this.state.month = "",
                working_day:this.state.working_day = ""
              })
              this.state.items = [];
              document.getElementById('searchInput').value = '';
              this.setState({
                modal: this.state.modal = !this.state.mpdel,
                monthyear: this.state.monthyear = response.data.data.month
              })
              var itemdata = JSON.parse(response.data.data.employee_name);
              var department = itemdata[0].department == 1 ? 'HR' : (itemdata[0].department == 2 ? 'Admin' : (itemdata[0].department == 3 ? 'Account' : (itemdata[0].department == 4 ? 'Software Developer/Designer' : (itemdata[0].department == 5 ? 'Business Developer' : (itemdata[0].department == 6 ? 'Project Manager' : null)))))
              this.setState({
                emp_id: this.state.emp_id = itemdata[0].id,
                emp_name: this.state.emp_name = itemdata[0].name,
                department: this.state.department = department
              })
              Swal.fire({
                text: response.data.message,
                icon: 'success'
              });
            } else {
              Swal.fire({
                text: response.data.message,
                icon: 'warning'
              });
            }
          }).catch(error => {
            console.log("error", error);
          });
      } else {
        Swal.fire("PLease Enter Field First!", "", "warning");
      }
    }
  }

  render() {
    let auth = JSON.parse(window.sessionStorage.getItem('ad_network_user'));
    if (auth) {
      this.props.auth.user = auth;
    }

    return (
      <div>
        {(checkRights('dashboard', 'read') == true) ? (
          <div className="row align-items-center justify-content-center bg-mainManu">
            <div className="col-lg-10">
              <h1 className="welcome_erp">Welcome to ERP System</h1>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/list">
                    <div className="mainManu">
                      <img src={require('./images/employee1.svg')} alt="Employee Management" />
                      <h4>Employee Management</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/document-list">
                    <div className="mainManu">
                      <img src={require('./images/documents1.svg')} alt="Employee Documents" />
                      <h4>Employee Documents</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/create">
                    <div className="mainManu">
                      <img src={require('./images/attendance1.svg')} alt="Attendance Management" />
                      <h4>Attendance Management</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <a href="#">
                    <div className="mainManu">
                      <img src={require('./images/payroll1.svg')} alt="Payroll Management" />
                      <h4>Payroll Management</h4>
                    </div>
                  </a>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <a href="#myModal" data-toggle="modal">
                    <div className="mainManu">
                      <img src={require('./images/salary1.svg')} alt="Salary Slip" />
                      <h4>Salary Slip</h4>
                    </div>
                  </a>
                  <div className="modal fade bd-example-modal-lg show" id="myModal" role="dialog">
                    <div className="modal-dialog m">
                      <div className="modal-content" style={{ marginLeft: '118px' }}>
                        <div className="modal-header">
                          <h5>Salary Slip Details</h5>
                          <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body" id="dynamic-content">
                          <form name="contactForm" method="post" role="form">
                            <div className="row">
                              <div className="col-md-12 col-lg-12 invoice_form">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    id="searchInput"
                                    className="form-control"
                                    placeholder="Search Employee Name"
                                    onChange={this.filterList}
                                  />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.items_error}
                                  </div>
                                  <ul className="list-group">{
                                    this.state.items.map((item, index) =>
                                      <li className="list-group-item" key={index} value={item.id} onClick={() => this.handleAppClick(item.id, item)}>
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
                              <div className="col-md-12 col-lg-12 invoice_form">
                                <div className="form-group">
                                  <MonthPickerInput
                                    dateFormat="mm/yyyy"
                                    onChange={(maskedValue) => this.handleChange(maskedValue)}
                                  />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.month_error}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 col-lg-12 invoice_form">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="working_day"
                                    id="working_day"
                                    onChange={this.handleChangeEvent}
                                    placeholder="Enter Employee Month Working Day"
                                  />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.working_day_error}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 submit">
                                <button name="submit" type="button" id="submit" className="btn" onClick={this.add}>Submit</button>
                              </div>
                            </div>
                            <Modal isOpen={this.state.modal}>
                              <ModalHeader>SalarySlip</ModalHeader>
                              <ModalBody id="page" style={{ color: 'black', background: 'white' }}>
                                <section className="bg_invoice">

                                  <div className="container">
                                    <div className="row bg-header">
                                      <div className="col-lg-2 logo">
                                        <img src={require('./images/logo.png')} alt="Logo" className="img-fluid" />
                                      </div>
                                      <div className="col-lg-10 address justify-content-end text-center">
                                        <h2>RK WebTechnology</h2>
                                        <h5>413, Anmol Complex, Opp. Raj Place, Sadhu Vasvani Road, Rajkot, Gujarat - 360005</h5>
                                      </div>
                                      <div className="col-lg-12 slip">
                                        <h5>Slip for the month of {this.state.monthyear}</h5>
                                      </div>
                                    </div>

                                  </div>

                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-6 salary_slip">
                                        <div className="row">
                                          <div className="col-lg-4 slip_title">
                                            <h5>Emp ID</h5>
                                          </div>
                                          <div className="col-lg-8 slip_detail">
                                            <h5>{this.state.emp_id}</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-4 slip_title">
                                            <h5>PF. No.</h5>
                                          </div>
                                          <div className="col-lg-8 slip_detail">
                                            <h5>KN/45889/1016</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-4 slip_title">
                                            <h5>Department</h5>
                                          </div>
                                          <div className="col-lg-8 slip_detail">
                                            <h5>{this.state.department}</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-4 slip_title">
                                            <h5>PAN</h5>
                                          </div>
                                          <div className="col-lg-8 slip_detail">
                                            <h5>JOPPL8989S</h5>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-6 salary_slip">
                                        <div className="row">
                                          <div className="col-lg-5 slip_title">
                                            <h5>Employee Name</h5>
                                          </div>
                                          <div className="col-lg-7 slip_detail">
                                            <h5>{this.state.emp_name}</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-5 slip_title">
                                            <h5>Designation</h5>
                                          </div>
                                          <div className="col-lg-7 slip_detail">
                                            <h5>Operator</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-5 slip_title">
                                            <h5>A/c No</h5>
                                          </div>
                                          <div className="col-lg-7 slip_detail">
                                            <h5>sb-1041</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-5 slip_title">
                                            <h5>Mode of Pay</h5>
                                          </div>
                                          <div className="col-lg-7 slip_detail">
                                            <h5>State Bank of India</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-8">
                                        <div className="row earning_label">
                                          <div className="col-lg-4">
                                            <h5>Earnings</h5>
                                          </div>
                                          <div className="col-lg-4 amount_heading">
                                            <h5>Rate</h5>
                                          </div>
                                          <div className="col-lg-4">
                                            <h5>Amount</h5>
                                          </div>
                                        </div>
                                        <div className="row earning_value">
                                          <div className="col-lg-4">
                                            <h5>BASIC</h5>
                                            <h5>DA</h5>
                                            <h5>HRA</h5>
                                            <h5>CONV</h5>
                                            <h5>SPL ALLOW</h5>
                                          </div>
                                          <div className="col-lg-4 amount_heading">
                                            <h5>20,000.00</h5>
                                            <h5>4,000.00</h5>
                                            <h5>9,600.00</h5>
                                            <h5>800.00</h5>
                                            <h5>5,600.00</h5>
                                          </div>
                                          <div className="col-lg-4">
                                            <h5>20,000.00</h5>
                                            <h5>4,000.00</h5>
                                            <h5>9,600.00</h5>
                                            <h5>800.00</h5>
                                            <h5>5,600.00</h5>
                                          </div>
                                        </div>
                                        <div className="row earning_label">
                                          <div className="col-lg-4">
                                            <h5>Total</h5>
                                          </div>
                                          <div className="col-lg-4 amount_heading">
                                            <h5>40,000.00</h5>
                                          </div>
                                          <div className="col-lg-4">
                                            <h5>40,000.00</h5>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row earning_label">
                                          <div className="col-lg-6">
                                            <h5>Deductions</h5>
                                          </div>
                                          <div className="col-lg-6 deductions_heading">
                                            <h5>Amount</h5>
                                          </div>
                                        </div>
                                        <div className="row earning_value">
                                          <div className="col-lg-6 ">
                                            <h5>PF</h5>
                                          </div>
                                          <div className="col-lg-6 pf_heading">
                                            <h5>20,000.00</h5>
                                          </div>
                                        </div>
                                        <div className="row earning_label">
                                          <div className="col-lg-6">
                                            <h5>Total</h5>
                                          </div>
                                          <div className="col-lg-6 pf_total_heading">
                                            <h5>7,122.00</h5>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 net_pay">
                                        <div className="row">
                                          <div className="col-lg-3">
                                            <h5>Net Pay</h5>
                                          </div>
                                          <div className="col-lg-3 ml">
                                            <h5>32,878.00</h5>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-3">
                                            <h5>In Words</h5>
                                          </div>
                                          <div className="col-lg-7 ml">
                                            <h5>Rupees Thirty Two Thousand Eight Hundred Seventy Eight Only</h5>
                                          </div>
                                          <div className="col-lg-2 text-center signature">
                                            <h5>Signature</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-12 footer">
                                        <h5>This is a computer generated payslip</h5>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                              </ModalFooter>
                            </Modal>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <Link to="/invoice">
                    <div className="mainManu">
                      <img src={require('./images/invoice1.svg')} alt="Invoice" />
                      <h4>Invoice</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (null)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (user) => { dispatch({ type: 'CHANGE_NAME', payload: user }) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
