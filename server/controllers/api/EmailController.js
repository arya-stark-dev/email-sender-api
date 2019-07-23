import sendGridMailService from '@sendgrid/mail';
require('dotenv').config({ silent: true });

sendGridMailService.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const msg = {
    to: req.body.receiver,
    from: req.body.sender,
    subject: req.body.subject,
    text: req.body.content,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    const response = await sendGridMailService.send(msg);
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
};

export default {
  sendEmail,
};