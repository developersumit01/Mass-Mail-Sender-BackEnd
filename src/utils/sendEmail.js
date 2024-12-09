import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.SECURE,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD,
    },
});

const sendOTP = async (email, subject, message) => {
    try {
        let mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            text: message,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send({
                    emil: mailOptions.to,
                    error: error,
                    success: false,
                });
            } else {
                res.send({ emil: mailOptions.to, success: true });
            }
        });
    } catch (error) {
        alert("Their is some error while sending the OTP");
    }
};
const sendEmail = async (email = [], subject, message) => {
    let responce = [];
    try {
        email.forEach((element) => {
            let mailOptions = {
                from: process.env.SMTP_MAIL,
                to: element,
                subject: subject,
                text: message,
                attachments: [{}],
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    responce.push({
                        emil: email,
                        error: error,
                        success: false,
                    });
                } else {
                    responce.push({ emil: email, success: true });
                }
            });
        });
    } catch (error) {
        return { error: error };
    }
    return responce;
};

export { sendOTP, sendEmail };
