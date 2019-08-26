import sgMail from '@sendgrid/mail';
import '@babel/polyfill';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/**
 * @name sendEmail
 * @async
 * @description function for sending emails to users
 * @param {String} receiver email of the receipient
 * @param {String} subject subject of email to be sent
 * @param {String} content content text to be sent to user
 * @return {objects} return true for successful email sending or error on failure
 */
const sendEmail = async (receiver, subject, content) => {
  const data = {
    to: receiver,
    from: 'cyclopsteam@andela.com',
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
