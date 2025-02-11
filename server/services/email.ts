import { Resend } from 'resend';

let resend: Resend;

// Initialize Resend with API key
function initializeResend() {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    throw new Error('RESEND_API_KEY environment variable must be set');
  }
  console.log('Initializing Resend client...');
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function sendTestEmail() {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    // Use the exact email format for testing
    const fromEmail = 'test@mail.sullacrypto.com';

    console.log('Attempting to send test email...', {
      from: fromEmail,
      timestamp: new Date().toISOString()
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'lewis@sullacrypto.com',
      subject: 'Test Email from Sulla Platform',
      html: '<h1>Test Email</h1><p>This is a test email from Sulla Platform.</p>'
    });

    if (error) {
      console.error('Failed to send test email:', error);
      return {
        success: false,
        error: error
      };
    }

    console.log('Test email sent successfully:', {
      messageId: data?.id,
      timestamp: new Date().toISOString()
    });
    return {
      success: true,
      messageId: data?.id
    };
  } catch (error) {
    console.error('Error sending test email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    const fromEmail = 'test@mail.sullacrypto.com';
    const appUrl = process.env.APP_URL || 'http://localhost:5000';

    console.log('Attempting to send welcome email:', {
      to: email,
      from: fromEmail,
      subject: 'Welcome to Sulla Learning Platform!'
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
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
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      return {
        sent: false,
        note: "Your account is ready! Note: Email sending is temporarily unavailable."
      };
    }

    console.log('Welcome email sent successfully:', {
      messageId: data?.id,
      to: email
    });

    return {
      sent: true,
      note: "Welcome email sent successfully! Check your inbox for getting started instructions."
    };

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return {
      sent: false,
      note: "Your account is ready! Note: Email notifications will be enabled soon."
    };
  }
}