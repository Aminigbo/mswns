import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashHeader from '../Components/DashHeader'
import { PiExportBold } from "react-icons/pi";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { IoFilterOutline } from "react-icons/io5";
import { CircularProgress, colors } from '@mui/material';
import { connect } from 'react-redux';
import { FetchAttendance, FetchMarkersInvoice, SignAttendance, fetchAllInvoicesByBranch, fetchAllInvoicesBySalesRep } from '../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../redux/state/action';
import { NumberWithCommas, formatDate } from '../utils';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../Components/admin-sidebar';
import MarketerSidebar from '../Components/marketer-sidebar';



const Marketerdashboard = ({
    appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
    const User = appState.User;
    const SavedInvoices = appState.SavedInvoices
    // const SavedInvoices = []

    const [loading, setloading] = React.useState(false)
    const [amount_Array, setamount_Array] = React.useState([])
    const [AttendanceData, setAttendanceData] = React.useState([])
    const navigate = useNavigate();

    const amountSold = SavedInvoices && SavedInvoices.length > 0 ? SavedInvoices.filter(e => e.paid == true).reduce((acc, item) => acc + parseInt(item.amount), 0) : 0;


    function GetAttendance() {
        setloading(true)
        FetchAttendance(User.name)
            .then(response => {
                setAttendanceData(response.data)
                setloading(false)
            })
            .catch(error => {
                setloading(false)
            })
    }

    const today = new Date();

    // Get the day, month, and year
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;


    // Create a new Date object for the current date and time
    const now = new Date();

    // Get the hours, minutes, and determine AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the time as h:mmam/pm
    const formattedTime = `${hours}:${minutes}${ampm}`;




    function SignAttendanceCon() {
        setloading(true)
        SignAttendance({
            date: formattedDate,
            month: month,
            year: new Date().getFullYear(),
            time: formattedTime,
            user: User.name
        })
            .then(response => {
                GetAttendance()
            })
            .catch(error => {
                setloading(false)
            })
    }



    function FetchInvoices() {
        setloading(true)
        FetchMarkersInvoice(User.name)
            .then(response => {
                setloading(false)
                if (!response.error) {
                    disp_savedInvoice(response.data)
                } else {
                    alert(response.error.message)
                    disp_savedInvoice([])
                }

            })
            .catch(error => {
                setloading(false)
                disp_savedInvoice([])
            })
    }


    React.useEffect(() => {
        FetchInvoices()
        GetAttendance()

        if (SavedInvoices.length > 0) {
            let amountArray = []
            for (let i = 0; i < SavedInvoices.length; i++) {
                const element = SavedInvoices[i];
                amountArray.push(element.amount)

            }
            setamount_Array(amountArray)
        }
    }, [])



    return (
        <div>
            {/* {console.log(formattedDate)} */}

            {loading && <div style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                backgroundColor: "rgb(0,0,0,0.8)",
                zIndex: 100,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }} >
                <CircularProgress />
                <spam style={{ color: "white" }} >Please wait.....</spam>
            </div>}

            <section className='main-dash'>

                <MarketerSidebar />

                <div className='main'>
                    <DashHeader User={User} />

                    <div className="first">

                        <div className="first-l">

                            <div className="first-l-top">
                                <div>
                                    <h3>Today’s Sales</h3>
                                    <p>Sales Summary</p>
                                </div>

                                {/* <span className='export'>
                  <PiExportBold className='e-i' />
                  export

                </span> */}

                            </div>

                            <div className="first-l-cards" style={{ zIndex: 1 }}>

                                <div className="first-l-card" style={{ backgroundColor: '#FFE2E5', wordWrap: "break-word" }}>
                                    <div>
                                        <span style={{ backgroundColor: '#FA5A7D' }}>
                                            <BsFileBarGraphFill className='c-i' />
                                        </span>
                                        <h2>₦{NumberWithCommas(amountSold)}</h2>
                                        <h6>Total Sales from Ref.</h6>
                                        {/* <p>+8% from yesterday</p> */}
                                    </div>

                                </div>
                                <div className="first-l-card" style={{ backgroundColor: '#FFF4DE' }}>
                                    <div>
                                        <span style={{ backgroundColor: '#FF947A' }}>
                                            <BiSolidReceipt className='c-i' />
                                        </span>
                                        <h2>{SavedInvoices && SavedInvoices.length}</h2>
                                        <h6>Total Quotes from Ref.</h6>
                                        {/* <p>+5% from yesterday</p> */}
                                    </div>
                                </div>

                                <div className="first-l-card" style={{ backgroundColor: '#DCFCE7' }}>
                                    <div>
                                        <span style={{ backgroundColor: '#3CD856' }}>
                                            <IoIosPricetags className='c-i' />
                                        </span>
                                        <h2>{SavedInvoices && SavedInvoices.filter(e => e.paid == true).length}</h2>
                                        <h6>Product Sold from Ref.</h6>
                                        {/* <p>+1.2% from yesterday</p> */}

                                    </div>
                                </div>


                                <div className="first-l-card" style={{ backgroundColor: '#F3E8FF' }}>
                                    <div>
                                        <span style={{ backgroundColor: '#BF83FF' }}>
                                            <FaUserPlus className='c-i' />
                                        </span>
                                        <h2>{SavedInvoices && SavedInvoices.length}</h2>
                                        <h6>Ref. Customers</h6>
                                        {/* <p>+0.5% from yesterday</p> */}
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="first-r" style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 7,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                        }} >
                            <p>Attendance</p>
                            <div style={{
                                // justifyContent: "flex-start",
                                alignItems: "center",
                                display: "flex",
                                // flexDirection: "row-reverse",
                                flexWrap: "wrap"
                            }}>


                                {AttendanceData.slice(-29).map((item, index) => {
                                    return <div key={index} style={{
                                        padding: "5px",
                                        backgroundColor: item.date == formattedDate ? "lightblue" : "lightgrey",
                                        borderRadius: "6px",
                                        fontSize: "8px",
                                        margin: 3, display: "inline-block",
                                        width: "50px"
                                    }}>{item.date}</div>
                                })}
                                <br /><br />


                            </div>

                            {loading && AttendanceData.filter(e => e.date == formattedDate).length < 1 &&
                                <div
                                    onClick={() => {
                                        SignAttendanceCon()
                                    }}
                                    style={{
                                        marginTop: 10,
                                        padding: "15px",
                                        backgroundColor: "#000",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                        width: "80%",
                                        color: "#fff", textAlign: "center",
                                        cursor: "pointer"
                                    }}>Sign Today</div>
                            }
                        </div>

                    </div>



                    <div className="product">
                        <div className="top">
                            <h3>Downline</h3>

                            <div>

                            </div>

                        </div>

                        <table style={{ width: "100%" }} >
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Item(s)</th>
                                <th>Rep</th>
                                <th>Date</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>

                            {SavedInvoices && SavedInvoices.map((item, index) => {
                                return <tr className='t-row'>

                                    <td>{item.invoiceID.slice(-4)}</td>
                                    <td>₦{NumberWithCommas(item.amount)}</td>
                                    <td>{item.product.length}</td>
                                    <td>{item.generated_by}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td className='av' style={{ color: item.paid == true ? "green" : "crimson", textAlign: 'start' }} >{item.paid == true ? "PAID" : "NOT PAID"}</td>
                                    {/* <td
                    onClick={() => {
                      disp_invoice_products({
                        invoiceID: item.invoiceID
                      })
                      disp_view_invoice(true)
                      navigate("/invoice")
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#252C58", 
                      fontWeight: 700,
                      textAlign: "center"
                    }} >View <FaArrowAltCircleRight /> </td> */}

                                </tr>
                            })}


                        </table>


                    </div>


                </div>

            </section>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_savedInvoice: (payload) => dispatch(Saved_invoices(payload)),
        disp_invoice_products: (payload) => dispatch(Invoice_Product(payload)),
        disp_view_invoice: (payload) => dispatch(View_invoice(payload)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Marketerdashboard);
