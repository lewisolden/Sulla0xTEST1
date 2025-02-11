import mailgun from 'mailgun-js';

let mg: mailgun.Mailgun;

function initializeMailgun() {
  try {
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;

    if (!apiKey || !domain) {
      console.error('Missing Mailgun credentials');
      return false;
    }

    console.log('Initializing Mailgun with:', {
      domain,
      hasApiKey: !!apiKey,
      endpoint: 'api.eu.mailgun.net'
    });

    mg = mailgun({
      apiKey,
      domain,
      host: 'api.eu.mailgun.net'
    });

    return true;
  } catch (error) {
    console.error('Mailgun initialization error:', error);
    return false;
  }
}

export async function sendTestEmail(toEmail?: string) {
  try {
    if (!mg && !initializeMailgun()) {
      throw new Error('Failed to initialize Mailgun');
    }

    const recipientEmail = toEmail || 'lewis@sullacrypto.com';

    console.log('Sending test email to:', recipientEmail);

    const data = {
      from: `Sulla Learning <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: recipientEmail,
      subject: 'Test Email from Sulla Platform',
      text: 'This is a test email from the Sulla Learning Platform.',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the Sulla Learning Platform.</p>
        <p>Time sent: ${new Date().toISOString()}</p>
      `
    };

    const result = await new Promise((resolve, reject) => {
      mg.messages().send(data, (error: any, body: any) => {
        if (error) {
          console.error('Email send error:', {
            status: error.statusCode,
            message: error.message,
            details: error.details
          });
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    if (!mg && !initializeMailgun()) {
      throw new Error('Failed to initialize Mailgun');
    }

    const data = {
      from: `Sulla Learning <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: email,
      subject: 'Welcome to Sulla Learning Platform!',
      html: `
        <h1>Welcome to Sulla, ${username}!</h1>
        <p>Thank you for joining our learning platform.</p>
        <p>Start your learning journey today!</p>
      `
    };

    const response = await new Promise((resolve, reject) => {
      mg.messages().send(data, (error: any, body: any) => {
        if (error) {
          console.error('Mailgun API error:', {
            message: error.message,
            stack: error.stack,
            details: error.toString(),
            statusCode: error.statusCode,
            response: error.response
          });
          reject(error);
        } else {
          console.log('Mailgun API response:', body);
          resolve(body);
        }
      });
    });

    console.log('Welcome email sent successfully:', { response, to: email });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to send welcome email:', {
        error: error.message,
        stack: error.stack,
        name: error.name
      });
    } else {
      console.error('Failed to send welcome email with unknown error:', error);
    }
    return false;
  }
}