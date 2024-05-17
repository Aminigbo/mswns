import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashHeader from '../Components/DashHeader'
import { NumberWithCommas } from '../utils'
import { ApplyForLeave, SaveInvoiceModel, fetchAllProducts, fetchStaffLeave } from '../service/supabase-service'
import { connect } from 'react-redux'
import { Invoice_Product, Products, View_invoice } from '../redux/state/action'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress, Divider } from '@mui/material'
import logo from '../images/logo.jpeg'


const Leave = ({
    disp_products, disp_view_invoice,
    appState, disp_invoice_products
}) => {
    const AllProducts = appState.AllProducts;
    const User = appState.User;
    const InvoiceProducts = appState.AllInvoiceProducts


    const [product, setProduct] = useState(true)
    const [service, setService] = useState(true)
    const [productSearch, setProductSearch] = useState("")
    const [LeaveData, setLeaveData] = useState(null)
    const [date, setdate] = useState([])
    const [purpose, setpurpose] = useState("")
    const [days, setdays] = useState("")
    const [desc, setdesc] = useState("")
    const navigate = useNavigate();
    const [loading, setloading] = React.useState(false)
    const [selectCategory, setselectCategory] = React.useState("Semi Permanent Brows")
    const uniqueCategories = [...new Set(AllProducts && AllProducts.filter(e => e.category != "Products").map(item => item.category))];

    function GetAllLeave() {
        fetchStaffLeave(User.name)
            .then(response => {
                setLeaveData(response.data)
            })
            .catch(error => {

            })
    }

    function Apply() {
        setloading(true)
        ApplyForLeave({
            purpose, date, desc, staff: User.name, days
        })
            .then(response => {
                setLeaveData(response.data)
                setloading(false)
            })
            .catch(error => {
                setloading(false)
            })
    }





    React.useEffect(() => {
        GetAllLeave()
    }, []);



    return (
        <div>
            {console.log(LeaveData)}
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


            {/* {console.log(AllProducts)} */}
            <section className='main-dash'>

                <Sidebar />

                <div className='main'>
                    {/* <DashHeader User={User} /> */}

                    <section className='sale-m' style={{
                        // backgroundColor: "red"
                    }} >


                        <div className='salesProductPreviewHolder' >
                            <div className='sale-form' style={{ backgroundColor: "#fff" }} >
                                <section style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }} >
                                    {LeaveData && LeaveData.filter(e => e.approved == false).length > 0 ? <>
                                        <div>
                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Pending Leave request</text>

                                            <br /> <br /> <br />

                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }} >Purpose</text>

                                            <h1 style={{
                                            }} >{LeaveData[0].purpose}</h1>
                                            <br /> <br />

                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Date</text>

                                            <h1 style={{
                                            }} >{LeaveData[0].date}</h1>

                                            <br /> <br />

                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Number of days</text>

                                            <h1 style={{
                                            }} >{LeaveData[0].days} days</h1>



                                            <br /> <br />

                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Description</text>

                                            <h1 style={{
                                            }} >{LeaveData[0].desc}</h1>


                                            <div style={{
                                                marginTop: 50,
                                                marginBottom: 50
                                            }}>
                                                {desc.length > 5 && date.length > 3 && purpose.length > 5 && <span
                                                    onClick={() => {
                                                        Apply()
                                                    }}
                                                    style={{
                                                        padding: "20px 50px",
                                                        cursor: "pointer",
                                                        // backgroundColor: "#000",
                                                        color: LeaveData[0].approved == true ? "green" : "red",
                                                        borderRadius: "8px"
                                                    }}
                                                    className="fil">{LeaveData[0].approved == true ? "Approved" : "Pending approval"}</span>}

                                            </div>
                                        </div>
                                    </> : <>
                                        <div>

                                            <br /><br />

                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                // backgroundColor: "red",
                                                alignItems: "flex-start"
                                            }} >
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}>
                                                    <text style={{
                                                        fontSize: 12,
                                                        fontWeight: 500
                                                    }} >Date</text>
                                                    <input
                                                        type='date'
                                                        style={{
                                                            width: "50%"
                                                        }}
                                                        onChange={(e) => {
                                                            setdate(e.target.value)
                                                        }} />
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}>
                                                    <text style={{
                                                        fontSize: 12,
                                                        fontWeight: 500
                                                    }} >Number of days</text>
                                                    <select
                                                        type='date'
                                                        style={{
                                                            width: "50%"
                                                            // marginTop: 20
                                                        }}
                                                        onChange={(e) => {
                                                            setdays(e.target.value)
                                                        }} >
                                                        <option value="" >1</option>
                                                        <option value="2" >2</option>
                                                        <option value="3" >3</option>
                                                        <option value="4" >4</option>
                                                        <option value="5" >5</option>
                                                        <option value="6" >6</option>
                                                        <option value="7" >7</option>
                                                        <option value="8" >8</option>
                                                        <option value="9" >9</option>
                                                        <option value="10" >10</option>

                                                    </select>

                                                </div>
                                            </div>


                                            <br /> <br />
                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Purpose of leave</text>
                                            <br />
                                            <input
                                                style={{
                                                    // width: "75%"
                                                    // marginTop: 20
                                                }}
                                                onChange={(e) => {
                                                    setpurpose(e.target.value)
                                                }}
                                                placeholder='Purpose'
                                                value={purpose} />



                                            <br /> <br />

                                            <text style={{
                                                fontSize: 12,
                                                fontWeight: 500
                                            }} >Description</text>
                                            <textarea
                                                onChange={(e) => {
                                                    setdesc(e.target.value)
                                                }}
                                                value={desc}
                                                style={{
                                                    // marginTop: 30,
                                                    width: "96%",
                                                    height: 220,
                                                    resize: "none",
                                                    // textAlign:"center"
                                                    padding: 20
                                                }}
                                                placeholder='Short description'
                                            ></textarea>


                                            <div style={{
                                                marginTop: 50,
                                                marginBottom: 50
                                            }}>
                                                {desc.length > 5 && date.length > 3 && purpose.length > 5 && <span
                                                    onClick={() => {
                                                        Apply()
                                                    }}
                                                    style={{
                                                        padding: "20px 50px",
                                                        cursor: "pointer",
                                                        backgroundColor: "#000",
                                                        color: "#fff",
                                                        borderRadius: "8px"
                                                    }}
                                                    className="fil">Apply</span>}

                                            </div>
                                        </div>
                                    </>}
                                </section>

                            </div>


                        </div>


                    </section>


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
        disp_products: (payload) => dispatch(Products(payload)),
        disp_invoice_products: (payload) => dispatch(Invoice_Product(payload)),
        disp_view_invoice: (payload) => dispatch(View_invoice(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Leave); 