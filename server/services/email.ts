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

    // Use the new domain for sending emails
    const fromEmail = 'test@updates.sullacrypto.com';

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

    const fromEmail = {
      name: 'Sulla',
      email: 'welcome@updates.sullacrypto.com'
    };

    const appUrl = process.env.APP_URL || 'http://localhost:5000';

    console.log('Attempting to send welcome email:', {
      to: email,
      from: fromEmail,
      subject: 'Welcome to Sulla Learning Platform!'
    });

    const { data, error } = await resend.emails.send({
      from: `${fromEmail.name} <${fromEmail.email}>`,
      to: email,
      subject: 'Welcome to Sulla Learning Platform!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Sulla!</title>
          <style>
            .feature-grid {
              display: inline-block;
              width: 100%;
              max-width: 500px;
              margin: 20px auto;
            }
            .feature-item {
              display: inline-block;
              width: 45%;
              margin: 10px;
              padding: 15px;
              background: #f8fafc;
              border-radius: 8px;
              vertical-align: top;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f7ff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);">
                <h1 style="color: white; margin: 0; font-size: 42px; font-weight: 800;">SULLA</h1>
                <p style="color: white; margin: 15px 0 0; font-size: 20px; font-weight: 300;">Your Gateway to Blockchain Mastery</p>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 40px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #1e3a8a; margin: 0 0 25px; font-size: 28px;">Welcome to the Future of Learning, ${username}!</h2>

                      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                        You've just joined an elite community of learners dedicated to mastering blockchain technology and cryptocurrency. Our platform combines cutting-edge curriculum with interactive learning experiences to make your journey both engaging and effective.
                      </p>

                      <h3 style="color: #2563eb; margin: 35px 0 20px; font-size: 22px;">Your Learning Journey Includes:</h3>

                      <div class="feature-grid">
                        <div class="feature-item">
                          <h4 style="color: #1e3a8a; margin: 0 0 10px;">Comprehensive Courses</h4>
                          <p style="color: #4b5563; margin: 0; font-size: 14px;">
                            From blockchain basics to advanced smart contracts
                          </p>
                        </div>
                        <div class="feature-item">
                          <h4 style="color: #1e3a8a; margin: 0 0 10px;">Interactive Learning</h4>
                          <p style="color: #4b5563; margin: 0; font-size: 14px;">
                            Hands-on exercises and real-world projects
                          </p>
                        </div>
                        <div class="feature-item">
                          <h4 style="color: #1e3a8a; margin: 0 0 10px;">Progress Tracking</h4>
                          <p style="color: #4b5563; margin: 0; font-size: 14px;">
                            Monitor your growth with achievements and badges
                          </p>
                        </div>
                        <div class="feature-item">
                          <h4 style="color: #1e3a8a; margin: 0 0 10px;">Community Support</h4>
                          <p style="color: #4b5563; margin: 0; font-size: 14px;">
                            Learn alongside fellow blockchain enthusiasts
                          </p>
                        </div>
                      </div>

                      <h3 style="color: #2563eb; margin: 35px 0 20px; font-size: 22px;">Available Courses:</h3>
                      <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px; padding-left: 20px;">
                        <li style="margin-bottom: 15px;">📘 <strong>Blockchain Fundamentals:</strong> Understanding the core concepts</li>
                        <li style="margin-bottom: 15px;">💰 <strong>Cryptocurrency Essentials:</strong> Deep dive into digital assets</li>
                        <li style="margin-bottom: 15px;">🔗 <strong>Smart Contracts:</strong> Building on Ethereum</li>
                        <li style="margin-bottom: 15px;">📊 <strong>DeFi Masterclass:</strong> Exploring decentralized finance</li>
                      </ul>

                      <div style="text-align: center; margin: 40px 0;">
                        <a href="${appUrl}/curriculum" 
                           style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; transition: all 0.3s ease;">
                          Start Your Journey Now
                        </a>
                      </div>

                      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 35px 0 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        Have questions or need assistance? Our support team is here to help! Simply reply to this email or visit our help center.
                      </p>

                      <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #6b7280; font-size: 14px;">
                          Follow us for updates and tips:
                          <br>
                          <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Twitter</a>
                        </p>
                      </div>
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