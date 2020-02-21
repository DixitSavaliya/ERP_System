import React, { Fragment } from 'react';
import { EventEmitter } from '../../event';
import './createemployee.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import checkRights from '../../rights';
import { REMOTE_URL } from '../../redux/constants/index';
import axios from 'axios';
import Auth from '../../redux/Auth';
import {
    Table,
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,

} from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.cs          s';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CreateEmployee extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            statuserror: '',
            statuscheck1: true,
            id: '',
            iderror: '',
            name: '',
            nameerror: '',
            personal_email: '',
            personal_email_error: '',
            official_email: '',
            official_email_error: '',
            password: '',
            password_error: '',
            confirm_password: '',
            confirm_password_error: '',
            current_address: '',
            current_address_error: '',
            permanent_address: '',
            permanent_address_error: '',
            contact_number: '',
            contact_number_error: '',
            emergency_number: '',
            emergency_number_error: '',
            add_image: null,
            add_image_error: '',
            department: '',
            department_error: '',
            reporting_to: '',
            reporting_to_error: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onURLHandler = this.onURLHandler.bind(this);
        this.onHandler = this.onHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.create = this.create.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.update = this.update.bind(this);
        this.handleChangeIsFeaturesStatus = this.handleChangeIsFeaturesStatus.bind(this);
        this.handleChangeWebViewStatus = this.handleChangeWebViewStatus.bind(this);
        this.handleChangeExitStatus = this.handleChangeExitStatus.bind(this);
        this.removeIconPath = this.removeIconPath.bind(this);
        this.itemSelect = this.itemSelect.bind(this);

    }

    componentDidUpdate() {
        if (this.state.flag == 0) {
            this.setState({
                rightdata: this.state.rightdata = JSON.parse(Auth.getRight()),
                flag: this.state.flag = 1
            })
        }
    }

    handleChangeIsFeaturesStatus(event) {
        this.setState({
            is_featuresstatuscheck1: this.state.is_featuresstatuscheck1 = event.target.checked,
            is_features: this.state.is_features = event.target.defaultValue
        })
    }

    handleChangeWebViewStatus(event) {
        this.setState({
            webviewstatuscheck1: this.state.webviewstatuscheck1 = event.target.checked,
            webviewstatus: this.state.webviewstatus = event.target.defaultValue
        })
    }

    handleChangeExitStatus(event) {
        this.setState({
            exitstatuscheck1: this.state.exitstatuscheck1 = event.target.checked,
            exitstatus: this.state.exitstatus = event.target.defaultValue
        })
    }

    handleChangeEvent(event) {
        this.setState({
            nameerror: this.state.nameerror = '',
            descriptionerror: this.state.descriptionerror = '',
            packageerrror: this.state.packageerrror = '',
            customSelecterror: this.state.customSelecterror = '',
            statuserror: this.state.statuserror = '',
            selectedFileerror: this.state.selectedFileerror = '',
        })
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    validate1() {
        let nameerror = "";
        let descriptionerror = "";
        let packageerrror = "";
        let selectedFileerror = "";
        let customSelecterror = "";
        // let bannerselectedFileerror = "";
        // let linkerror = "";
        // let dataerror = "";
        // let privacyerror = "";

        if (!this.state.name) {
            nameerror = "please enter appname";
        }

        // if (!this.state.link) {
        //     linkerror = "please enter URL";
        // }

        // if (!this.state.data) {
        //     dataerror = "please enter data";
        // }

        // if (!this.state.privacy) {
        //     privacyerror = "please enter privacy policy";
        // }

        if (!this.state.description) {
            descriptionerror = "please enter description";
        }

        if (!this.state.package) {
            packageerrror = "please enter package";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        // if (!this.state.bannerselectedFile) {
        //     bannerselectedFileerror = "please select file";
        // }

        if (!this.state.customSelect) {
            customSelecterror = "please select type";
        }


        if (nameerror || descriptionerror || packageerrror || selectedFileerror || customSelecterror) {
            this.setState({ nameerror, descriptionerror, packageerrror, selectedFileerror, customSelecterror });
            return false;
        }
        return true;
    };

    validate() {
        // let iderror = "";
        let nameerror = "";
        let personal_email_error = "";
        let official_email_error = "";
        let password_error = "";
        let confirm_password_error = "";
        let current_address_error = "";
        let permanent_address_error = "";
        let contact_number_error = "";
        let emergency_number_error = "";
        let add_image_error = "";
        let department_error = "";
        let reporting_to_error = "";

        // if (!this.state.id) {
        //     iderror = "please enter employee id";
        // }

        if (!this.state.name) {
            nameerror = "please enter name";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.personal_email) {
            personal_email_error = "please enter personal_email";
        } else if (!reg.test(this.state.personal_email)) {
            personal_email_error = "please enter valid personal_email";
        }

        const reg1 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.official_email) {
            official_email_error = "please enter official_email";
        } else if (!reg1.test(this.state.official_email)) {
            official_email_error = "please enter valid official_email";
        }

        if (!this.state.password) {
            password_error = "please enter password";
        }

        if (!this.state.confirm_password) {
            confirm_password_error = "please enter confirm password";
        }

        if (!this.state.current_address) {
            current_address_error = "please enter current address";
        }

        if (!this.state.permanent_address) {
            permanent_address_error = "please enter permanent address";
        }

        if (!this.state.contact_number) {
            contact_number_error = "please enter contact number";
        }

        if (!this.state.emergency_number) {
            emergency_number_error = "please enter emergency number";
        }

        if (!this.state.add_image) {
            add_image_error = "please select image";
        }

        if (!this.state.department) {
            department_error = "please select department";
        }

        if (!this.state.reporting_to) {
            reporting_to_error = "please select reporting";
        }

        if (nameerror || personal_email_error || official_email_error || password_error || confirm_password_error || current_address_error || permanent_address_error || contact_number_error || emergency_number_error || add_image_error || department_error || reporting_to_error) {
            this.setState({ nameerror, personal_email_error, official_email_error, password_error, confirm_password_error, current_address_error, permanent_address_error, contact_number_error, emergency_number_error, add_image_error, department_error, reporting_to_error });
            return false;
        }
        return true;
    };

    componentDidMount() {
        EventEmitter.subscribe('updated_rights', (value) => {
            this.setState({ flag: this.state.flag = 0 });
        });
        if (this.props.id) {
            const obj = {
                employee_id: this.props.id
            }
            this.props.getEmployeeDataById(obj).then((res) => {
                this.setState({
                    id: this.state.id = res.response.data.emp_id,
                    name: this.state.name = res.response.data.name,
                    personal_email: this.state.personal_email = res.response.data.personal_email,
                    official_email: this.state.official_email = res.response.data.official_email,
                    password: this.state.password = res.response.data.password,
                    confirm_password: this.state.confirm_password = res.response.data.password,
                    current_address: this.state.current_address = res.response.data.current_address,
                    permanent_address: this.state.permanent_address = res.response.data.permanent_address,
                    contact_number: this.state.contact_number = res.response.data.contact_number,
                    emergency_number: this.state.emergency_number = res.response.data.emergency_number,
                    add_image: this.state.add_image = res.response.data.add_image,
                    department: res.response.data.department,
                    reporting_to: res.response.data.reporting_to,
                    status: this.state.status = 1,
                    statuscheck1: this.state.statuscheck1 = (res.response.data.status == 1) ? true : false,
                })
            })
        }

        if (this.props.auth.auth_data.user_group == "publisher") {
            this.setState({
                is_features: this.state.is_features = "",
                more_apps: this.state.more_apps,
                version_code: this.state.version_code,
                exitstatus: this.state.exitstatus = 1
            })
        } else {
            this.setState({
                is_features: this.state.is_features = 1,
                more_apps: this.state.more_apps = "",
                version_code: this.state.version_code = "",
                exitstatus: this.state.exitstatus = ""
            })
        }
    }

    handleChange(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onChangeHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        axios.post(REMOTE_URL + "Employee/uploadEmployeeIcon", data)
            .then(response => {
                this.setState({
                    add_image: this.state.add_image = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        data.append('user_id', this.props.auth.auth_data.id)
        axios.post(REMOTE_URL + "Application/uploadApplicationIcon", data)
            .then(response => {
                this.setState({
                    bannerselectedFile: this.state.bannerselectedFile = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    onURLChangeHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
        let _this = this;
        let data = {
            data: {
                module_name: 'Application',
                primary_id: "",
            },
            imageURL: this.state.filename
        }

        if (data.imageURL) {
            axios.post(REMOTE_URL + "AP/uploadImageByURL", data)
                .then(response => {
                    if (response.data.status == 1) {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'success'
                        });
                        this.setState({
                            selectedFile: this.state.selectedFile = response.data.data
                        })
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'warning'
                        });
                    }
                    // _this.props.updateProfileData().then((res) =>{
                    // })
                }).catch(error => {
                    console.log("error", error);
                });
        } else {
            Swal.fire("PLease Enter URL!", "", "warning");
        }
    }

    onURLHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
        let _this = this;
        let data = {
            data: {
                module_name: 'Application',
                primary_id: "",
            },
            imageURL: this.state.bannerfilename
        }

        if (data.imageURL) {
            axios.post(REMOTE_URL + "AP/uploadImageByURL", data)
                .then(response => {
                    if (response.data.status == 1) {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'success'
                        });
                        this.setState({
                            bannerselectedFile: this.state.bannerselectedFile = response.data.data
                        })
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'warning'
                        });
                    }
                    // _this.props.updateProfileData().then((res) =>{
                    // })
                }).catch(error => {
                    console.log("error", error);
                });
        } else {
            Swal.fire("PLease Enter URL!", "", "warning");
        }
    }


    handleChangeStatus(event) {
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: this.state.status = event.target.defaultValue
        })
    }

    onItemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            department: this.state.department = _id
        })
    }

    itemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            reporting_to: this.state.reporting_to = _id
        })
    }

    removeIcon(data) {
        const obj = {
            file_path: data
        }
        this.props.removeImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });
                this.setState({
                    add_image: this.state.add_image = null
                })

            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeIconPath(data) {
        const obj = {
            id: this.props.auth.auth_data.id,
            image_path: data
        }
        this.props.removeImage(obj).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });

                this.setState({
                    bannerselectedFile: this.state.bannerselectedFile = null
                })

            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    create() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                // iderror: '',
                nameerror: '',
                personal_email_error: '',
                official_email_error: '',
                password_error: '',
                confirm_password_error: '',
                current_address_error: '',
                permanent_address_error: '',
                contact_number_error: '',
                emergency_number_error: '',
                add_image_error: '',
                department_error: '',
                reporting_to_error: ''
            })

            if (this.state.name && this.state.personal_email && this.state.official_email && this.state.password && this.state.confirm_password && this.state.current_address && this.state.permanent_address && this.state.contact_number && this.state.emergency_number && this.state.add_image && this.state.department && this.state.reporting_to) {
                if (this.state.password == this.state.confirm_password) {
                    const obj = {
                        status: this.state.status,
                        name: this.state.name,
                        personal_email: this.state.personal_email,
                        official_email: this.state.official_email,
                        password: this.state.password,
                        current_address: this.state.current_address,
                        permanent_address: this.state.permanent_address,
                        contact_number: this.state.contact_number,
                        emergency_number: this.state.emergency_number,
                        add_image: this.state.add_image,
                        department: this.state.department,
                        reporting_to: this.state.reporting_to
                    }
                    this.props.createEmployee(obj).then((res) => {
                        if (res.response.status == 1) {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'success'
                            });
                            this.props.history.push(this.props.from || { pathname: '/list' });
                        } else {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'warning'
                            });
                        }
                    });
                } else {
                    Swal.fire("Password && Confirm password does not match!", "", "warning");
                }
            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        }
    }

    update() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                nameerror: '',
                personal_email_error: '',
                official_email_error: '',
                password_error: '',
                confirm_password_error: '',
                current_address_error: '',
                permanent_address_error: '',
                contact_number_error: '',
                emergency_number_error: '',
                add_image_error: '',
                department_error: '',
                reporting_to_error: ''
            })
            if (this.props.id && this.state.name && this.state.personal_email && this.state.official_email && this.state.password && this.state.confirm_password && this.state.current_address && this.state.permanent_address && this.state.contact_number && this.state.emergency_number && this.state.add_image && this.state.department && this.state.reporting_to) {
                if (this.state.password == this.state.confirm_password) {
                    const obj = {
                        id: this.props.id,
                        status: this.state.status,
                        name: this.state.name,
                        personal_email: this.state.personal_email,
                        official_email: this.state.official_email,
                        password: this.state.password,
                        current_address: this.state.current_address,
                        permanent_address: this.state.permanent_address,
                        contact_number: this.state.contact_number,
                        emergency_number: this.state.emergency_number,
                        add_image: this.state.add_image,
                        department: this.state.department,
                        reporting_to: this.state.reporting_to
                    }
                    this.props.updateEmployee(obj).then((res) => {
                        if (res.response.status == 1) {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'success'
                            });
                            this.props.history.push(this.props.from || { pathname: '/list' });
                        } else {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'warning'
                            });
                        }
                    });
                } else {
                    Swal.fire("Password && Confirm password does not match!", "", "warning");
                }
            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }

        };

    }

    render() {
        const { auth } = this.props;
        return (
            <section>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 welcome_list">
                            <h1>Employee Registration Form</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-10 back">
                            <a href="/#/list" className="btn">Back</a>
                            {
                                this.props.id ? (
                                    <a className="btn" onClick={this.update}>Update</a>
                                ) : (

                                        <a className="btn" onClick={this.create}>Save</a>
                                    )
                            }
                            <a href="#" className="btn">Cancel</a>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center employeeForm media-m">
                        <div className="col-lg-10 employeeform_bg">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Emp_ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="id"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.id}
                                                id="id"
                                                placeholder="Enter Emp ID"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.iderror}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Emp_Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.name}
                                                id="name"
                                                placeholder="Enter Emp Name"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.nameerror}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Personal Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="personal_email"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.personal_email}
                                                id="personal_email"
                                                placeholder="Enter Personal Email ID"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.personal_email_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Offical Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="official_email"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.official_email}
                                                id="official_email"
                                                placeholder="Enter Offical Email"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.official_email_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Contact Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="contact_number"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.contact_number}
                                                id="contact_number"
                                                placeholder="Enter Contact Number"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.contact_number_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Emergency Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="emergency_number"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.emergency_number}
                                                id="emergency_number"
                                                placeholder="Enter Emergency Number"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.emergency_number_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                onChange={this.handleChange}
                                                id="password"
                                                placeholder="Enter Password"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.password_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Confrim Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirm_password"
                                                onChange={this.handleChange}
                                                id="confirm_password"
                                                placeholder="Enter Confrim Password"
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.confirm_password_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label area">
                                        <div className="form-group">
                                            <label>Current Address</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="current_address"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.current_address}
                                                id="current_address"
                                                placeholder="Current Address"
                                                rows="2">
                                            </textarea>
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.current_address_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label area">
                                        <div className="form-group">
                                            <label>Permanent Address</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="permanent_address"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.permanent_address}
                                                id="permanent_address"
                                                placeholder="Enter Permanent Address"
                                                rows="2">
                                            </textarea>
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.permanent_address_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <Input
                                            type="select"
                                                name="department"
                                                className="selectpicker w-100"
                                                style={{ height: '42px' }}
                                                onChange={this.onItemSelect}
                                            >
                                                {
                                                    this.props.id ? (
                                                        <option>{this.state.department == 1 ? 'HR' : (this.state.department == 2 ? 'Admin' : (this.state.department == 3 ? 'Account' : (this.state.department == 4 ? 'Software Developer/Designer' : (this.state.department == 5 ? 'Business Developer' : (this.state.department == 6 ? 'Project Manager' : null)))))}</option>
                                                    ) : (

                                                            <option>Select</option>
                                                        )
                                                }
                                                <option value="1">HR</option>
                                                <option value="2">Admin</option>
                                                <option value="3">Account</option>
                                                <option value="4">Developer/Desginer</option>
                                                <option value="5">Business Developer</option>
                                                <option value="6">Project Manager</option>
                                            </Input>
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.department_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label">
                                        <div className="form-group">
                                            <label>Reporting Manager</label>
                                            <Input
                                                type="select"
                                                name="reporting_to"
                                                className="selectpicker w-100"
                                                style={{ height: '42px' }}
                                                onChange={this.itemSelect}
                                            >
                                                {
                                                    this.props.id ? (
                                                        <option>{this.state.reporting_to == 1 ? 'HR' : (this.state.reporting_to == 2 ? 'Admin' : (this.state.reporting_to == 3 ? 'Account' : (this.state.reporting_to == 4 ? 'Software Developer/Designer' : (this.state.reporting_to == 5 ? 'Business Developer' : (this.state.reporting_to == 6 ? 'Project Manager' : null)))))}</option>
                                                    ) : (

                                                            <option>Select</option>
                                                        )
                                                }
                                                <option value="1">HR</option>
                                                <option value="2">Admin</option>
                                                <option value="3">Account</option>
                                                <option value="4">Developer/Desginer</option>
                                                <option value="5">Business Developer</option>
                                                <option value="6">Project Manager</option>
                                            </Input>
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.reporting_to_error}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label" style={{ marginTop: '19px' }}>
                                        <div className="form-group">
                                            <label>Profile_image</label>
                                        </div>
                                        <div className="add-image">
                                            {
                                                this.state.add_image != null ? (
                                                    <div>
                                                        {
                                                            this.state.add_image ? (
                                                                <div>
                                                                    <img className="picture" src={REMOTE_URL + this.state.add_image} />
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.removeIcon(this.state.add_image)}></i>
                                                                </div>
                                                            ) : (null)
                                                        }
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <label htmlFor="file"><i className="fas fa-upload" style={{ color: '#152d53' }}></i></label>
                                                            <input
                                                                type="file"
                                                                name="file"
                                                                id="file"
                                                                onChange={this.onChangeHandler.bind(this)}
                                                            />
                                                        </div>
                                                    )
                                            }
                                        </div>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.add_image_error}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 employeeForm-label" style={{ marginTop: '19px' }}>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <br />
                                            <div className="form-check-inline" style={{ marginLeft: '0px' }}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="optradio"
                                                        defaultValue="1"
                                                        checked={this.state.status == 1 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                        onChange={this.handleChangeStatus}
                                                    />
                                                    Active
                                                 </label>
                                            </div>
                                            <div className="form-check-inline" style={{ marginLeft: '0px' }}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="optradio"
                                                        defaultValue="0"
                                                        checked={this.state.status == 0 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                        onChange={this.handleChangeStatus}
                                                    />
                                                    InActive
                                                </label>
                                            </div>
                                            {/* <label>Permanent Address</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="permanent_address"
                                                onChange={this.handleChange}
                                                defaultValue={this.state.permanent_address}
                                                id="permanent_address"
                                                placeholder="Enter Permanent Address"
                                                rows="2">
                                            </textarea> */}
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.permanent_address_error}
                                            </div>
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

export default CreateEmployee;  