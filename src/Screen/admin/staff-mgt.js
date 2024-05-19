import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import DashHeader from '../../Components/DashHeader'
import { PiExportBold } from "react-icons/pi";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaDeleteLeft, FaUserPlus } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { IoFilterOutline } from "react-icons/io5";
import { Backdrop, Box, CircularProgress, Divider, Fade, Modal, colors } from '@mui/material';
import { connect } from 'react-redux';
import { AdminDeleteInvoice, deleteInvoice, fetchAllInvoicesAdmin, fetchAllInvoicesBySalesRep, fetchStaffLeave, fetchStaffsModel } from '../../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../../redux/state/action';
import { Notify, NumberWithCommas, formatDate } from '../../utils';
import { FaArrowAltCircleRight, FaPrint, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../../Components/admin-sidebar';
import t1 from '../../images/t1.png'
import t2 from '../../images/t2.png'
import t3 from '../../images/t3.png'
import t4 from '../../images/t4.png'
import t5 from '../../images/t5.png'
import t6 from '../../images/t6.png'
import d1 from '../../images/d1.png'
import d2 from '../../images/d2.png'
import d3 from '../../images/d3.png'
import d4 from '../../images/d4.png'
import sun from '../../images/sun.png'
import { LoadingButton } from '@mui/lab';
import { ChangePasswordModel } from '../../service/api-service';




const Staffmgt = ({
    appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
    const User = appState.User;
    const InvoiceProducts = appState.AllInvoiceProducts
    const SavedInvoices = appState.SavedInvoices;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [staffs, setstaffs] = React.useState([])
    const [password, setPassword] = React.useState("");
    const [UserData, setUserData] = React.useState();

    // const SavedInvoices = []

    const [loading, setloading] = React.useState(false)
    const [amount_Array, setamount_Array] = React.useState([])
    const navigate = useNavigate();

    const amountSold = SavedInvoices && SavedInvoices.length > 0 ? SavedInvoices.filter(e => e.paid == true).reduce((acc, item) => acc + parseInt(item.amount), 0) : 0;


    const style = {
        position: 'absolute',
        top: '3%',
        left: '25%',
        // transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 4,
        maxHeight: "90%",
        p: 4,
        overflow: "auto",
    };


    function FetchStaffs() {
        setloading(true)
        fetchStaffsModel()
            .then(response => {
                setloading(false)
                if (!response.error) {
                    setstaffs(response.data)
                } else {
                    alert(response.error.message)
                    setstaffs([])
                }
                console.log(response)
            })
            .catch(error => {
                setloading(false)
                setstaffs([])
            })
    }


    React.useEffect(() => {
        FetchStaffs()

    }, [])


    const Cards = [
        {
            id: 1,
            num: staffs.length,
            img1: t1,
            img2: d1,
            text1: 'Total Employees',
            // text2: '2 new employees added',
            background: '#99cf7280'

        },

        {
            id: 2,
            num: staffs.filter(e => e.branch == "GRA").length,
            img1: t2,
            img2: d2,
            text1: 'GRA Branch',
            text2: '-10% Less than yesterday',
            background: '#99cf7280'

        },

        {
            id: 3,
            num: staffs.filter(e => e.branch == "WOJI").length,
            img1: t3,
            img2: d3,
            text1: 'Woji Branch',
            text2: '+3% Increase than yesterday',
            background: '#cf727280'

        },

        {
            id: 4,
            num: staffs.filter(e => e.type == "SERVICE-REP").length,
            img1: t4,
            img2: d3,
            text1: 'Service Reps.',
            text2: '+3% Increase than yesterday',
            background: '#cf727280'

        },

        {
            id: 5,
            num: staffs.filter(e => e.type == "PRODUCT-REP").length,
            img1: t5,
            img2: d2,
            text1: 'Product Reps.',
            text2: '-10% Less than yesterday',
            background: '##99cf7280'

        },

        {
            id: 6,
            num: staffs.filter(e => e.type == "Marketer").length,
            img1: t6,
            img2: d4,
            text1: 'Marketers',
            text2: '2% Increase than yesterday',
            background: '#99cf7280'

        }



    ]



    const getBgColor = (bg) => {
        switch (bg) {
            case 'Work from office':
                return '#E6EFFC'; // Green
            case 'Absent':
                return '#FFE5EE'; // Red
            case 'Late Arrival':
                return '#FFF8E7'; // Orange
            default:
                return '#000000'; // Default color
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Work from office':
                return '#0764E6'; // Green
            case 'Absent':
                return '#FF0000'; // Red
            case 'Late Arrival':
                return '#D5B500'; // Orange
            default:
                return '#fff'; // Default color
        }
    };





    function getFormattedDate() {
        const today = new Date();
        const day = today.getDate();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();

        const dayWithSuffix = addSuffixToDay(day);

        return `${dayWithSuffix} ${month} ${year}`;
    }

    function addSuffixToDay(day) {
        if (day > 10 && day < 20) {
            return day + 'th';
        }
        switch (day % 10) {
            case 1:
                return day + 'st';
            case 2:
                return day + 'nd';
            case 3:
                return day + 'rd';
            default:
                return day + 'th';
        }
    }
    const formattedDate = getFormattedDate();

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
        return timeString;
    }

    const currentTime = getCurrentTime();


    return (
        <div>
            {/* {console.log(amount_Array)} */}

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

                <AdminSidebar />

                <div className='main'>
                    <DashHeader User={User} />

                    <div className="emp-record">

                        <div className="emp-l">

                            {
                                Cards.map((Card, id) => {
                                    return (

                                        <div className="emp-card" key={id}>
                                            <div className="emp-c-c">
                                                <div className="numb-i">
                                                    <h3>{Card.num}</h3>
                                                    <span>
                                                        <img src={Card.img1} alt="" />
                                                    </span>
                                                </div>

                                                <div className="tot">
                                                    <h5>{Card.text1}</h5>

                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }



                        </div>


                        <div className="emp-r">

                            <div className="emp-r-c">
                                <div className="time">
                                    <img src={sun} alt="" />
                                    <div className="r-t">
                                        <h4>{currentTime}</h4>
                                        <h6>Realtime Insight</h6>
                                    </div>
                                </div>

                                <h5>Today: </h5>
                                <h5>{formattedDate}</h5>
                                <div className="view">
                                    {/* <button>View Attendance</button> */}
                                </div>

                            </div>

                        </div>




                    </div>



                    <div className="attendance" style={{
                        // backgroundColor: "green",
                        // width: "100%"
                    }} >
                        <div className="att-c" style={{
                            // backgroundColor: "red",
                            // width: "100%"
                        }} >
                            {/* <div className="overview">
                                <h4>Attendance Overview</h4>
                                <div className="search">
                                    <CiSearch className='s-i' />
                                    <input type="search" placeholder='Quick Search' />
                                </div>

                                 
                            </div> */}

                            <table style={{
                                // backgroundColor: "black",
                                width: "90%"
                            }}>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    {/* <th>Email</th> */}
                                    <th>Role</th>
                                    <th>Branch</th>
                                    <th>Action</th>
                                </tr>


                                {
                                    staffs.map((Attend, id) => {
                                        const statusColor = getStatusColor(Attend.status);
                                        const BgColor = getBgColor(Attend.status);
                                        return (
                                            <tr key={id}>
                                                <td >{Attend.uuid.slice(-5)}</td>
                                                <td >{Attend.name}</td>
                                                {/* <td>{Attend.email}</td> */}
                                                <td>{Attend.type}</td>
                                                <td>{Attend.branch}</td>
                                                <td
                                                    onClick={() => {
                                                        setloading(true)
                                                        fetchStaffLeave(Attend.name)
                                                            .then(response => {
                                                                setOpen(true)
                                                                setUserData({
                                                                    ...Attend,
                                                                    attendance: response.data
                                                                })
                                                                setloading(false)
                                                                console.log(Attend)
                                                            })
                                                            .catch(error => {
                                                                setloading(false)
                                                                alert("A network error occured")
                                                            })

                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                        color: "#252C58",
                                                        // fontWeight: 700,
                                                        textAlign: "center"
                                                    }} >  <span style={{ color: "mediumseagreen" }} >See details  </span> </td>
                                                {/* <td></td> */}
                                            </tr>
                                        )
                                    })
                                }



                            </table>



                        </div>
                    </div>


                </div>

            </section>



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // backgroundColor: "darkred",
                            width: "100%",
                            // height: 300,
                            padding: 10
                        }}>
                            <p> <b>{UserData && UserData.name}</b> </p> <br />
                            <div style={{
                                width: "80%"
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Name:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.name}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Branch:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.branch}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Role:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.type}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Password:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.password}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Email:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.email}</p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Attendance:</b>
                                    {/* <p style={{ color: "#000", fontSize: 13 }} >{UserData && UserData.attendance.length}</p> */}
                                </div>


                                <div style={{
                                    // justifyContent: "flex-start",
                                    alignItems: "center",
                                    display: "flex",
                                    // flexDirection: "row-reverse",
                                    flexWrap: "wrap"
                                }}>


                                    {UserData && UserData.attendance.slice(-29).map((item, index) => {
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



                                <br />
                                <p>New password for <b>{UserData && UserData.name}</b> </p>
                                <input
                                    type="text"
                                    className='inp'
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    style={{ paddingLeft: 10, width: "90%", marginTop: 10, height: 50 }}
                                    placeholder='Enter new password'
                                />
                                <LoadingButton loading={loading} variant="contained"
                                    loadingPosition="start"
                                    load
                                    size='small'
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: "#252C58",
                                        height: 45,
                                        // width: "30%",
                                        marginTop: 10,
                                        marginBottom: 30,
                                        color: "#fff",
                                        fontSize: 13,
                                        padding: 10,
                                        borderRadius: 8,
                                        border: "none",
                                    }}
                                    onClick={() => {
                                        setloading(true)
                                        ChangePasswordModel(UserData.uuid, password)
                                            .then(response => {
                                                if (response.success == true) {
                                                    setOpen(false)
                                                    FetchStaffs()
                                                    alert("Password changed")
                                                    setPassword("")
                                                } else {
                                                    alert(response.message)
                                                    setloading(false)
                                                }
                                                // console.log(response)
                                            })
                                            .catch(error => {
                                                setloading(false)
                                                alert("A network error occured")
                                            })
                                    }}
                                >Change password</LoadingButton>
                            </div>
                        </div>



                    </Box>
                </Fade>
            </Modal>




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


export default connect(mapStateToProps, mapDispatchToProps)(Staffmgt);
