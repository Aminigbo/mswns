export async function ChangePasswordModel(id, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://enterprise-server-ten.vercel.app/api/v1/auth/change-password", requestOptions);
        const result_1 = await response.text();
        const Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return {
            error: true
        };
    }
}