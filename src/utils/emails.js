import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @name sendEmail
 * @async
 * @description function for sending emails to users
 * @param {Srting} receiver email of the receipient
 * @param {Srting} subject subject of email to be sent
 *  @param {Srting} content content text to be sent to user
 *   @returns {Boolean} true for successful email sending or error on failure
 */
const sendEmail = async (receiver, subject, content) => {
  const data = {
    to: receiver,
    from: 'cyclopsteam@example.com',
    subject,
    html: content,
  };

  try {
    return sgMail.send(data);
  } catch (error) {
    return error;
  }
};
export default sendEmail;
