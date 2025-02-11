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

export async function sendTestEmail(testRecipient?: string) {
  try {
    if (!resend) {
      console.log('Initializing Resend client...');
      initializeResend();
    }

    // Use provided test recipient or default
    const recipient = testRecipient || 'lewis@sullacrypto.com';
    const fromEmail = 'onboarding@resend.dev';

    console.log('Attempting to send test email with configuration:', {
      to: recipient,
      from: fromEmail,
      timestamp: new Date().toISOString(),
      mode: process.env.NODE_ENV || 'development'
    });

    // Send a very simple email first to test basic functionality
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: 'Test Email - ' + new Date().toISOString(),
      html: '<p>This is a test email from Sulla.</p>',
      text: 'This is a test email from Sulla.',
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

      // Log additional DNS-related information if available
      if (error.message?.includes('DNS')) {
        console.error('Possible DNS configuration issue detected:', {
          domain: fromEmail.split('@')[1],
          errorType: 'DNS_VALIDATION',
          timestamp: new Date().toISOString()
        });
      }
      return { success: false, error };
    }

    console.log('Test email sent successfully:', {
      messageId: data?.id,
      timestamp: new Date().toISOString(),
      to: recipient,
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
    const fromEmail = 'onboarding@resend.dev';

    console.log('Attempting to send welcome email:', {
      to: recipient,
      from: fromEmail,
      environment: process.env.NODE_ENV || 'development'
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: 'Welcome to Sulla!',
      html: `<p>Welcome to Sulla, ${username}! Your journey into blockchain technology begins now.</p>`,
      text: `Welcome to Sulla, ${username}! Your journey into blockchain technology begins now.`,
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