import { Resend } from 'resend';

let resend: Resend;

// Initialize Resend with API key
function initializeResend() {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    throw new Error('RESEND_API_KEY environment variable must be set');
  }

  const apiKey = process.env.RESEND_API_KEY;
  console.log('Initializing Resend client with configuration:', {
    keyLength: apiKey.length,
    keyPrefix: apiKey.substring(0, 4) + '...',
    keyValid: apiKey.startsWith('re_'),
    environment: process.env.NODE_ENV || 'development'
  });

  if (!apiKey.startsWith('re_')) {
    throw new Error('Invalid Resend API key format. Key should start with "re_"');
  }

  resend = new Resend(apiKey);
  console.log('Resend client initialized successfully');
}

export async function sendTestEmail() {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    // During testing, we can only send to this email
    const testRecipient = 'lewis@sullacrypto.com';
    const fromEmail = 'noreply@updates.sullacrypto.com';

    console.log('Attempting to send test email with configuration:', {
      to: testRecipient,
      from: fromEmail,
      timestamp: new Date().toISOString()
    });

    // Send a very simple email first to test basic functionality
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: testRecipient,
      subject: 'Sulla Test Email - ' + new Date().toISOString(),
      html: '<p>This is a test email from Sulla Platform sent at: ' + new Date().toLocaleString() + '</p>',
      text: 'This is a test email from Sulla Platform sent at: ' + new Date().toLocaleString(),
      headers: {
        'X-Entity-Ref-ID': new Date().getTime().toString(),
        'X-Mailgun-Track': 'yes',
        'X-Mailgun-Track-Clicks': 'yes',
        'X-Mailgun-Track-Opens': 'yes'
      },
      tags: [
        { name: 'email_type', value: 'test_email' },
        { name: 'environment', value: process.env.NODE_ENV || 'development' }
      ]
    });

    if (error) {
      console.error('Failed to send test email:', {
        errorMessage: error.message,
        errorCode: error.statusCode,
        errorDetails: JSON.stringify(error),
        timestamp: new Date().toISOString()
      });
      return { success: false, error };
    }

    console.log('Test email sent successfully:', {
      messageId: data?.id,
      timestamp: new Date().toISOString(),
      to: testRecipient,
      from: fromEmail,
      environment: process.env.NODE_ENV || 'development'
    });
    return { success: true, messageId: data?.id };

  } catch (error) {
    console.error('Error in sendTestEmail:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.name : typeof error,
      timestamp: new Date().toISOString()
    });
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    // During testing/development, only send to the verified email
    const recipient = process.env.NODE_ENV === 'production' ? email : 'lewis@sullacrypto.com';
    const fromEmail = 'noreply@updates.sullacrypto.com';

    console.log('Attempting to send welcome email:', {
      to: recipient,
      from: fromEmail,
      subject: 'Welcome to Sulla Learning Platform!',
      environment: process.env.NODE_ENV || 'development'
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      replyTo: 'support@updates.sullacrypto.com',
      subject: 'Welcome to Sulla Learning Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f7ff;">
          <h1 style="color: #1e3a8a; margin: 0 0 20px;">Welcome to Sulla, ${username}!</h1>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
            Your journey into blockchain technology begins now. We're excited to have you join our community of learners passionate about mastering Web3 technologies.
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0;">
            Note: During testing, emails are only sent to verified addresses.
          </p>
        </div>
      `,
      text: `Welcome to Sulla, ${username}!\n\nYour journey into blockchain technology begins now. We're excited to have you join our community of learners passionate about mastering Web3 technologies.`,
      headers: {
        'X-Entity-Ref-ID': new Date().getTime().toString(),
        'X-Mailgun-Track': 'yes',
        'X-Mailgun-Track-Clicks': 'yes',
        'X-Mailgun-Track-Opens': 'yes'
      },
      tags: [
        { name: 'email_type', value: 'welcome_email' },
        { name: 'environment', value: process.env.NODE_ENV || 'development' }
      ]
    });

    if (error) {
      console.error('Failed to send welcome email:', {
        error: error.message,
        details: error
      });
      return { success: false, error };
    }

    console.log('Welcome email sent successfully:', {
      messageId: data?.id,
      to: recipient,
      from: fromEmail,
      environment: process.env.NODE_ENV || 'development'
    });
    return { success: true, messageId: data?.id };

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
    return { success: false, error };
  }
}