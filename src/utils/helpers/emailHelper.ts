// emailHelper.ts
import nodemailer from 'nodemailer';
const getFieldValue = (field) => Array.isArray(field) ? field[0] : field;

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender address
    to,
    subject,
    html: htmlContent,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const sendEmailWithAttachment = async (fields: any, file: any) => {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    const emailBody = `
    <p>Please find the details provided by the customer below:</p>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <th>Email</th>
        <td>${getFieldValue(fields.email)}</td>
      </tr>
      <tr>
        <th>First Name</th>
        <td>${getFieldValue(fields.firstName)}</td>
      </tr>
      <tr>
        <th>Last Name</th>
        <td>${getFieldValue(fields.lastName)}</td>
      </tr>
      <tr>
        <th>Order Reference Number</th>
        <td>${getFieldValue(fields.orderReferenceNumber)}</td>
      </tr>
      <tr>
        <th>Type</th>
        <td>${getFieldValue(fields.type)}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>${getFieldValue(fields.message)}</td>
      </tr>
      <tr>
        <th>Phone Number</th>
        <td>${getFieldValue(fields.phoneNumber)}</td>
      </tr>
      <tr>
        <th>Email Marketing Opt-In</th>
        <td>${getFieldValue(fields.emailMarketing) === 'true' ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <th>Privacy Policy</th>
        <td>${getFieldValue(fields.privacyPolicy) === 'true' ? 'Yes' : 'No'}</td>
      </tr>
    </table>
  `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER, // Sender address
      to: process.env.SEDDIQI_SUPPORT_EMAIL,
      subject: 'Ahmed Seddiqi & Sons - Contact Us Query',
      html: emailBody,
      ...(file && file.originalFilename && {
        attachments: [
          {
            filename: file.originalFilename,
            path: file.filepath,
          },
        ],
      }),
    }
  
    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  };
