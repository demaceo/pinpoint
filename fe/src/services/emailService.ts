export const sendEmail = async (toEmail: string, fromEmail: string, message: string) => {
    const response = await fetch("http://localhost:5000/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail, fromEmail, message }),
    });

    return response.json();
};
