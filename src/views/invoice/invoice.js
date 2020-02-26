import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import TableApp from '../Tables/tableapp';
import App_List from '../Tables/app_list';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import './invoice.css';
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

class Invoice extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            flag: 1,
            rightdata: '',
            biller_name: '',
            biller_name_error: '',
            address_1: '',
            address_1_error: '',
            address_2: '',
            address_2_error: '',
            item_name: '',
            item_name_error: '',
            description: '',
            description_error: '',
            unit_cost: '',
            unit_cost_error: '',
            qty: '',
            qty_error: '',
            amount: '',
            amount_error: '',
            gst_number: '',
            gst_number_error: '',
            tax: '',
            tax_error: '',
            items: [],
            isDisplay: false,
            invoice_id: '',
            callFunction: false,
            modal: false,
            created_date: new Date(),
            fulltotal: '',
            mainItems: '',
            subtotal: '',
            main_total: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.create = this.create.bind(this);
        this.add = this.add.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handlePdf = this.handlePdf.bind(this);
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

    handleChange(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(...state, state);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    validate() {
        let biller_name_error = "";
        let address_1_error = "";
        let item_name_error = "";
        // let description_error = "";
        let unit_cost_error = "";
        let qty_error = "";
        let amount_error = "";
        // let gst_number_error = "";
        // let tax_error = "";

        if (!this.state.biller_name) {
            biller_name_error = "please enter biler name";
        }

        if (!this.state.address_1) {
            address_1_error = "please enter address";
        }

        if (!this.state.item_name) {
            item_name_error = "please enter item name";
        }

        // if (!this.state.description) {
        //     description_error = "please enter description";
        // }

        if (!this.state.unit_cost) {
            unit_cost_error = "please enter unit cost";
        }

        if (!this.state.qty) {
            qty_error = "please enter qty";
        }

        if (!this.state.amount) {
            amount_error = "please enter amount";
        }

        // if (!this.state.gst_number) {
        //     gst_number_error = "please enter gst number";
        // }

        // if (!this.state.tax) {
        //     tax_error = "please enter tax";
        // }



        if (biller_name_error || address_1_error || item_name_error || unit_cost_error || qty_error || amount_error) {
            this.setState({ biller_name_error, address_1_error, item_name_error, unit_cost_error, qty_error, amount_error });
            return false;
        }
        return true;
    };

    validate1() {
        let item_name_error = "";
        let unit_cost_error = "";
        let qty_error = "";
        let amount_error = "";

        if (!this.state.item_name) {
            item_name_error = "please enter item name";
        }

        if (!this.state.unit_cost) {
            unit_cost_error = "please enter unit cost";
        }

        if (!this.state.qty) {
            qty_error = "please enter qty";
        }

        if (!this.state.amount) {
            amount_error = "please enter amount";
        }

        if (item_name_error || unit_cost_error || qty_error || amount_error) {
            this.setState({ item_name_error, unit_cost_error, qty_error, amount_error });
            return false;
        }
        return true;
    };

    create() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                biller_name_error: '',
                address_1_error: '',
                item_name_error: '',
                unit_cost_error: '',
                qty_error: '',
                amount_error: ''
            })

            if (this.state.biller_name && this.state.address_1 && this.state.item_name && this.state.qty && this.state.amount && this.state.unit_cost) {
                if (this.state.isDisplay == false) {
                    const item = [];
                    item.push({
                        item_name: this.state.item_name,
                        description: this.state.description,
                        unit_cost: this.state.unit_cost,
                        qty: this.state.qty,
                        amount: this.state.amount
                    })
                    const obj = {
                        biller_name: this.state.biller_name,
                        address_1: this.state.address_1,
                        address_2: this.state.address_2,
                        items: item,
                        gst_number: this.state.gst_number,
                        tax: this.state.tax
                    }
                    this.props.createInvoice(obj).then((res) => {
                        if (res.response.status == 1) {
                            this.setState({
                                invoice_id: this.state.invoice_id = res.response.data.id,
                                callFunction: this.state.callFunction = true
                            })
                            if (this.state.callFunction == true) {
                                const maindata = {
                                    invoice_id: this.state.invoice_id
                                }
                                this.props.getInvoice(maindata).then((res) => {
                                    var itemdata = JSON.parse(res.response.data.items);
                                    this.setState({
                                        mainItems: this.state.mainItems = itemdata
                                    })
                                    var sum = 0;
                                    for (var i = 0; i < this.state.mainItems.length; i++) {
                                        sum += (parseInt(this.state.mainItems[i].unit_cost) * parseInt(this.state.mainItems[i].qty));
                                    }
                                    this.setState({
                                        subtotal: this.state.subtotal = sum
                                    })
                                    var currentDate = this.state.created_date;
                                    var date = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                                    var total = +this.state.subtotal + +res.response.data.tax;
                                    this.setState({
                                        main_total: this.state.main_total = total
                                    })
                                    if (res.response.status == 1) {
                                        this.setState({
                                            biller_name: this.state.biller_name = res.response.data.biller_name,
                                            address_1: this.state.address_1 = res.response.data.address_1,
                                            address_2: this.state.address_2 = res.response.data.address_2,
                                            item_name: this.state.item_name = itemdata[0].item_name,
                                            unit_cost: this.state.unit_cost = itemdata[0].unit_cost,
                                            qty: this.state.qty = itemdata[0].qty,
                                            amount: this.state.amount = itemdata[0].amount,
                                            description: this.state.description = itemdata[0].description,
                                            invoice_number: this.state.invoice_number = res.response.data.invoice_number,
                                            gst_number: this.state.gst_number = res.response.data.gst_number,
                                            created_date: this.state.created_date = date,
                                            tax: this.state.tax = res.response.data.tax
                                        })
                                        this.setState({
                                            modal: this.state.modal = true
                                        });
                                    } else {
                                        Swal.fire({
                                            text: res.response.message,
                                            icon: 'warning'
                                        });
                                    }
                                })
                            }
                            Swal.fire({
                                text: res.response.message,
                                icon: 'success'
                            });
                        } else {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'warning'
                            });
                        }
                    });
                } else {
                    const obj = {
                        biller_name: this.state.biller_name,
                        address_1: this.state.address_1,
                        address_2: this.state.address_2,
                        items: this.state.items,
                        gst_number: this.state.gst_number,
                        tax: this.state.tax
                    }
                    this.props.createInvoice(obj).then((res) => {
                        if (res.response.status == 1) {
                            this.setState({
                                invoice_id: this.state.invoice_id = res.response.data.id,
                                callFunction: this.state.callFunction = true
                            })
                            if (this.state.callFunction == true) {
                                const maindata = {
                                    invoice_id: this.state.invoice_id
                                }
                                this.props.getInvoice(maindata).then((res) => {
                                    var itemdata = JSON.parse(res.response.data.items);
                                    this.setState({
                                        mainItems: this.state.mainItems = itemdata
                                    })
                                    var sum = 0;
                                    for (var i = 0; i < this.state.mainItems.length; i++) {
                                        sum += (parseInt(this.state.mainItems[i].unit_cost) * parseInt(this.state.mainItems[i].qty));
                                    }
                                    this.setState({
                                        subtotal: this.state.subtotal = sum
                                    })
                                    var currentDate = this.state.created_date;
                                    var date = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                                    var total = +this.state.subtotal + +res.response.data.tax;
                                    this.setState({
                                        main_total: this.state.main_total = total
                                    })
                                    if (res.response.status == 1) {
                                        this.setState({
                                            biller_name: this.state.biller_name = res.response.data.biller_name,
                                            address_1: this.state.address_1 = res.response.data.address_1,
                                            address_2: this.state.address_2 = res.response.data.address_2,
                                            item_name: this.state.item_name = itemdata[0].item_name,
                                            unit_cost: this.state.unit_cost = itemdata[0].unit_cost,
                                            qty: this.state.qty = itemdata[0].qty,
                                            amount: this.state.amount = itemdata[0].amount,
                                            description: this.state.description = itemdata[0].description,
                                            invoice_number: this.state.invoice_number = res.response.data.invoice_number,
                                            gst_number: this.state.gst_number = res.response.data.gst_number,
                                            created_date: this.state.created_date = date,
                                            tax: this.state.tax = res.response.data.tax
                                        })
                                        this.setState({
                                            modal: this.state.modal = true
                                        });
                                    } else {
                                        Swal.fire({
                                            text: res.response.message,
                                            icon: 'warning'
                                        });
                                    }
                                })
                            }
                            Swal.fire({
                                text: res.response.message,
                                icon: 'success'
                            });
                        } else {
                            Swal.fire({
                                text: res.response.message,
                                icon: 'warning'
                            });
                        }
                    });
                }


            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        }
    }

    /** Order pdf generate */
    handlePdf() {
        let page = document.getElementById('page');
        html2PDF(page, {
            jsPDF: {
                unit: 'pt',
                format: 'a4'
            },
            imageType: 'image/jpeg',
            output: 'invoice.pdf'
        });
        // const input = document.getElementById('page');
        // html2canvas(input)
        //     .then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png');
        //         const pdf = new jsPDF('p', 'px', 'a4');
        //         const width = pdf.internal.pageSize.getWidth();
        //         const height = pdf.internal.pageSize.getHeight();
        //         pdf.addImage(imgData, 'JPEG', 0, 0, height, width);
        //         pdf.save("INVOICE.pdf");
        //     });
    };

    add() {
        const isValid = this.validate1();
        if (isValid) {
            this.setState({
                item_name_error: '',
                unit_cost_error: '',
                qty_error: '',
                amount_error: '',
            })

            if (this.state.item_name && this.state.unit_cost && this.state.qty && this.state.amount) {
                var itemArray = {
                    item_name: this.state.item_name,
                    unit_cost: this.state.unit_cost,
                    qty: this.state.qty,
                    amount: this.state.amount,
                    description: this.state.description
                }
                this.setState({
                    items: this.state.items = [...this.state.items, itemArray],
                    isDisplay: this.state.isDisplay = true
                })
                console.log("items", this.state.items);
            }
        }
    }

    render() {

        return (
            <div>
                <section>
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-10 welcome_list">
                                <h1>Invoice Details</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-center media-m">
                            <div className="col-lg-10 bg_invoice" style={{ backgroundColor: '#fff' }}>
                                <form name="contactForm" method="post" role="form">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 invoice_form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="biller_name"
                                                    onChange={this.handleChange}
                                                    id="name"
                                                    placeholder="Enter Biller Name"
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.biller_name_error}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 invoice_form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address_1"
                                                    onChange={this.handleChange}
                                                    id="address"
                                                    placeholder="Enter Address"
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.address_1_error}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 invoice_form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address_2"
                                                    onChange={this.handleChange}
                                                    id=""
                                                    placeholder="Enter Address"
                                                />
                                                {/* <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.address_error}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="biller">
                                        <div className="row biller_bg">
                                            <div className="col-md-6 col-lg-6 invoice_form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="item_name"
                                                        onChange={this.handleChange}
                                                        id="item_name"
                                                        placeholder="Your item Name"
                                                    />
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.item_name_error}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 invoice_form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="description"
                                                        onChange={this.handleChange}
                                                        id="description"
                                                        placeholder="Description"
                                                    />
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.description_error}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4 invoice_form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="unit_cost"
                                                        onChange={this.handleChange}
                                                        id="unit_cost"
                                                        placeholder="Enter Unit Cost"
                                                    />
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.unit_cost_error}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4 invoice_form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="qty"
                                                        onChange={this.handleChange}
                                                        id="qty"
                                                        placeholder="Enter Qty/Hr Rate"
                                                    />
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.qty_error}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4 invoice_form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="amount"
                                                        onChange={this.handleChange}
                                                        id="amount"
                                                        placeholder="Enter Amount"
                                                    />
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.amount_error}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.items.length > 0 ? (
                                            <div>
                                                {
                                                    this.state.items.map((data, index) =>
                                                        <div id="biller" key={index}>
                                                            <div className="row biller_bg">
                                                                <div className="col-md-6 col-lg-6 invoice_form">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="item_name"
                                                                            onChange={this.handleChange}
                                                                            id="item_name"
                                                                            placeholder="Your item Name"
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.item_name_error}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 invoice_form">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="description"
                                                                            onChange={this.handleChange}
                                                                            id="description"
                                                                            placeholder="Description"
                                                                        />

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-lg-4 invoice_form">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="unit_cost"
                                                                            onChange={this.handleChange}
                                                                            id="unit_cost"
                                                                            placeholder="Enter Unit Cost"
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.unit_cost_error}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-lg-4 invoice_form">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="qty"
                                                                            onChange={this.handleChange}
                                                                            id="qty"
                                                                            placeholder="Enter Qty/Hr Rate"
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.qty_error}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-lg-4 invoice_form">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="amount"
                                                                            onChange={this.handleChange}
                                                                            id="amount"
                                                                            placeholder="Enter Amount"
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.amount_error}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        ) : (
                                                null
                                            )
                                    }
                                    <div className="row">
                                        <div className="col-lg-12 addmore">
                                            <a className="btn add-more" onClick={this.add} style={{ color: '#fff' }}><i className="fas fa-plus"></i>Add More</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 invoice_form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="tax"
                                                    onChange={this.handleChange}
                                                    id=""
                                                    placeholder="Enter Tax %"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 invoice_form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="gst_number"
                                                    onChange={this.handleChange}
                                                    id=""
                                                    placeholder="Enter GST Number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 submit">
                                            <button
                                                name="submit"
                                                type="button"
                                                id="submit"
                                                className="btn"
                                                onClick={this.create}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    <Modal isOpen={this.state.modal}>
                                        <ModalHeader>INVOICE</ModalHeader>
                                        <ModalBody id="page" style={{ color: 'black', background: 'white' }}>

                                            <div className="row bg-header">
                                                <div className="col-lg-5 logo">
                                                    <h1>RK WebTechnology</h1>
                                                    <h2>INVOICE</h2>
                                                </div>
                                                <div className="col-lg-4 contact_details justify-content-end text-right">
                                                    <h5>+91 87587 37527</h5>
                                                    <h5>info@rkwebtechnology.com</h5>
                                                    <h5>www.rkwebtechnology.com</h5>
                                                </div>
                                                <div className="col-lg-3 address justify-content-end text-right">
                                                    <h5>413, Anmol Complex, <br />Opp. Raj Place, <br /> Sadhu Vasvani Road, <br />Rajkot, Gujarat - 360005</h5>
                                                </div>
                                            </div>

                                            <div className="row bill_heading">
                                                <div className="col-lg-5 billed_to">
                                                    <h6>Billed To</h6>
                                                    <h5>{this.state.biller_name}</h5>
                                                    <h5>{this.state.address_1}</h5>
                                                    <h5>{this.state.address_2}</h5>
                                                </div>
                                                <div className="row col-lg-3">
                                                    <div className="col-lg-12 invoice_number">
                                                        <h6>Invoice Number</h6>
                                                        <h5>{this.state.invoice_number}</h5>
                                                    </div>
                                                    <div className="col-lg-12 invoice_number">
                                                        <h6>Date of Issue</h6>
                                                        <h5>{this.state.created_date}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 invoice_total text-right">
                                                    <h6>Invoice Total</h6>
                                                    <h2>${this.state.main_total}</h2>
                                                </div>
                                            </div>

                                            <div className="row invoice_heading">
                                                <div className="col-lg-6">
                                                    <h6>Description</h6>
                                                </div>
                                                <div className="col-lg-2 text-right">
                                                    <h6>Unit Cost</h6>
                                                </div>
                                                <div className="col-lg-2 text-right">
                                                    <h6>Qty/Hr Rate</h6>
                                                </div>
                                                <div className="col-lg-2 text-right">
                                                    <h6>Amount</h6>
                                                </div>
                                            </div>
                                            {
                                                this.state.mainItems.length > 0 ? (
                                                    <div>
                                                        {
                                                            this.state.mainItems.map((data, index) =>
                                                                <div className="row invoice" key={index}>
                                                                    <div className="col-lg-6">
                                                                        <h5>{data.item_name}</h5>
                                                                        <h6>{data.description}</h6>
                                                                    </div>
                                                                    <div className="col-lg-2 text-right">
                                                                        <h6>${data.unit_cost}</h6>
                                                                    </div>
                                                                    <div className="col-lg-2 text-right">
                                                                        <h6>{data.qty}</h6>
                                                                    </div>
                                                                    <div className="col-lg-2 text-right">
                                                                        <h6>{data.unit_cost * data.qty}</h6>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                ) : (
                                                        null
                                                    )
                                            }
                                            <div className="row justify-content-end subtotal_main">
                                                <div className="col-lg-3 sub_total">
                                                    <h5>Subtotal</h5>
                                                </div>
                                                <div className="col-lg-2 sub_total">
                                                    <h6>${this.state.subtotal}</h6>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end subtotal_main">
                                                <div className="col-lg-3 sub_total">
                                                    <h5>Tax</h5>
                                                </div>
                                                <div className="col-lg-2 sub_total">
                                                    <h6>${this.state.tax}</h6>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end subtotal_main">
                                                <div className="col-lg-3 sub_total">
                                                    <h5>Total</h5>
                                                </div>
                                                <div className="col-lg-2 sub_total">
                                                    <h6>${this.state.main_total}</h6>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end subtotal_main">
                                                <div className="col-lg-3 sub_total">
                                                    <h5>Amount Due (USD)</h5>
                                                </div>
                                                <div className="col-lg-2 sub_total">
                                                    <h6>${this.state.main_total}</h6>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-lg-12 footer">
                                                    <h4>Powered by RK WebTechnology</h4>
                                                    <h5>This is system generated invoice</h5>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.handlePdf}>Download</Button>
                                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Invoice;