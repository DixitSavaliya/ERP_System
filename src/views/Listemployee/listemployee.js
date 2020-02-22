import React, { Component } from 'react';
import '../Tables/table.css';
import { Link } from 'react-router-dom';
import { EventEmitter } from '../../event';
import Swal from 'sweetalert2';
import Auth from '../../redux/Auth';
import checkRights from '../../rights';
import './listemployee.css';
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

class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: JSON.parse(window.sessionStorage.getItem('ad_network_auth')),
            check: false,
            isData: false,
            searchData: '',
            count: '',
            currentPage: "1",
            items_per_page: "10",
            render_per_page: "10",
            perpage: '',
            paginationdata: '',
            isFetch: false,
            data: '',
            allRecords: '',
            upperPageBound: "3",
            lowerPageBound: "0",
            pageBound: "3",
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            onClickPage: "1",
            ownership: '',
            ads: false,
            rightdata: '',
            flag: 1,
            document: false

        }
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.handleChangegetAds = this.handleChangegetAds.bind(this);
        this.searchEmployeeDataKeyUp = this.searchEmployeeDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.deleteUserData = this.deleteUserData.bind(this);
        this.appData = this.appData.bind(this);
        this.editEmployeeData = this.editEmployeeData.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.documentData = this.documentData.bind(this);
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
        // this.countUser();
        this.UsersPageData();
    }

    // countUser() {
    //     let _this = this;
    //     this.props.countuser().then((res) => {
    //         _this.setState({
    //             count: _this.state.count = res.response.data
    //         })
    //         _this.UsersPageData();
    //     })
    // }

    UsersPageData() {
        const obj = {
            page_no: "1",
            items_per_page: this.state.items_per_page
        }
        let _this = this;
        this.props.usersPGData(obj).then(function (res) {
            _this.setState({
                paginationdata: res.response.data,
                isFetch: true
            })
        })
    }

    handleChangeEvent(event) {
        this.setState({ items_per_page: this.state.items_per_page = event.target.value });
        this.UsersPageData();
    }


    handleClick(event) {

        if (this.state.currentPage <= '' + event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
        const obj = {
            page_no: '' + event.target.id,
            items_per_page: this.state.items_per_page
        }
        let _this = this;
        this.props.usersPGData(obj).then(function (res) {
            _this.setState({
                paginationdata: res.response.data,
                isFetch: true
            })
        })

    }

    appData(data) {
        const id = data.id;
        this.props.history.push("/view/" + id);
    }

    documentData(data) {
        const id = data.id;
        this.props.history.push("/view-document/" + id);
    }

    

    editEmployeeData(id) {
        this.props.history.push("/create/" + id)
    }

    deleteUserData(data) {
        const obj = {
            employee_id: data.id,
            status: data.status == 1 ? 0 : 1
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to Inactive?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.props.blockUser(obj).then((res) => {
                    this.UsersPageData();
                })
            }
        })
    }

    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    handleChangegetAds(data, index) {
        if (data.ad_status == 1) {
            if (data.ad_id != null) {
                const obj = {
                    id: data.ad_id
                }
                this.props.activeAppAds(obj).then((res) => {
                    this.getApplicationPageData();
                })
            }
        } else {
            if (data.ad_id != null) {
                const obj = {
                    id: data.ad_id
                }
                this.props.InactiveAppAds(obj).then((res) => {
                    this.getApplicationPageData();
                })
            }
        }
    }

    handleScroll(event) {
        let element = event.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            // if (this.state.currentPage <= '' + event.target.id) {
            //     this.setState({
            //         currentPage: this.state.currentPage + 1
            //     })
            // } else {
            //     this.setState({
            //         currentPage: this.state.currentPage - 1
            //     })
            // }
            // const obj = {
            //     page_no: '' + event.target.id,
            //     items_per_page: this.state.items_per_page
            // }
            // let _this = this;
            // this.props.usersPGData(obj).then(function (res) {
            //     _this.setState({
            //         paginationdata: res.response.data,
            //         isFetch: true
            //     })
            // })
        }
    }

    searchEmployeeDataKeyUp(e) {
        const obj = {
            searchkey: e.target.value
        }
        this.props.searchUsersData(obj).then((res) => {
            this.setState({
                searchData: this.state.searchData = res.response.data,
                isData: this.state.isData = true
            })
        });
    }

    render() {
        let auth = this.props.auth.auth_data;
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
            pageNumbers.push(i);
        }
        var renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && this.state.currentPage === 1) {
                return (
                    <li
                        key={number}
                        id={number}
                        classNameName={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a classNameName="page-link" onClick={this.handleClick}>{number}</a>
                    </li>
                );
            }
            else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                return (
                    <li
                        key={number}
                        id={number}
                        classNameName={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a classNameName="page-link" id={number} onClick={this.handleClick}>{number}</a>
                    </li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    classNameName='page-item'
                >
                    <a
                        classNameName='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    classNameName='page-item'
                >
                    <a
                        classNameName='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        return (
            <div>
                {
                    checkRights('employee', 'read') == true ? (
                        <section className="employee_list_bg">
                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-10 welcome_list">
                                        <h1>Employee List</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center media-m">
                                    <div className="col-lg-10 action_bg">
                                        <div className="action_header">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-6 action_search">
                                                    <div className="input-group">
                                                        <input type="text"
                                                            className="form-control search-emp"
                                                            placeholder="Search Emp_ID"
                                                            onKeyUp={this.searchEmployeeDataKeyUp}
                                                        />
                                                        <div className="input-group-append">
                                                            <button className="btn" type="button">
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 action_box justify-content-end">
                                                    <div className="action_records">
                                                        <h4>Records Per Page</h4>
                                                    </div>
                                                    <div className="action_select">
                                                        <div className="form-group">
                                                            <Input
                                                                type="select"
                                                                className="selectpicker w-100"
                                                                style={{ height: '33px', marginTop: '4px' }}
                                                                onChange={this.handleChangeEvent}
                                                            >
                                                                <option value="10">10</option>
                                                                <option value="20">20</option>
                                                                <option value="30">30</option>
                                                                <option value="40">40</option>
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-10 back">
                                        <a href="/#/dashboard" className="btn">Back</a>
                                        <a href="/#/create" className="btn">Add</a>
                                        <a href="#" className="btn">Export</a>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center media-m">
                                    <div className="col-lg-10 list_bg">
                                        <div className="employee_details_heading">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_heading_action">
                                                    <h4>Action</h4>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_heading_name">
                                                    <h4>Employee Name</h4>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_heading_email">
                                                    <h4>Offical Email</h4>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_heading_phone">
                                                    <h4>Contact Number</h4>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_heading_status">
                                                    <h4>Status</h4>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.isData == false ? (
                                                <div>
                                                    {
                                                        this.state.paginationdata.length > 0 ? (
                                                            <div className="list_bg2" onScroll={this.handleScroll}>
                                                                {
                                                                    this.state.paginationdata.map((data, index) =>
                                                                        <div className="employee_details" key={index}>
                                                                            <div className="row">
                                                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                                                    <a onClick={() => this.editEmployeeData(data.id)}><i className="fas fa-pencil-alt"></i></a>
                                                                                    <a onClick={() => this.deleteUserData(data)}><i className="fas fa-trash-alt"></i></a>
                                                                                    <a onClick={() => this.appData(data)}><i className="fas fa-eye"></i></a>

                                                                                </div>
                                                                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                                                    <h4>{data.name}</h4>
                                                                                </div>
                                                                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                                                    <h4>{data.official_email}</h4>
                                                                                </div>
                                                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                                                    <h4>{data.contact_number}</h4>
                                                                                </div>
                                                                                {
                                                                                    data.status == 1 ? (
                                                                                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                                                            <span className="badge badge-pill badge-success">Active</span>
                                                                                        </div>
                                                                                    ) : (
                                                                                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                                                                <span className="badge badge-pill badge-danger">In Active</span>
                                                                                            </div>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        ) : (
                                                                null
                                                            )
                                                    }
                                                </div>
                                            ) : (
                                                    <div>
                                                        {
                                                            this.state.searchData.length > 0 ? (
                                                                <div className="list_bg2" onScroll={this.handleScroll}>
                                                                    {
                                                                        this.state.searchData.map((data, index) =>
                                                                            <div className="employee_details" key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                                                        <a onClick={() => this.editEmployeeData(data.id)}><i className="fas fa-pencil-alt"></i></a>
                                                                                        <a onClick={() => this.deleteUserData(data)}><i className="fas fa-trash-alt"></i></a>
                                                                                        <a onClick={() => this.appData(data)}><i className="fas fa-eye"></i></a>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                                                        <h4>{data.name}</h4>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                                                        <h4>{data.official_email}</h4>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                                                        <h4>{data.contact_number}</h4>
                                                                                    </div>
                                                                                    {
                                                                                        data.status == 1 ? (
                                                                                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                                                                <span className="badge badge-pill badge-success">Active</span>
                                                                                            </div>
                                                                                        ) : (
                                                                                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                                                                    <span className="badge badge-pill badge-danger">In Active</span>
                                                                                                </div>
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : (
                                                                    null
                                                                )
                                                        }
                                                    </div>
                                                )
                                        }



                                        {/* <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="employee_details">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 details_edit">
                                                        <a href="employee_form.html"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="#"><i className="fas fa-trash-alt"></i></a>
                                                        <a href="employee_details.html"><i className="fas fa-eye"></i></a>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_name">
                                                        <h4>Alina Mclourd sdfdsfsdfdsfdsfdsfdsfsdfsfsfsfsfsdfsfsf</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 employee_email">
                                                        <h4>alinamclourd dfgdfgg dfgdfgdfgdg sdfsfdsf@gmail.com</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_phone">
                                                        <h4>+91 99256 48985</h4>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 employee_status">
                                                        <span className="badge badge-pill badge-danger">In Active</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                    </div>
                                </div>
                            </div>


                        </section>
                        // <Row>
                        //     <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        //         <Card classNameName="main-card mb-3">
                        //             <CardHeader>
                        //                 <CardTitle
                        //                     classNameName="font"
                        //                 >
                        //                     Employees
                        //                         </CardTitle>
                        //             </CardHeader>
                        //             <CardBody>
                        //                 <div>
                        //                     <Row>
                        //                         <Col classNameName="searchA" md="12">
                        //                             <input
                        //                                 classNameName="form-control search"
                        //                                 style={{ marginLeft: '0px' }}
                        //                                 type="text"
                        //                                 placeholder="Search"
                        //                                 aria-label="Search"
                        //                                 onKeyUp={this.searchUserDataKeyUp}
                        //                             />
                        //                             <div classNameName="pull-right">
                        //                                 <Row>
                        //                                     <span style={{ marginTop: '8px' }}>Records per page</span>
                        //                                     <Col md="2">
                        //                                         <Input
                        //                                             type="select"
                        //                                             style={{ width: '76px' }}
                        //                                             id="rightid"
                        //                                             name="customSelect"
                        //                                             onChange={this.handleChangeEvent}
                        //                                         >
                        //                                             <option value="5">5</option>
                        //                                             <option value="10">10</option>
                        //                                             <option value="25">25</option>
                        //                                             <option value="50">50</option>
                        //                                             <option value="100">100</option>
                        //                                         </Input>
                        //                                     </Col>
                        //                                 </Row>
                        //                             </div>
                        //                         </Col>
                        //                     </Row>
                        //                 </div>
                        //                 <br />
                        //                 <div>
                        //                     {
                        //                         this.state.searchData.length > 0 ? (
                        //                             <div>
                        //                                 <Table hover classNameName="mb-0 table_responsive" bordered>
                        //                                     <thead>
                        //                                         <tr>
                        //                                             {
                        //                                                 checkRights('employee', 'delete') == true ? (
                        //                                                     <th>Action</th>
                        //                                                 ) : (null)
                        //                                             }
                        //                                             <th>Name</th>
                        //                                             <th>Personal_Email</th>
                        //                                             <th>Official_Email</th>
                        //                                             <th>Current_Address</th>
                        //                                             <th>Contact Number</th>
                        //                                         </tr>
                        //                                     </thead>
                        //                                     <tbody>
                        //                                         {
                        //                                             this.state.searchData.map((data, index) =>
                        //                                                 <tr key={index}>
                        //                                                     {
                        //                                                         checkRights('employee', 'delete') == true ? (
                        //                                                             <td classNameName="action">
                        //                                                                 <span classNameName="padding">
                        //                                                                     <i classNameName="fa fa-remove fa-lg" onClick={() => this.deleteUserData(data)}></i>
                        //                                                                 </span>
                        //                                                             </td>
                        //                                                         ) : (null)
                        //                                                     }
                        //                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.name}</td>
                        //                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.personal_email}</td>
                        //                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.official_email}</td>
                        //                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.current_address}</td>
                        //                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.contact_number}</td>
                        //                                                     {/* <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.current_address}</td> */}
                        //                                                     {/* <td onClick={() => this.appData(data)}>
                        //                                                         <div classNameName="btn_size">
                        //                                                             {
                        //                                                                 data.status == 1 ? (
                        //                                                                     <span classNameName="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                        //                                                                 ) : (
                        //                                                                         <span classNameName="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                        //                                                                     )
                        //                                                             }
                        //                                                         </div>
                        //                                                     </td> */}
                        //                                                 </tr>
                        //                                             )
                        //                                         }
                        //                                     </tbody>
                        //                                 </Table>
                        //                             </div>
                        //                         ) : (
                        //                                 <div>
                        //                                     {
                        //                                         this.state.paginationdata ? (
                        //                                             <div>
                        //                                                 <Table hover classNameName="mb-0 table_responsive" bordered>
                        //                                                     <thead>
                        //                                                         <tr>
                        //                                                             {
                        //                                                                 checkRights('employee', 'delete') == true ? (
                        //                                                                     <th>Action</th>
                        //                                                                 ) : (null)
                        //                                                             }
                        //                                                             <th>Name</th>
                        //                                                             <th>Personal_Email</th>
                        //                                                             <th>Official_Email</th>
                        //                                                             <th>Current_Address</th>
                        //                                                             <th>Contact Number</th>
                        //                                                         </tr>
                        //                                                     </thead>
                        //                                                     <tbody>
                        //                                                         {
                        //                                                             this.state.paginationdata.map((data, index) =>
                        //                                                                 <tr key={index}>
                        //                                                                     {
                        //                                                                         checkRights('employee', 'delete') == true ? (
                        //                                                                             <td classNameName="action">
                        //                                                                                 <span classNameName="padding">
                        //                                                                                     <i classNameName="fa fa-remove fa-lg" onClick={() => this.deleteUserData(data)}></i>
                        //                                                                                 </span>
                        //                                                                             </td>
                        //                                                                         ) : (null)
                        //                                                                     }

                        //                                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.name}</td>
                        //                                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.personal_email}</td>
                        //                                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.official_email}</td>
                        //                                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.current_address}</td>
                        //                                                                     <td onClick={() => this.appData(data)} style={{ wordBreak: ' break-all' }}>{data.contact_number}</td>
                        //                                                                     {/* <td onClick={() => this.appData(data)}>
                        //                                                                         <div classNameName="btn_size">
                        //                                                                             {
                        //                                                                                 data.status == 1 ? (
                        //                                                                                     <span classNameName="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                        //                                                                                 ) : (
                        //                                                                                         <span classNameName="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                        //                                                                                     )
                        //                                                                             }
                        //                                                                         </div>
                        //                                                                     </td> */}
                        //                                                                 </tr>
                        //                                                             )
                        //                                                         }
                        //                                                     </tbody>
                        //                                                 </Table>
                        //                                                 {
                        //                                                     this.state.paginationdata ? (
                        //                                                         <div>
                        //                                                             <ul classNameName="pagination" id="page-numbers">
                        //                                                                 {pageDecrementBtn}
                        //                                                                 {renderPageNumbers}
                        //                                                                 {pageIncrementBtn}
                        //                                                             </ul>
                        //                                                         </div>
                        //                                                     ) : (
                        //                                                             <Table hover classNameName="mb-0" bordered>
                        //                                                                 <thead>
                        //                                                                     <tr>
                        //                                                                         <th classNameName="action">Action</th>
                        //                                                                         <th>Name</th>
                        //                                                                         <th>Personal_Email</th>
                        //                                                                         <th>Official_Email</th>
                        //                                                                         <th>Current_Address</th>
                        //                                                                         <th>Contact Number</th>
                        //                                                                     </tr>
                        //                                                                 </thead>
                        //                                                                 <tbody>

                        //                                                                 </tbody>
                        //                                                             </Table>
                        //                                                         )
                        //                                                 }
                        //                                                 {/* <div>
                        //                             showing {this.state.onClickPage} to {this.state.render_per_page} of {this.state.count} entries
                        //                         </div> */}
                        //                                             </div>
                        //                                         ) : (
                        //                                                 null
                        //                                             )
                        //                                     }
                        //                                 </div>
                        //                             )
                        //                     }
                        //                 </div>
                        //             </CardBody>
                        //         </Card>
                        //     </Col>
                        // </Row>
                    ) : (null)
                }
            </div>
        );
    }
}

export default ListEmployee;
