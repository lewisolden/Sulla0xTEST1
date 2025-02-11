import { Resend } from 'resend';

let resend: Resend;

// Initialize Resend with API key
function initializeResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable must be set');
  }
  resend = new Resend(process.env.RESEND_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    if (!process.env.APP_URL) {
      console.error('APP_URL environment variable is not set');
      return false;
    }

    // In development/testing, only send to verified email
    const allowedTestEmail = 'lewis@sullacrypto.com';
    const recipientEmail = process.env.NODE_ENV === 'production' ? email : allowedTestEmail;

    // Use Resend's default verified domain for testing
    const fromEmail = 'onboarding@resend.dev';

    console.log('Attempting to send welcome email:', {
      to: recipientEmail,
      from: fromEmail,
      subject: 'Welcome to Sulla Learning Platform!'
    });

    const emailParams = {
      from: fromEmail,
      to: recipientEmail,
      subject: 'Welcome to Sulla Learning Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6; text-align: center;">Welcome to Sulla!</h1>
          <p style="font-size: 16px;">Dear ${username},</p>
          <p style="font-size: 16px;">Thank you for joining Sulla - your gateway to mastering blockchain technology!</p>
          <p style="font-size: 16px;">Here's what you can expect:</p>
          <ul style="font-size: 16px;">
            <li>Interactive learning experiences</li>
            <li>Expert-led content</li>
            <li>Practical projects</li>
            <li>Progress tracking</li>
          </ul>
          <p style="font-size: 16px;">Ready to start your journey? Click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_URL}/modules/module1" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Start Learning
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            If you have any questions, feel free to reply to this email.
          </p>
        </div>
      `
    };

    console.log('Sending email with Resend...');
    const response = await resend.emails.send(emailParams);
    console.log('Resend API response:', JSON.stringify(response, null, 2));

    // Check for specific error responses from Resend
    if (response.error) {
      console.error('Resend API error:', {
        statusCode: response.error.statusCode,
        message: response.error.message,
        name: response.error.name
      });
      return false;
    }

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