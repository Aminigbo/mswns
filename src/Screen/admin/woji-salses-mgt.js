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
import { AdminDeleteInvoice, deleteInvoice, fetchAllInvoicesAdmin, fetchAllInvoicesBySalesRep } from '../../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../../redux/state/action';
import { Notify, NumberWithCommas, formatDate } from '../../utils';
import { FaArrowAltCircleRight, FaPrint, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../../Components/admin-sidebar';
import Card1 from '../../Components/Card1';
import img1 from '../../images/c1.png'
import img2 from '../../images/c2.png'
import img3 from '../../images/c3.png'
import img4 from '../../images/c4.png'
import img5 from '../../images/c5.png'
import img6 from '../../images/c6.png'
import Card2 from '../../Components/Card2';
import i1 from '../../images/i1.png'
import i2 from '../../images/i2.png'
import i3 from '../../images/i3.png'
import i4 from '../../images/i4.png'
import q1 from '../../images/q1.png'
import q2 from '../../images/q2.png'




const Wojisalesmgt = ({
    appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
    const User = appState.User;
    const InvoiceProducts = appState.AllInvoiceProducts
    const SavedInvoices = appState.SavedInvoices;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const SavedInvoices = []

    const [loading, setloading] = React.useState(false)
    const [amount_Array, setamount_Array] = React.useState([])
    const navigate = useNavigate();



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


    function FetchInvoices() {
        setloading(true)
        fetchAllInvoicesAdmin()
            .then(response => {
                console.log(response)
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

        if (SavedInvoices.length > 0) {
            let amountArray = []
            for (let i = 0; i < SavedInvoices.length; i++) {
                const element = SavedInvoices[i];
                amountArray.push(element.amount)

            }
            setamount_Array(amountArray)
        }
    }, [])


    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const milliseconds = String(today.getMilliseconds()).padStart(3, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;

    let Filter = SavedInvoices.filter(e => e.created_at.split("T")[0] == formattedDate.split("T")[0])

    // const TotalProductAmount = SavedInvoices.reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)) + item.vat, 0)

    // today's sale
    const TodaysTotalProductAmount = SavedInvoices.filter(e => e.payData != null).filter(e => e.branch == "WOJI").filter(e => e.created_at.split("T")[0] == formattedDate.split("T")[0]).reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)

    // total sales
    const TotalProductAmount = SavedInvoices.filter(e => e.payData != null).filter(e => e.branch == "WOJI").reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)


    // today's service sale
    const TodaysTotalServiceAmount = SavedInvoices.filter(e => e.payData != null).filter(e => e.type == "SERVICE").filter(e => e.branch == "WOJI").filter(e => e.created_at.split("T")[0] == formattedDate.split("T")[0]).reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)

    // total service sales
    const TotalServiceAmount = SavedInvoices.filter(e => e.payData != null).filter(e => e.type == "SERVICE").filter(e => e.branch == "WOJI").reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)




    // today's sale
    const TodaysTotalProductAmountGRA = SavedInvoices.filter(e => e.payData != null).filter(e => e.branch == "GRA").filter(e => e.created_at.split("T")[0] == formattedDate.split("T")[0]).reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)

    // total sales
    const TotalProductAmountGRA = SavedInvoices.filter(e => e.payData != null).filter(e => e.branch == "GRA").reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)


    // today's service sale
    const TodaysTotalServiceAmountGRA = SavedInvoices.filter(e => e.payData != null).filter(e => e.type == "SERVICE").filter(e => e.branch == "GRA").filter(e => e.created_at.split("T")[0] == formattedDate.split("T")[0]).reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)

    // total service sales
    const TotalServiceAmountGRA = SavedInvoices.filter(e => e.payData != null).filter(e => e.type == "SERVICE").filter(e => e.branch == "GRA").reduce((acc, item) => (acc + parseInt(item.payData.productCostPlusVat)), 0)


    return (
        <div>
            {console.log(NumberWithCommas(TodaysTotalProductAmount))}

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


                    {/* <div className="product">
                        <div className="top">
                            <h3>Today's sales</h3>

                            <div>

                            </div>

                        </div>
                         {console.log(SavedInvoices)} 

                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Item(s)</th>
                                <th>Customer type</th>
                                <th>Date</th>
                                <th>Sales rep</th>
                                <th>Branch</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                            {SavedInvoices && SavedInvoices.map((item, index) => {
                                return <tr className='t-row'>

                                    <td>{item.invoiceID}</td>
                                    <td>₦{NumberWithCommas(item.amount)}</td>
                                    <td>{item.product.length}</td>
                                    <td>{item.marketerid ? "Referred" : "Walk-in"}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td><b>{item.generated_by}</b></td>
                                    <td><b>{item.branch}</b></td>
                                    <td className='av' style={{ color: item.paid == true ? "green" : "crimson" }} >{item.paid == true ? "PAID" : "NOT PAID"}</td>
                                    <td
                                        onClick={() => {
                                            handleOpen()
                                            disp_invoice_products(item)
                                            console.log(item)
                                            // disp_view_invoice(true)
                                            // navigate("/invoice")
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            color: "#252C58",
                                            fontWeight: 700,
                                            textAlign: "center"
                                        }} >View <FaArrowAltCircleRight /> </td>

                                </tr>
                            })}


                        </table>


                    </div> */}


                    <div className="sales-summary">

                        <div className="sales-o">

                            <div className="sales1">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 30

                                }} >
                                    <h2>Woji Branch</h2>

                                    <span onClick={() => {
                                        navigate("/admin-salse-management")
                                    }} className='export' style={{
                                        padding: "10px 15px",
                                        cursor: "pointer",
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        borderRadius: 6
                                    }}>
                                        {/* <PiExportBold className='e-i' /> */}
                                        See GRA branch

                                    </span>

                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 30

                                }} >
                                    <h2 style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }} > Products</h2>
                                    <h2 style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }} >Services</h2>
                                </div>
                                <div className='s-c'>

                                    <div className='s1'>
                                        <Card1 img={img1} price={`₦ ${NumberWithCommas(TodaysTotalProductAmount)}`} info='Today' />

                                    </div>

                                    <div className='s1'>
                                        <Card1 img={img2} price={`₦${NumberWithCommas(TotalProductAmount)}`} info='Total' />

                                    </div>

                                    <div className='s1'>
                                        <Card1 img={img3} price={`₦${NumberWithCommas(TodaysTotalServiceAmount)}`} info='Today' />

                                    </div>

                                    <div className='s1'>
                                        <Card1 img={img4} price={`₦${NumberWithCommas(TotalServiceAmount)}`} info='Total' />

                                    </div>

                                </div>
                            </div>

                        </div>



                        <div className="inventory">
                            <div className="sales1">
                                <h2>Summary</h2>

                                <div className="i-c">
                                    <div className="i-c1">
                                        <Card2 img={i1} numb={`₦${NumberWithCommas(TotalProductAmount)}`} info='Products' />
                                    </div>
                                    <div className="i-c1">
                                        <Card2 img={i2} numb={`₦${NumberWithCommas(TotalServiceAmount)}`} info='Services' />
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div className="sales-summary">

                        <div className="sales-o">

                            <div className="sales1">
                                <h2>Today's sales <span>See All</span></h2>

                                <table>
                                    <tr>
                                        <th>Invoice ID</th>
                                        <th>Amount</th>
                                        <th>Branch</th>
                                        <th>Rep</th>
                                    </tr>

                                    {Filter && Filter.map((items, index) => {

                                        const amountSold = items.product.reduce((acc, item) => (acc + parseInt(item.totalCost)) * item.qty, 0)


                                        return <tr key={index} >
                                            <td>{items.invoiceID}</td>
                                            <td>₦{amountSold}</td>
                                            <td>{items.branch}</td>
                                            <td>{items.salesRep.split(" ")[0]}</td>
                                        </tr>
                                    })}

                                    {Filter && Filter.length < 1 && <>
                                        <div style={{
                                            height: 200,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex"
                                        }}>
                                            <h2>No record found.</h2>
                                        </div>
                                    </>}

                                </table>

                            </div>

                        </div>



                        <div className="inventory">
                            <div className="sales1">
                                <h2>Low Quantity  Stock <span>See All</span></h2>

                                <div className="row">
                                    <div className="row1">
                                        <img src={q1} alt="" />
                                        <div className='quan'>
                                            <h6>Tata salt</h6>
                                            <p>Remaining Quantity : <span>10 Packet</span></p>
                                        </div>
                                        <button>low</button>
                                    </div>

                                    <div className="row1">
                                        <img src={q2} alt="" />
                                        <div className='quan'>
                                            <h6>Lays</h6>
                                            <p>Remaining Quantity : <span>10 Packet</span></p>
                                        </div>
                                        <button>low</button>
                                    </div>

                                    <div className="row1">
                                        <img src={q1} alt="" />
                                        <div className='quan'>
                                            <h6>Tata salt</h6>
                                            <p>Remaining Quantity : <span>10 Packet</span></p>
                                        </div>
                                        <button>low</button>
                                    </div>
                                </div>

                            </div>


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
                            // height: 70,
                            padding: 10
                        }}>
                            <section className='invoice' style={{ padding: 20, backgroundColor: "lightgrey", }} id="pdf-content">

                                <Divider style={{ marginTop: 0 }} />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Invoice No.:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts.invoiceID}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Date:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{formatDate(InvoiceProducts.created_at)}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Sales Person:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{User.name}</p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Branch</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts.branch}</p>
                                </div>


                                <table className='table1' style={{ marginTop: 30 }} >
                                    <tr className='tr1'>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "red",
                                            width: "16%",
                                            color: "#000"
                                        }}>S/N</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#fff",
                                            width: "90%",
                                            color: "#000"
                                        }}>PRODUCT</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#000",
                                            width: "30%",
                                            color: "#000"
                                        }}>PRICE</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "red",
                                            width: "30%",
                                            color: "#000"
                                        }}>QTY.</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#000",
                                            width: "30%",
                                            color: "#000"
                                        }}>SUBTOTAL</th>
                                    </tr>
                                    {
                                        InvoiceProducts && InvoiceProducts.product && InvoiceProducts.product.map((items, index) => {
                                            return <tr key={index} style={{ marginBottom: 5 }} >
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "16%",
                                                    color: "#000"
                                                }}>{index + 1}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    color: "#000",
                                                    marginRight: 8,
                                                    width: "90%",
                                                    fontWeight: 700,
                                                }}>{items.name}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}> {NumberWithCommas(`₦{items.metaData.price}`)} </td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}>{items.qty}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}> {NumberWithCommas(`₦₦{items.metaData.price * items.qty}`)} </td>
                                            </tr>
                                        })
                                    }

                                </table>

                                <Divider style={{ marginTop: 20 }} />

                                {InvoiceProducts.paid && <>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >Cost of product</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.productCost)}</p>
                                    </div>
                                    {InvoiceProducts.payData.discount_amount &&
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Discount</b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.discount_amount)}</p>
                                        </div>
                                    }

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >VAT</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.taxAmount)}</p>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >Total</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.productCostPlusVat)}</p>
                                    </div>


                                    <Divider style={{ marginTop: 20 }} />

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 14 }} >Payment method</b>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts.payData.paymentMetheod}: </b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.amountToPay)}</p>
                                    </div>


                                    {InvoiceProducts.payData.complimentaryMethod != "SELECT" && <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts.payData.complimentaryMethod}: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.productCostPlusVat - InvoiceProducts.payData.amountToPay)}</p>
                                        </div>
                                    </>}



                                    {InvoiceProducts.customerphone && <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer phone: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts.customerphone}</p>
                                        </div>
                                    </>}
                                    {InvoiceProducts.marketerid ? <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer type </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >Referred</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Marketer: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts.marketerid}</p>
                                        </div>
                                    </> : <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer type </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >Walk-in customer</p>
                                        </div>
                                    </>}

                                </>
                                }


                            </section>

                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 20,
                            backgroundColor: "#fff",
                            width: "100%", height: 70,
                            padding: 10
                        }}>

                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }} >

                                <p
                                    onClick={() => {
                                        handleClose()
                                    }}
                                    style={{
                                        backgroundColor: '#fff',
                                        color: "#FA5A7D",
                                        padding: 5,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        // marginLeft: 10,
                                        borderRadius: 6,
                                        cursor: "pointer",
                                        fontSize: 13,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 500
                                    }}
                                >
                                    Close   <FaTimes style={{ marginLeft: 2 }} />
                                </p>


                                <p
                                    onClick={() => {
                                        handleClose()
                                        setloading(true)
                                        AdminDeleteInvoice(InvoiceProducts.invoiceID)
                                            .then(responseX => {
                                                fetchAllInvoicesAdmin()
                                                    .then(response => {
                                                        disp_savedInvoice(response.data)
                                                        Notify("Quote deleted successfully")
                                                        setTimeout(() => {
                                                            setloading(false)
                                                            disp_view_invoice(null)
                                                        }, 2000);

                                                    })
                                                    .catch(error => {
                                                        setloading(false)
                                                    })

                                            })
                                            .catch(error => {
                                                setloading(false)

                                            })
                                    }}
                                    style={{
                                        backgroundColor: '#fff', color: "#FA5A7D",
                                        padding: 5,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        marginLeft: 10,
                                        borderRadius: 6,
                                        cursor: "pointer",
                                        fontSize: 13,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 500
                                    }}
                                >
                                    Delete   <FaDeleteLeft style={{ marginLeft: 2 }} />
                                </p>


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


export default connect(mapStateToProps, mapDispatchToProps)(Wojisalesmgt);
