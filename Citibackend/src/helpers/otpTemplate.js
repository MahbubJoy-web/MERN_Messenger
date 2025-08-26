const otpVerificationTemplate = (lastName, otp) => {
    return `
         <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Your Secure OTP</title>
  <style>
    @media only screen and (max-width:600px){
      .inner { width:100% !important; }
      .otp-code { font-size:28px !important; letter-spacing:6px !important; }
      .p-sm{ font-size:14px !important; }
    }
    body { margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; display:flex !important; justify-content:center !important; align-items:center !important; }
    img { border:0; -ms-interpolation-mode:bicubic; display:block; }
    a { color:inherit; text-decoration:none; }
  </style>
</head>
<body style="font-family:Inter, Arial, Helvetica, sans-serif; color:#0b1220; display:flex; justify-content:center; align-items:center; min-width:100%; min-height:100vh;">

  <table width="100%" style="width: 100%; height: 100vh; display: flex; justify-content: center;">
    <tr>
      <td style="padding:28px;">
        <table class="inner" width="600px" style="width:600px;max-width:100%;border-radius:16px;overflow:hidden; background:#ffffff; border: 1px solid #4b4b4b;">
          <tr>
            <td style="background:#fff;" align="center">
              <img src="https://static.vecteezy.com/system/resources/previews/021/179/544/non_2x/send-email-icon-email-and-paper-airplane-icon-free-png.png"
                   alt="Email Icon"
                   width="200"
                   style="display:block; margin:0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:22px 28px 18px;color:#0b1220;">
              <p class="p-sm" style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.5;">
                Hi ${lastName}
              </p>
              <h2 style="margin:0 0 8px;font-size:20px;">Your verification code</h2>
              <p class="p-sm" style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.5;">
                Use the one-time verification code below to confirm your email address. The code automatically expires after 3 minutes.
                If you didn't request this code, you can ignore this message.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:10px 0 20px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" role="presentation" style="background:linear-gradient(90deg,#b9e76e9a,#606ffa);color:#e6fdf6;border-radius:12px;padding:18px 22px;display:inline-block;">
                      <tr>
                        <td style="vertical-align:middle;padding-right:12px;">
                          <img src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="" style="width: 50px;">
                        </td>
                        <td style="vertical-align:middle;">
                          <div style="font-family: monospace, 'Courier New', Courier; font-size:30px; font-weight:800; letter-spacing:7px;text-align: center;" class="otp-code">
                            ${otp}
                          </div>
                          <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px;">One-time code — valid for 3 minutes</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
                <tr>
                  <td align="center">
                    <a href="http://localhost:3000/auth/buttonVerify" style="display:inline-block;padding:12px 22px;border-radius:10px;background:linear-gradient(90deg,#6ee7b79a,#60a5fa);color:#062024;font-weight:700;font-size:14px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 18px 20px;background:#fbfffe;color:#475569;font-size:12px;">
              <table width="100%" role="presentation">
                <tr>
                  <td>
                    <div style="font-weight:700;color:#0b1220;">MERN_Messenger</div>
                    <div style="margin-top:6px;color:#6b7280;font-size:12px;">Sylhet, Bangladesh</div>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <div style="color:#9ca3af;">&copy; <span id="yr">2025</span></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <div style="display:none !important; white-space:nowrap; font:15px/1px monospace;">
    Your OTP is: ${otp} — expires in 3 minutes. Verify: http://localhost:3000/auth/otpVerification
  </div>
</body>
</html>
    `;
};


module.exports= { otpVerificationTemplate}