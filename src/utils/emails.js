import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (res, req, next) =>{
  try {
    const msg = {
      to: 'testing@example.com',
      from: 'cyclopsteam@example.com',
      subject: 'Testing our email sender',
      text: 'Cyclops team is more like a family',
      html: '<strong>Cyclops team is more like a family</strong>',
    };
    sgMail.send(msg).res.status(201).json({ message: 'email sent successfuly' });
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Email not sent' });
  };
};
export default sendEmail;
