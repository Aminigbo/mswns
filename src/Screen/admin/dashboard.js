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
import { AdminDeleteInvoice, AdminfetchStaffLeave, deleteInvoice, fetchAllInvoicesAdmin, fetchAllInvoicesBySalesRep } from '../../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../../redux/state/action';
import { Notify, NumberWithCommas, formatDate } from '../../utils';
import { FaArrowAltCircleRight, FaPrint, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../../Components/admin-sidebar';
import { mkConfig, generateCsv, download } from "export-to-csv";



const Dashboard = ({
  appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
  const User = appState.User;
  const InvoiceProducts = appState.AllInvoiceProducts
  const SavedInvoices = appState.SavedInvoices;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setOpen2(false) };

  // const SavedInvoices = []

  const [loading, setloading] = React.useState(true)
  const [leaveLoader, setleaveLoader] = React.useState(true)
  const [seeleaveLoader, setseeleaveLoader] = React.useState(true)
  const [amount_Array, setamount_Array] = React.useState([])
  const [LeaveData, setLeaveData] = React.useState([])
  const navigate = useNavigate();

  const amountSold = SavedInvoices && SavedInvoices.length > 0 ? SavedInvoices.filter(e => e.paid == true).filter(e => e.branch == "GRA").reduce((acc, item) => acc + parseInt(item.amount), 0) : 0;


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
          console.log(response.data)
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

  function GetAllLeave() {
    setleaveLoader(true)
    AdminfetchStaffLeave(User.name)
      .then(response => {
        setleaveLoader(false)
        console.log(response.data)
        setLeaveData(response.data)
      })
      .catch(error => {
        setleaveLoader(false)
      })
  }



  React.useEffect(() => {
    // Get current date and time
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    // Get timezone offset in minutes and convert to hours and minutes
    const timezoneOffsetHours = Math.abs(currentDate.getTimezoneOffset() / 60);
    const timezoneOffsetMinutes = Math.abs(currentDate.getTimezoneOffset() % 60);
    const timezoneSign = currentDate.getTimezoneOffset() > 0 ? '-' : '+';

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;

    FetchInvoices()
    GetAllLeave()

    if (SavedInvoices.length > 0) {
      let amountArray = []
      for (let i = 0; i < SavedInvoices.filter(e => e.branch == "GRA").filter(e => e.paid == true).length; i++) {
        const element = SavedInvoices[i];
        amountArray.push(element.amount)

      }
      setamount_Array(amountArray)
    }
  }, [])


  const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "GRA Sale" });

  return (

    <>

      {!loading ? <>
        <div>
          {/* {console.log(amount_Array)} */}

          {/* {loading && <div style={{
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
          </div>} */}

          <section className='main-dash'>

            {
              User.type == "Admin" ? <AdminSidebar /> : <Sidebar />
            }

            <div className='main'>
              <DashHeader User={User} />

              <div className="first">

                <div className="first-l">

                  <div className="first-l-top">
                    <div>
                      <h3>Maisonwellness GRA Branch</h3>
                      {/* <p>Sales Summary</p> */}
                    </div>

                    {/* <span className='export'>
                  <PiExportBold className='e-i' />
                  export

                </span> */}
                    <span onClick={() => {
                      navigate("/woji-dashboard")
                    }} className='export' style={{
                      width: "150px",
                      cursor: "pointer",
                      backgroundColor: "#000",
                      color: "#fff"
                    }}>
                      {/* <PiExportBold className='e-i' /> */}
                      See Woji branch

                    </span>

                  </div>

                  <div className="first-l-cards">

                    <div className="first-l-card" style={{ backgroundColor: '#FFE2E5', wordWrap: "break-word" }}>
                      <div>
                        <span style={{ backgroundColor: '#FA5A7D' }}>
                          <BsFileBarGraphFill className='c-i' />
                        </span>
                        <h2>₦{NumberWithCommas(amountSold)}</h2>
                        <h6>Total Sales.</h6>
                        {/* <p>+8% from yesterday</p> */}
                      </div>

                    </div>
                    <div className="first-l-card" style={{ backgroundColor: '#FFF4DE' }}>
                      <div>
                        <span style={{ backgroundColor: '#FF947A' }}>
                          <BiSolidReceipt className='c-i' />
                        </span>
                        <h2>{SavedInvoices && SavedInvoices.filter(e => e.branch == "GRA").length}</h2>
                        <h6>Total Order</h6>
                        {/* <p>+5% from yesterday</p> */}
                      </div>
                    </div>

                    <div className="first-l-card" style={{ backgroundColor: '#DCFCE7' }}>
                      <div>
                        <span style={{ backgroundColor: '#3CD856' }}>
                          <IoIosPricetags className='c-i' />
                        </span>
                        <h2>{SavedInvoices && SavedInvoices.filter(e => e.branch == "GRA").filter(e => e.paid == true).length}</h2>
                        <h6>Product Sold</h6>
                        {/* <p>+1.2% from yesterday</p> */}

                      </div>
                    </div>


                    <div className="first-l-card" style={{ backgroundColor: '#F3E8FF' }}>
                      <div>
                        <span style={{ backgroundColor: '#BF83FF' }}>
                          <FaUserPlus className='c-i' />
                        </span>
                        <h2>{SavedInvoices && SavedInvoices.filter(e => e.branch == "GRA").filter(e => e.customerphone.length > 5).length}</h2>
                        <h6>Walk-in Customers</h6>
                        {/* <p>+0.5% from yesterday</p> */}
                      </div>
                    </div>

                  </div>

                </div>

                <div className="first-r">
                  <div>
                    <h3>Leave requests</h3> <br />

                    {LeaveData.length > 0 && LeaveData.slice(0, 5).map((item, index) => {
                      return <div
                        onClick={() => {
                          setseeleaveLoader(item)
                          setOpen2(true)
                        }}
                        style={{
                          padding: 4,
                          fontSize: 9,
                          backgroundColor: "lightgrey",
                          width: "90%",
                          borderRadius: 7,
                          cursor: "pointer",
                          marginBottom: 14
                        }} >
                        <b >{item.staff}</b> <br />
                        <b >{item.date}</b>
                        <p>{item.purpose}</p>
                      </div>
                    })}
                    {leaveLoader == true &&
                      <div style={{
                        // position: "fixed",
                        height: "300px",
                        width: "100%",
                        left: 0,
                        top: 0,
                        // backgroundColor: "rgb(0,0,0,0.8)",
                        zIndex: 100,
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                      }} >
                        <CircularProgress size={20} />
                        <spam style={{ color: "white" }} >Please wait.....</spam>
                      </div>
                    }

                  </div>

                </div>

              </div>



              <div className="product" style={{
                // width:"100%",
                // backgroundColor:"green"
              }} >
                <div className="top" style={{
                  // width:"100%",
                  // backgroundColor:"red"
                }} >
                  <h3>Today's sales</h3>

                  <div>
                    {/* <button>Add Product</button> */}

                    {/* <span className="fil">
                  <IoFilterOutline className='f-i' />
                  filter
                </span> */}

                    <span
                      onClick={() => {
                        let mockData = [];
                        for (let i = 0; i < SavedInvoices.filter(e => e.branch == "GRA").length; i++) {
                          let element = {
                            amount: NumberWithCommas(SavedInvoices[i].amount),
                            vat: NumberWithCommas(SavedInvoices[i].vat),
                            id: SavedInvoices[i].invoiceID,
                            salse_rep: SavedInvoices[i].salesRep,
                            date: formatDate(SavedInvoices[i].created_at),
                            paid: SavedInvoices[i].paid ? "YES" : "NO",
                            amount_paid: SavedInvoices[i].paid ? SavedInvoices[i].payData.amountToPay : "---",
                          };
                          mockData.push(element)
                          // console.log(element)
                        }
                        // Converts your Array < Object > to a CsvOutput string based on the configs
                        const csv = generateCsv(csvConfig)(mockData);
                        download(csvConfig)(csv)
                      }}
                      style={{
                        width: "150px",
                        cursor: "pointer",
                        backgroundColor: "#000",
                        color: "#fff"
                      }}
                      className="fil">Download CSV</span>



                  </div>

                </div>
                {/* {console.log(SavedInvoices)} */}

                <table style={{
                  width: "100%",
                  // backgroundColor:"black"
                }} >
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

                  {SavedInvoices && SavedInvoices.length > 0 && SavedInvoices.filter(e => e.branch == "GRA").map((item, index) => {
                    return <tr className='t-row'>

                      <td style={{ paddingLeft: 10 }} >{item.invoiceID}</td>
                      <td>₦{NumberWithCommas(item.amount)}</td>
                      <td>{item.product.length}</td>
                      <td>{item.marketerid ? "Referred" : "Walk-in"}</td>
                      <td>{formatDate(item.created_at)}</td>
                      <td><b>{item.generated_by.split(" ")[0]}</b></td>
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


              </div>


            </div>

          </section>


          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open2}
            // open={true}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open2}>
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

                  <div>
                    <h1 style={{
                      // fontSize: 12,
                      // fontWeight: 500
                    }} >{seeleaveLoader.staff}</h1>

                    <br />  

                    <b style={{
                      fontSize: 12,
                      fontWeight: 500,
                    }} >Purpose</b>

                    <p style={{
                    }} >{seeleaveLoader.purpose}</p>
                    <br />  

                    <b style={{
                      fontSize: 12,
                      fontWeight: 500
                    }} >Date</b>

                    <p style={{
                    }} >{seeleaveLoader.date}</p>

                    <br />   

                    <b style={{
                      fontSize: 12,
                      fontWeight: 500
                    }} >Number of days</b>

                    <p style={{
                    }} >{seeleaveLoader.days} days</p>



                    <br />

                    <b style={{
                      fontSize: 12,
                      fontWeight: 500
                    }} >Description</b>

                    <p style={{
                    }} >{seeleaveLoader.desc}</p>

                    <div style={{
                      marginTop: 50,
                      marginBottom: 50
                    }}>
                      <span
                        onClick={() => {
                          // Apply()
                        }}
                        style={{
                          padding: "10px 50px",
                          cursor: "pointer",
                          backgroundColor: "mediumseagreen",
                          color: "#fff",
                          borderRadius: "8px"
                        }}
                        className="fil">Approve</span>

                      <span
                        onClick={() => {
                          // Apply()
                        }}
                        style={{
                          padding: "10px 50px",
                          cursor: "pointer",
                          backgroundColor: "crimson",
                          color: "#fff",
                          borderRadius: "8px",
                          marginLeft: 20
                        }}
                        className="fil">Decline</span>

                    </div>
                  </div>


                </div>
              </Box>
            </Fade>
          </Modal>


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
                      <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts && InvoiceProducts.invoiceID}</p>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}>
                      <b style={{ color: "#000", fontSize: 14 }} >Date:</b>
                      <p style={{ color: "#000", fontSize: 13 }} >{formatDate(InvoiceProducts && InvoiceProducts.created_at)}</p>
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
                      <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts && InvoiceProducts.branch}</p>
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
                            }}> {NumberWithCommas(`₦${items.metaData.price}`)} </td>
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
                            }}> {NumberWithCommas(`₦${items.metaData.price * items.qty}`)} </td>
                          </tr>
                        })
                      }

                    </table>

                    <Divider style={{ marginTop: 20 }} />

                    {InvoiceProducts && InvoiceProducts.paid && <>

                      <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 20,
                        marginBottom: 6,
                      }}>
                        <b style={{ color: "#000", fontSize: 10 }} >Cost of product</b>
                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData && InvoiceProducts.payData.productCost)}</p>
                      </div>

                      {InvoiceProducts && InvoiceProducts.payData.discount_amount &&
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 20,
                          marginBottom: 6,
                        }}>
                          <b style={{ color: "#000", fontSize: 10 }} >Discount</b>
                          <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData.discount_amount)}</p>
                        </div>
                      }

                      <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 20,
                        marginBottom: 6,
                      }}>
                        <b style={{ color: "#000", fontSize: 10 }} >VAT</b>
                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData.taxAmount)}</p>
                      </div>

                      <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 20,
                        marginBottom: 6,
                      }}>
                        <b style={{ color: "#000", fontSize: 10 }} >Total</b>
                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData.productCostPlusVat)}</p>
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
                        marginTop: 20,
                        marginBottom: 6,
                      }}>
                        <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts && InvoiceProducts.payData.paymentMetheod}: </b>
                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData.amountToPay)}</p>
                      </div>


                      {InvoiceProducts && InvoiceProducts.payData.complimentaryMethod != "SELECT" && <>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 20,
                          marginBottom: 6,
                        }}>
                          <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts && InvoiceProducts.payData.complimentaryMethod}: </b>
                          <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts && InvoiceProducts.payData.productCostPlusVat - InvoiceProducts.payData.amountToPay)}</p>
                        </div>
                      </>}



                      {InvoiceProducts && InvoiceProducts.customerphone && <>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 20,
                          marginBottom: 6,
                        }}>
                          <b style={{ color: "#000", fontSize: 10 }} >Customer phone: </b>
                          <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts && InvoiceProducts.customerphone}</p>
                        </div>
                      </>}
                      {InvoiceProducts && InvoiceProducts.marketerid ? <>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 20,
                          marginBottom: 6,
                        }}>
                          <b style={{ color: "#000", fontSize: 10 }} >Customer type </b>
                          <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >Referred</p>
                        </div>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 20,
                          marginBottom: 6,
                        }}>
                          <b style={{ color: "#000", fontSize: 10 }} >Marketer: </b>
                          <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts && InvoiceProducts.marketerid}</p>
                        </div>
                      </> : <>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
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
                        AdminDeleteInvoice(InvoiceProducts && InvoiceProducts.invoiceID)
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
      </> : <></>}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 600
      }} >
        <CircularProgress />
        <spam style={{ color: "white" }} >Please wait.....</spam>

      </div>
    </>

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


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
