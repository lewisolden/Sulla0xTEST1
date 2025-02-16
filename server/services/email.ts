import { Resend } from 'resend';

let resend: Resend;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

function validateEmailConfig() {
  const requiredVars = ['RESEND_API_KEY'];
  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    } else {
      console.warn(`Warning: Missing environment variables: ${missing.join(', ')}. Using defaults for development.`);
    }
  }
}

function initializeEmailClients() {
  validateEmailConfig();

  // Initialize Resend
  if (!resend && process.env.RESEND_API_KEY) {
    console.log('Initializing Resend client...');
    resend = new Resend(process.env.RESEND_API_KEY);
  }
}

function generateEmailTemplate(username: string, appUrl: string) {
  console.log('Generating email template for user:', username);
  const template = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Sulla!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7ff;">
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #3b82f6;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <h1 style="color: #ffffff; font-size: 48px; margin: 0;">Sulla</h1>
              <p style="color: #ffffff; font-size: 24px; margin-top: 16px;">Your Gateway to Emerging Technologies</p>
            </td>
          </tr>
        </table>

        <!-- Main Content -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
                <tr>
                  <td style="background-color: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <h2 style="color: #1e3a8a; font-size: 28px; margin: 0 0 24px 0; text-align: center;">
                      Welcome ${username}!
                    </h2>

                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                      We're excited to have you join Sulla's innovative learning platform. Get ready to explore the fascinating worlds of Artificial Intelligence and Blockchain technology through our interactive courses.
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 32px 0;">
                      <a href="${appUrl}/login" 
                         style="display: inline-block; padding: 16px 36px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">
                        Start Learning Now
                      </a>
                    </div>

                    <!-- Features Grid -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                      <tr>
                        <td colspan="2">
                          <h3 style="color: #1e3a8a; font-size: 24px; margin: 0 0 24px 0; text-align: center;">
                            Why Choose Sulla
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 12px;">
                          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                            <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Interactive Learning</h4>
                            <p style="color: #6b7280; margin: 0; font-size: 14px;">
                              Engage with hands-on projects and real-world applications
                            </p>
                          </div>
                        </td>
                        <td width="50%" style="padding: 12px;">
                          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                            <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">AI-Powered Platform</h4>
                            <p style="color: #6b7280; margin: 0; font-size: 14px;">
                              Experience personalized learning paths
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  return template;
}

async function sendTestEmail() {
  try {
    if (!resend) {
      initializeEmailClients();
    }

    console.log('Sending test email using Resend...');
    const emailTemplate = generateEmailTemplate('Test User', process.env.APP_URL || 'http://localhost:5000');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev', // Resend's test email address
      subject: 'Welcome to Sulla Learning Platform!',
      html: emailTemplate,
    });

    if (error) {
      console.error('Failed to send test email:', error);
      return {
        success: false,
        error: error
      };
    }

    console.log('Test email sent successfully:', {
      messageId: data?.id
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

async function sendWelcomeEmail(email: string, username: string) {
  try {
    console.log('Starting welcome email sending process for:', email);

    if (!resend) {
      console.log('Email client not initialized, initializing now...');
      initializeEmailClients();
    }

    const appUrl = process.env.APP_URL || 'http://localhost:5000';
    console.log('Using app URL:', appUrl);

    const emailTemplate = generateEmailTemplate(username, appUrl);

    let lastError: any;
    // Implement retry logic
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt} of ${MAX_RETRIES} to send welcome email to:`, email);

        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Always use Resend's testing domain
          to: email,
          subject: 'Welcome to Sulla Learning Platform!',
          html: emailTemplate,
        });

        if (error) {
          lastError = error;
          console.error(`Failed attempt ${attempt}:`, error);

          if (attempt < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
            continue;
          }

          return {
            sent: false,
            error: error,
            note: "We encountered an issue sending your welcome email. Please check your email address or try again later."
          };
        }

        console.log('Welcome email sent successfully:', {
          messageId: data?.id,
          to: email
        });

        return {
          sent: true,
          messageId: data?.id,
          note: "Welcome email sent successfully! Check your inbox for getting started instructions."
        };

      } catch (attemptError) {
        lastError = attemptError;
        console.error(`Error in attempt ${attempt}:`, attemptError);
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
          continue;
        }
      }
    }

    throw lastError; // If all retries failed
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }

    return {
      sent: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      note: process.env.NODE_ENV === 'production'
        ? "We encountered an issue sending your welcome email. Our team has been notified."
        : "Email sending failed. Make sure all required environment variables are set: RESEND_API_KEY"
    };
  }
}

async function verifyEmailService() {
  try {
    initializeEmailClients();
    return {
      initialized: true,
      resendAvailable: !!process.env.RESEND_API_KEY,
      clientStatus: 'ready'
    };
  } catch (error) {
    return {
      initialized: false,
      resendAvailable: !!process.env.RESEND_API_KEY,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export {
  sendTestEmail,
  initializeEmailClients,
  sendWelcomeEmail,
  verifyEmailService
};