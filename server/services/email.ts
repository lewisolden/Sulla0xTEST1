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
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
      <title>Welcome to Sulla!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7ff; color: #374151; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="min-width: 100%; background-color: #3b82f6;">
        <tr>
          <td align="center" style="padding: 48px 20px; text-align: center; background-color: #3b82f6; background-image: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
            <h1 style="font-size: 48px; font-weight: 800; margin: 0; padding: 0; color: #ffffff;">
              S<span style="font-weight: 400;">ulla</span>
            </h1>
            <p style="font-size: 24px; margin-top: 16px; color: #ffffff; opacity: 0.9;">
              Your Gateway to Emerging Technologies
            </p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td style="background-color: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                  <h2 style="color: #1e3a8a; font-size: 28px; margin: 0 0 24px 0; text-align: center;">
                    Welcome to the Future of Learning, ${username}!
                  </h2>

                  <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px; text-align: center;">
                    Embark on an exciting journey into the world of emerging technologies with Sulla's innovative learning platform. Our curriculum combines cutting-edge content with hands-on experience in both Artificial Intelligence and Blockchain technology.
                  </p>

                  <div style="text-align: center; margin: 32px 0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="background-image: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <a href="${appUrl}/login" style="display: inline-block; padding: 16px 36px; color: #ffffff; font-family: sans-serif; font-size: 18px; font-weight: bold; line-height: 24px; text-align: center; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; -webkit-text-size-adjust: none;">Start Learning Now</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="border-top: 2px solid #e5e7eb; padding-top: 32px;">
                        <h3 style="color: #1e3a8a; font-size: 24px; margin: 0 0 24px 0; text-align: center;">Explore Our Featured Courses</h3>
                      </td>
                    </tr>
                  </table>

                  <!-- Course 1 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                    <tr>
                      <td style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <span style="font-size: 32px; margin-right: 12px; background-color: #dbeafe; padding: 12px; border-radius: 12px; display: inline-block;">🔗</span>
                              <span style="color: #1e3a8a; font-size: 22px; font-weight: bold;">Course 1: Introduction to Cryptocurrency</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px; color: #374151; line-height: 1.6;">
                              Master the fundamentals of cryptocurrency and blockchain technology through our comprehensive learning path. From basic concepts to advanced applications, this course provides a solid foundation in digital assets and decentralized systems.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 1 - Introduction to Digital Currency</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 2 - Understanding Cryptocurrency Security</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 3 - Practical Applications</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 4 - Getting Started Safely</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Bitcoin</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Ethereum</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Smart Contracts</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">DeFi</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Course 2 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                    <tr>
                      <td style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <span style="font-size: 32px; margin-right: 12px; background-color: #dbeafe; padding: 12px; border-radius: 12px; display: inline-block;">🤖</span>
                              <span style="color: #1e3a8a; font-size: 22px; font-weight: bold;">Course 2: Introduction to AI</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px; color: #374151; line-height: 1.6;">
                              Explore the fascinating world of artificial intelligence through our structured learning modules. From theoretical foundations to practical applications, gain the skills needed to understand and work with AI technologies.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 1.1 - Introduction to Artificial Intelligence</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 1.2 - How AI Works</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 1.3 - Machine Learning Basics</td>
                                </tr>
                                <tr>
                                  <td style="color: #374151; padding: 8px 0 8px 24px;">➜ Topic 1.4 - Neural Networks and Deep Learning</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Machine Learning</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Neural Networks</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">Computer Vision</span>
                                    <span style="display: inline-block; padding: 6px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 20px; font-size: 14px; margin: 4px;">NLP</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="border-top: 2px solid #e5e7eb; padding-top: 32px;">
                        <h3 style="color: #1e3a8a; font-size: 24px; margin: 0 0 24px 0; text-align: center;">Why Choose Sulla</h3>
                      </td>
                    </tr>
                  </table>

                  <!-- Features Grid -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0;">
                    <tr>
                      <td width="50%" style="padding: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background-color: #f8fafc; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                              <div style="font-size: 24px; margin-bottom: 12px; background-color: #dbeafe; width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; text-align: center;">💡</div>
                              <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Interactive Learning</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                                Engage with hands-on projects and real-world applications
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td width="50%" style="padding: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background-color: #f8fafc; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                              <div style="font-size: 24px; margin-bottom: 12px; background-color: #dbeafe; width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; text-align: center;">🎯</div>
                              <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">AI-Powered Platform</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                                Experience personalized learning paths and adaptive content
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" style="padding: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background-color: #f8fafc; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                              <div style="font-size: 24px; margin-bottom: 12px; background-color: #dbeafe; width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; text-align: center;">📊</div>
                              <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Progress Tracking</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                                Monitor your journey with our achievement system
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td width="50%" style="padding: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background-color: #f8fafc; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                              <div style="font-size: 24px; margin-bottom: 12px; background-color: #dbeafe; width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; text-align: center;">👥</div>
                              <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Expert Support</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                                Join our community of learners and experts
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <div style="text-align: center;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="background-image: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <a href="${appUrl}/login" style="display: inline-block; padding: 16px 36px; color: #ffffff; font-family: sans-serif; font-size: 18px; font-weight: bold; line-height: 24px; text-align: center; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; -webkit-text-size-adjust: none;">Begin Your Learning Journey</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  console.log('Generated template length:', template.length);
  return template;
}

export async function sendTestEmail() {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    const fromEmail = 'test@updates.sullacrypto.com';
    const appUrl = process.env.APP_URL || 'http://localhost:5000';

    console.log('Generating test email template...');
    const emailTemplate = generateEmailTemplate('Test User', appUrl);
    console.log('Template generated, length:', emailTemplate.length);

    console.log('Attempting to send test email...', {
      from: fromEmail,
      timestamp: new Date().toISOString()
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'lewis@sullacrypto.com',
      subject: 'Test Email from Sulla',
      html: emailTemplate,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
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

    console.log('Generating welcome email template...');
    const emailTemplate = generateEmailTemplate(username, appUrl);
    console.log('Template generated, length:', emailTemplate.length);

    console.log('Attempting to send welcome email:', {
      to: email,
      from: fromEmail,
      subject: 'Welcome to Sulla Learning Platform!'
    });

    const { data, error } = await resend.emails.send({
      from: `${fromEmail.name} <${fromEmail.email}>`,
      to: email,
      subject: 'Welcome to Sulla Learning Platform!',
      html: emailTemplate
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