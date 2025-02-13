import { Resend } from 'resend';

let resend: Resend;

function initializeResend() {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    throw new Error('RESEND_API_KEY environment variable must be set');
  }
  console.log('Initializing Resend client...');
  resend = new Resend(process.env.RESEND_API_KEY);
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

                    <!-- Featured Courses -->
                    <h3 style="color: #1e3a8a; font-size: 24px; margin: 32px 0 24px 0;">Your Learning Journey Begins Here</h3>

                    <!-- Cryptocurrency Course -->
                    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                      <h4 style="color: #1e3a8a; font-size: 20px; margin: 0 0 16px 0;">
                        Course 1: Introduction to Cryptocurrency
                      </h4>
                      <p style="color: #374151; margin: 0 0 16px 0;">
                        Master the fundamentals of cryptocurrency through interactive learning and practical exercises.
                      </p>
                      <ul style="color: #374151; margin: 0 0 16px 0; padding-left: 20px;">
                        <li>Understanding Digital Currency</li>
                        <li>Cryptocurrency Security</li>
                        <li>Practical Applications</li>
                        <li>Interactive Exercises</li>
                      </ul>
                    </div>

                    <!-- AI Course -->
                    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                      <h4 style="color: #1e3a8a; font-size: 20px; margin: 0 0 16px 0;">
                        Course 2: Introduction to AI
                      </h4>
                      <p style="color: #374151; margin: 0 0 16px 0;">
                        Explore the fascinating world of artificial intelligence through our structured learning modules.
                      </p>
                      <ul style="color: #374151; margin: 0 0 16px 0; padding-left: 20px;">
                        <li>AI Fundamentals</li>
                        <li>Machine Learning Basics</li>
                        <li>Neural Networks</li>
                        <li>Practical Applications</li>
                      </ul>
                    </div>

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
                      <tr>
                        <td width="50%" style="padding: 12px;">
                          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                            <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Progress Tracking</h4>
                            <p style="color: #6b7280; margin: 0; font-size: 14px;">
                              Monitor your journey with our achievement system
                            </p>
                          </div>
                        </td>
                        <td width="50%" style="padding: 12px;">
                          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                            <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Expert Support</h4>
                            <p style="color: #6b7280; margin: 0; font-size: 14px;">
                              Join our community of learners and experts
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
      initializeResend();
    }

    console.log('Sending test email using Resend...');
    const emailTemplate = generateEmailTemplate('Test User', 'http://localhost:5000');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'lewis@sullacrypto.com',
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
    if (!resend) {
      initializeResend();
    }

    const fromEmail = {
      name: 'Sulla',
      email: 'onboarding@resend.dev'
    };

    const appUrl = process.env.APP_URL || 'http://localhost:5000';
    const emailTemplate = generateEmailTemplate(username, appUrl);

    console.log('Sending welcome email to:', email);

    const { data, error } = await resend.emails.send({
      from: `${fromEmail.name} <${fromEmail.email}>`,
      to: email,
      subject: 'Welcome to Sulla Learning Platform!',
      html: emailTemplate,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      return {
        sent: false,
        error: error,
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
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      note: "Your account is ready! Note: Email notifications will be enabled soon."
    };
  }
}

export {
  sendTestEmail,
  initializeResend,
  sendWelcomeEmail
};