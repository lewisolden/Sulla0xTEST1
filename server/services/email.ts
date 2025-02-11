import mailgun from 'mailgun-js';

let mg: mailgun.Mailgun;

function initializeMailgun() {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error('MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables must be set');
    throw new Error('Required Mailgun environment variables are not set');
  }

  console.log('Initializing Mailgun client with:', {
    domain: process.env.MAILGUN_DOMAIN,
    apiKeyPresent: !!process.env.MAILGUN_API_KEY,
  });

  mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    host: 'api.mailgun.net'
  });
}

export async function sendTestEmail(toEmail?: string) {
  try {
    if (!mg) {
      console.log('Initializing Mailgun client...');
      initializeMailgun();
    }

    const recipientEmail = toEmail || 'lewis@sullacrypto.com';
    const senderEmail = `Sulla Learning <mailgun@${process.env.MAILGUN_DOMAIN}>`;

    console.log('Attempting to send test email:', {
      to: recipientEmail,
      from: senderEmail,
      timestamp: new Date().toISOString()
    });

    const data = {
      from: senderEmail,
      to: recipientEmail,
      subject: 'Test Email from Sulla Platform',
      html: `
        <!DOCTYPE html>
        <html>
        <body>
          <h1>Test Email</h1>
          <p>This is a test email from the Sulla Learning Platform.</p>
          <p>If you receive this, the email service is working correctly.</p>
          <p>Time sent: ${new Date().toISOString()}</p>
        </body>
        </html>
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

    console.log('Test email sent successfully:', {
      response,
      recipient: recipientEmail
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending test email:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error('Unknown error sending test email:', error);
    }
    return false;
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    if (!mg) {
      console.log('Initializing Mailgun client...');
      initializeMailgun();
    }

    const recipientEmail = process.env.NODE_ENV === 'production' 
      ? email 
      : 'lewis@sullacrypto.com';

    const senderEmail = `Sulla Learning <mailgun@${process.env.MAILGUN_DOMAIN}>`;
    const appUrl = process.env.APP_URL || 'http://localhost:5000';

    console.log('Attempting to send welcome email:', {
      to: recipientEmail,
      from: senderEmail,
      subject: 'Welcome to Sulla Learning Platform!'
    });

    const data = {
      from: senderEmail,
      to: recipientEmail,
      subject: 'Welcome to Sulla Learning Platform!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Sulla!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f7ff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 30px 0; text-align: center; background-color: #3b82f6;">
                <h1 style="color: white; margin: 0; font-size: 36px;">SULLA</h1>
                <p style="color: white; margin: 10px 0 0; font-size: 18px;">Your Journey to Web3 Mastery</p>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 30px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #1e3a8a; margin: 0 0 20px;">Welcome to Sulla, ${username}!</h2>
                      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Your journey into blockchain technology begins now. We're excited to have you join our community of learners passionate about mastering Web3 technologies.
                      </p>

                      <h3 style="color: #2563eb; margin: 30px 0 15px;">What's Next?</h3>
                      <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">✨ Explore interactive learning modules</li>
                        <li style="margin-bottom: 10px;">📚 Access expert-curated content</li>
                        <li style="margin-bottom: 10px;">💡 Work on practical projects</li>
                        <li style="margin-bottom: 10px;">📊 Track your progress</li>
                      </ul>

                      <div style="text-align: center; margin: 40px 0;">
                        <a href="${appUrl}/modules/module1" 
                           style="display: inline-block; background-color: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                          Start Your First Module
                        </a>
                      </div>

                      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 30px 0 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        Need help getting started? Reply to this email or reach out to our support team. We're here to help!
                      </p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto 0;">
                  <tr>
                    <td style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                      <p style="margin: 0 0 10px;">© 2025 Sulla Learning Platform. All rights reserved.</p>
                      <p style="margin: 0;">
                        Our address: 123 Blockchain Street, Crypto City, CC 12345
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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

    console.log('Welcome email sent successfully:', {
      response,
      to: recipientEmail
    });
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