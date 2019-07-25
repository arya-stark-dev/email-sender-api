import sendGridMailService from '@sendgrid/mail';
require('dotenv').config({ silent: true });

sendGridMailService.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const msg = {
    to: `${req.body.receiverName} <${req.body.receiver}>`,
    from: `${req.body.senderName} <${req.body.sender}>`,
    subject: req.body.subject,
    html: req.body.content,
  };

  try {
    // const response = await sendGridMailService.send(msg);
    console.log({msg})
    return res.status(200).json({ data: 'I was sent' });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
};

export default {
  sendEmail,
};