<div
                                style={{
                                    flex: 1,
                                    // backgroundColor: "#fff"
                                }}
                                className='invoice-s'  >
                                <section className='invoice' style={{ padding: 20, backgroundColor: "#fff", width: "270px", }} id="pdf-content">

                                    <div className="in-c" style={{ flexDirection: "column", alignItems: "center" }} >
                                        <img src={logo} alt="" style={{ width: 170, height: 70 }} />
                                        <div className="in-l" style={{ textAlign: "center" }} >
                                            <h3 style={{ fontSize: 23, color: "#000" }} >Maison Wellness place</h3>
                                        </div>

                                        <div className="in-r">
                                            <spam style={{ color: "#000", fontSize: 14 }} >2nd creek drive Woji</spam>
                                            <p style={{ color: "#000", fontSize: 14 }} >09126114067,  <spam>https://maisonwellnessplace.com</spam></p>
                                        </div>
                                    </div>

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
                                        <p style={{ color: "#000", fontSize: 13 }} >{getFormattedDate()}</p>
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

                                    <PaymentInvoiceDispaly />





                                </section>


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

                                    <p
                                        onClick={() => {
                                            if (!InvoiceProducts.paid) {
                                                // confirmPayment()
                                                handleOpen()
                                                // setamountToPay(InvoiceProducts.totalPrice)
                                                // setamountWithVAT(InvoiceProducts.totalPrice + InvoiceProducts.totalPrice * 0.075)
                                                // console.log(InvoiceProducts)
                                            }
                                        }}
                                        style={{
                                            backgroundColor: InvoiceProducts.paid ? '#fff' : "#2C9676",
                                            color: InvoiceProducts.paid ? "#000" : "white",
                                            padding: 5,
                                            paddingRight: 10,
                                            paddingLeft: 10,
                                            // marginLeft: 10,
                                            borderRadius: 6,
                                            cursor: InvoiceProducts.paid ? "no-drop" : "pointer",
                                            fontSize: InvoiceProducts.paid ? 20 : 13,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: InvoiceProducts.paid ? 900 : 500,
                                        }}
                                    >
                                        {InvoiceProducts.paid ? <>
                                            PAID  </> :
                                            <>  Make payment <FaArrowAltCircleRight style={{ marginLeft: 10 }} /> </>}
                                    </p>

                                    {/* {!InvoiceProducts.paid &&
                                        <> */}
                                    <p
                                        onClick={() => {
                                            saveInvoice("PRINT")
                                        }}
                                        style={{
                                            backgroundColor: '#fff',
                                            color: "#000",
                                            padding: 5,
                                            paddingRight: 10,
                                            paddingLeft: 10,
                                            marginLeft: 10,
                                            borderRadius: 6,
                                            cursor: "pointer",
                                            fontSize: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        Print   <FaPrint style={{ marginLeft: 3 }} />
                                    </p>

                                    {/* <p
                                            onClick={() => {
                                                saveInvoice("DOWNLOAD")
                                            }}
                                            style={{
                                                backgroundColor: '#FA5A7D', color: "white",
                                                padding: 5,
                                                paddingRight: 10,
                                                paddingLeft: 10,
                                                marginLeft: 10,
                                                borderRadius: 6,
                                                cursor: "pointer",
                                                fontSize: 13,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            Download   <FaDownload style={{ marginLeft: 3 }} />
                                        </p> */}

                                    {/* </>

                                    } */}

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }} >

                                        <p
                                            onClick={() => {
                                                disp_view_invoice(null)
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

                                        {!InvoiceProducts.paid && InvoiceProducts.generated_by == User.name &&

                                            <p
                                                onClick={() => {
                                                    setloading(true)
                                                    deleteInvoice(InvoiceProducts.invoiceID, User.name)
                                                        .then(responseX => {
                                                            fetchAllInvoicesBySalesRep(User.name)
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
                                        }

                                    </div>
                                </div>

                            </div>