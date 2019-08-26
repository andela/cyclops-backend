import dotenv from 'dotenv';
import sendEmail from '../utils/emails';

dotenv.config();

/**
 * @name sendVerificationEmail
 * @param {Object} data object with user details
 * @returns {Function} function that sends verification email to users
 */
const sendVerificationEmail = (data) => {
  const { name, email, url } = data;
  const content = `
<html>
<head>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<style>
body { font-family: Montserrat; font-style: normal; color: #505050} 
.logo { font-weight: normal;font-size: 30px;line-height: 37px;color:#505050; margin-left:20px } .container { margin: 0 7% } .forget__password { font-weight: 500; font-size: 22px; line-height: 30px; text-align:center } button { background: #505050; color: #ffffff; width: 205px; height: 40px; display: block; margin:auto; margin-top:40px; decoration: none } button:focus {outline:0;} .near__foot { margin-top:40px; width: 100%; height: 56px; background: #505050; } .link__text { padding-bottom:50px; margin: 30px 45px; color: #ffffff; font-size: 12px; } .link__text span { color: #D7B914 } .footer { display: flex; justify-content: space-around; margin-top: 20px; margin-bottom:40px } .inner_body { color: #505050 }
</style>
</head>
<body class="container>

<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
 <div style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
  <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
    <tr>
      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">NOMAD</td>
      <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
        <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
          <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">confirm your account</span>
          <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
            <tr>
              <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi ${name},</p>
                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Welcome to Nomad Barefoot company plc. We wish you a wonderful experience even as you start your journey today.</p>
                      <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                        <tbody>
                          <tr>
                            <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                <tbody>
                                  <tr>
                                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="${url}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Verify Account</a> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Your Journey to the world begins here.</p>
                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Cyclops team loves you</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
              <tr>
                <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                  <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Barefoot Nomad Inc, Road 1 House 4, Udoka Housing Estate, Awka, Anambra state, Nigeria </span>
                  <br> Don't like these emails? <a href="${url}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.
                </td>
              </tr>
              <tr>
                <td style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                  Powered by <a href="url" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Cyclops Team</a>.
                </td>
              </tr>
            </table>
          </div>
        </div>
      </td>
      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    </tr>
  </table>
  </div>
  </body>
  </html>`;
  return sendEmail(email, 'Verify Email', content);
};
export default sendVerificationEmail;
