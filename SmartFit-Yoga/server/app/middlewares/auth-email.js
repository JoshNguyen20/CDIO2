const nodemailer = require("nodemailer")
const validator = require('validator');
const readline = require('readline');
const cookieParser = require('cookie-parser');
const VeriMail = require("../models/VeriMail");
const { request } = require("http");
// gui code den email nguoi dung
const createCodeVery = async (req, res, next) => {
    const { email } = req.body
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            err: 1,
            msg: 'Invalid email format'
        });
    }
    else {
        // Tạo mã xác thực random
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        // config
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Email send
                pass: process.env.EMAIL_PASS, // pass mail
            },
        });
        // Cấu hình nội dung email
        let mailOptions = {
            from: process.env.EMAIL_USER, // Email người gửi
            to: email, // Email người nhận
            subject: `Mã xác thực của bạn cho SmartFit Yoga là:`,
            html: `
    <html>
    <head>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .email-container {
                font-family: Arial, sans-serif;
                max-width: 650px;
                margin: auto;
                border: 1px solid #ddd;
                border-radius: 12px;
                overflow: hidden;
                animation: fadeIn 0.8s ease-out;
                box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
                text-align: center;
            }
            .header {
                background-color: #4caf50;
                color: white;
                padding: 18px;
                font-size: 22px;
                font-weight: bold;
            }
            .content {
                padding: 25px;
                background-color: #f9f9f9;
            }
            .greeting {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 10px;
            }
            .code-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin: 20px auto;
                background-color: #fff;
                border: 3px dashed #4caf50;
                padding: 14px 24px;
                border-radius: 8px;
                font-size: 28px;
                font-weight: bold;
                font-family: 'Courier New', monospace;
                width: fit-content;
                position: relative;
            }
            .footer {
                background-color: #f3f3f3;
                text-align: center;
                padding: 12px;
                font-size: 13px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <table class="email-container">
            <tr>
                <td class="header">SmartFit Yoga Verification Code</td>
            </tr>
            <tr>
                <td class="content">
                    <p class="greeting">DẬY CODE ĐI MỌI NGƯỜI RỚT MÔN CHỪ</p>
                    <p>Chúng tôi nhận được yêu cầu xác thực email của bạn. Vui lòng sử dụng mã xác nhận dưới đây để tiếp tục:</p>
                    
                    <div class="code-container">
                        ${verificationCode || "******"}
                    </div>
                    
                    <p style="color: #555;">Lưu ý: Mã xác nhận này sẽ hết hạn sau 60 giây.</p>
                    <p>Trân trọng,<br/>Đội ngũ SmartFit Yoga</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>Đây là email tự động, vui lòng không trả lời.</p>
                    <p>&copy; 2024 SmartFit Yoga, All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
        }
        try {
            // Gửi email
            await transporter.sendMail(mailOptions);
            // luu tam code db
            // Xóa mã cũ nếu có
            await VeriMail.deleteMany({ email });

            // Tạo mã mới
            await VeriMail.create({
                email,
                code: verificationCode
            });

            console.log(`Mã xác thực đã được gửi đến ${email}: ${verificationCode}`);

            res.status(200).json({
                err: 0,
                msg: 'Verification code sent to email'
            });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({
                err: 1,
                msg: 'Failed to send verification email',
            });
        }
    }
}
// client nhập code mail để so sanh với code trong db
const verifiedMail = async (req, res, next) => {
    const { email } = req.body;
    const codeMail = req.params.codeMail;

    console.log(`Đang xác thực mã ${codeMail} cho email ${email}`);

    if (!email) {
        return res.status(400).json({
            err: 1,
            msg: "Email is required for verification"
        });
    }

    try {
        const resCode = await VeriMail.findOne({ email });

        if (!resCode) {
            return res.status(400).json({
                err: 1,
                msg: "Không tìm thấy mã xác thực cho email này"
            });
        }

        console.log(`Mã trong DB: ${resCode.code}, Mã nhận được: ${codeMail}`);

        if (codeMail === resCode.code) {
            // Lưu thông tin xác thực vào request để sử dụng ở middleware tiếp theo
            req.verifiedEmail = email;
            next();
        } else {
            return res.status(400).json({
                err: 1,
                msg: "Mã xác thực không đúng"
            });
        }
    } catch (err) {
        console.error("Lỗi xác thực:", err);
        return res.status(500).json({
            err: 1,
            msg: "Lỗi server khi xác thực email"
        });
    }
}

// Middleware để kiểm tra xem email đã được xác thực chưa
const checkVerifiedEmail = (req, res, next) => {
    if (!req.verifiedEmail) {
        return res.status(401).json({
            err: 1,
            msg: "Email chưa được xác thực"
        });
    }
    next();
}

const sendPasswordResetEmail = async (email, resetLink) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { createCodeVery, verifiedMail, checkVerifiedEmail, sendPasswordResetEmail };
