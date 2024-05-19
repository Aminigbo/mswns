import { Supabase } from "../config/supabase"

export const LoginModel = ({ email, password }) => {

    return Supabase.auth.signInWithPassword({
        email,
        password
        // ends here
    })
}



export function updateLeaveStatus(status, id) {
    return Supabase
        .from('staff_leave')
        .update({
            approved: status
        })
        .eq('id', id)
    // .select()
}



export function fetchAllProducts() {
    return Supabase
        .from("products")
        .select("*")
        .eq("inStock", true)
}


export function ApplyForLeave({
    purpose, date, desc, staff, days
}) {
    return Supabase
        .from("staff_leave")
        .insert([{
            staff,
            purpose,
            approved: false,
            desc,
            date,
            days
        }])
        .select()
}


export function fetchStaffLeave(staff) {
    return Supabase
        .from("staff_leave")
        .select("*")
        .eq("staff", staff)
}


export function AdminfetchStaffLeave() {
    return Supabase
        .from("staff_leave")
        .select("*")
        .eq("approved", false)
        .order('id', { ascending: false })
}


export function SaveInvoiceModel({
    product, salesRep, amount, vat, invoiceID, generated_by, branch, type
}) {
    return Supabase
        .from("invoices")
        .insert([{
            product,
            salesRep,
            amount,
            vat,
            invoiceID, generated_by,
            branch,
            type
        }])
        .select()
}

export function fetchStaffsModel() {
    return Supabase
        .from("admins")
        .select("*")
        .neq("type", "Admin")
}


export function fetchAllInvoicesAdmin() {
    return Supabase
        .from("invoices")
        .select("*")
}

export function fetchAllInvoices() {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('deleted', false)
}


export function fetchAllInvoicesBySalesRep(user) {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('generated_by', user)
        .eq('deleted', false)
}

export function fetchAllInvoicesByBranch(branch) {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('branch', branch)
        .eq('deleted', false)
}

// Marketers
export function FetchMarkersInvoice(marketer) {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('marketerid', marketer)
        .eq('deleted', false)
}


// fetch attendance
export function FetchAttendance(user) {
    return Supabase
        .from("attendance")
        .select("*")
        .eq('user', user)
        .order('id', { ascending: false })
    // .order("ascending", true)
}

// sign attendace
export function SignAttendance({
    date,
    month,
    year,
    time,
    user
}) {
    return Supabase
        .from('attendance')
        .insert([{
            date,
            month,
            year,
            time,
            user
        }])
        .select()
    // .select()
}



export function fetchSingleInvoices(id) {
    console.log("Fething ", id)
    return Supabase
        .from("invoices")
        .select("*")
        .eq('invoiceID', id)
        .eq('deleted', false)
}

export function updateInvoiceStatus(id, marketerid, customerphone, data) {
    console.log(id)
    return Supabase
        .from('invoices')
        .update({
            paid: true,
            marketerid: marketerid,
            customerphone: customerphone,
            payData: data
        })
        .eq('invoiceID', id)
    // .select()
}

export function deleteInvoice(id, user) {
    return Supabase
        .from("invoices")
        .update({
            who_deleted: user,
            deleted: true
        })
        .eq('invoiceID', id)
}

export function AdminDeleteInvoice(id) {
    return Supabase
        .from("invoices")
        .delete()
        .eq('invoiceID', id)
}

// all marketers
export function getAllMarketers() {
    return Supabase
        .from("admins")
        .select("*")
        .eq('type', "Marketer")
}
