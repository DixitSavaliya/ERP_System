import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import TableApp from '../Tables/tableapp';
import App_List from '../Tables/app_list';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import './salaryslip.css';
import checkRights from '../../rights';
import html2PDF from 'jspdf-html2canvas';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
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
import Auth from '../../redux/Auth';

class SalarySlip extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
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
        EventEmitter.subscribe('isDisplay', (value) => {
            this.setState({ isDisplay: this.state.isDisplay = true });
        });
    }



    render() {

        return (
            <div>
                <section class="bg_invoice">

                    <div class="container">
                        <div class="row bg-header">
                            <div class="col-lg-2 logo">
                                <img src="images/logo.png" alt="Logo" class="img-fluid" />
                            </div>
                            <div class="col-lg-10 address justify-content-end text-center">
                                <h2>RK WebTechnology</h2>
                                <h5>413, Anmol Complex, Opp. Raj Place, Sadhu Vasvani Road, Rajkot, Gujarat - 360005</h5>
                            </div>
                            <div class="col-lg-12 slip">
                                <h5>Slip for the month of Feb/2019</h5>
                            </div>
                        </div>

                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 salary_slip">
                                <div class="row">
                                    <div class="col-lg-4 slip_title">
                                        <h5>Emp ID</h5>
                                    </div>
                                    <div class="col-lg-8 slip_detail">
                                        <h5>16</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 slip_title">
                                        <h5>PF. No.</h5>
                                    </div>
                                    <div class="col-lg-8 slip_detail">
                                        <h5>KN/45889/1016</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 slip_title">
                                        <h5>Department</h5>
                                    </div>
                                    <div class="col-lg-8 slip_detail">
                                        <h5>Manufacturing</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 slip_title">
                                        <h5>PAN</h5>
                                    </div>
                                    <div class="col-lg-8 slip_detail">
                                        <h5>JOPPL8989S</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 salary_slip">
                                <div class="row">
                                    <div class="col-lg-5 slip_title">
                                        <h5>Employee Name</h5>
                                    </div>
                                    <div class="col-lg-7 slip_detail">
                                        <h5>SANDHYA</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 slip_title">
                                        <h5>Designation</h5>
                                    </div>
                                    <div class="col-lg-7 slip_detail">
                                        <h5>Operator</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 slip_title">
                                        <h5>A/c No</h5>
                                    </div>
                                    <div class="col-lg-7 slip_detail">
                                        <h5>sb-1041</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 slip_title">
                                        <h5>Mode of Pay</h5>
                                    </div>
                                    <div class="col-lg-7 slip_detail">
                                        <h5>State Bank of India</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="row earning_label">
                                    <div class="col-lg-4">
                                        <h5>Earnings</h5>
                                    </div>
                                    <div class="col-lg-4 amount_heading">
                                        <h5>Rate</h5>
                                    </div>
                                    <div class="col-lg-4">
                                        <h5>Amount</h5>
                                    </div>
                                </div>
                                <div class="row earning_value">
                                    <div class="col-lg-4">
                                        <h5>BASIC</h5>
                                        <h5>DA</h5>
                                        <h5>HRA</h5>
                                        <h5>CONV</h5>
                                        <h5>SPL ALLOW</h5>
                                    </div>
                                    <div class="col-lg-4 amount_heading">
                                        <h5>20,000.00</h5>
                                        <h5>4,000.00</h5>
                                        <h5>9,600.00</h5>
                                        <h5>800.00</h5>
                                        <h5>5,600.00</h5>
                                    </div>
                                    <div class="col-lg-4">
                                        <h5>20,000.00</h5>
                                        <h5>4,000.00</h5>
                                        <h5>9,600.00</h5>
                                        <h5>800.00</h5>
                                        <h5>5,600.00</h5>
                                    </div>
                                </div>
                                <div class="row earning_label">
                                    <div class="col-lg-4">
                                        <h5>Total</h5>
                                    </div>
                                    <div class="col-lg-4 amount_heading">
                                        <h5>40,000.00</h5>
                                    </div>
                                    <div class="col-lg-4">
                                        <h5>40,000.00</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="row earning_label">
                                    <div class="col-lg-6">
                                        <h5>Deductions</h5>
                                    </div>
                                    <div class="col-lg-6 deductions_heading">
                                        <h5>Amount</h5>
                                    </div>
                                </div>
                                <div class="row earning_value">
                                    <div class="col-lg-6 ">
                                        <h5>PF</h5>
                                    </div>
                                    <div class="col-lg-6 pf_heading">
                                        <h5>20,000.00</h5>
                                    </div>
                                </div>
                                <div class="row earning_label">
                                    <div class="col-lg-6">
                                        <h5>Total</h5>
                                    </div>
                                    <div class="col-lg-6 pf_total_heading">
                                        <h5>7,122.00</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 net_pay">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <h5>Net Pay</h5>
                                    </div>
                                    <div class="col-lg-3 ml">
                                        <h5>32,878.00</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3">
                                        <h5>In Words</h5>
                                    </div>
                                    <div class="col-lg-7 ml">
                                        <h5>Rupees Thirty Two Thousand Eight Hundred Seventy Eight Only</h5>
                                    </div>
                                    <div class="col-lg-2 text-center signature">
                                        <h5>Signature</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 footer">
                                <h5>This is a computer generated payslip</h5>
                            </div>
                        </div>
                    </div>


                </section>
            </div>
        );
    }
}

export default SalarySlip;