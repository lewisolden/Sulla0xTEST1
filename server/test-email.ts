import { sendTestEmail } from './services/email';

async function runTest() {
  console.log('Starting email test with enhanced logging...');
  try {
    // Get the test recipient from command line argument if provided
    const testRecipient = process.argv[2];
    console.log('Attempting to send test email...');
    const result = await sendTestEmail(testRecipient);

    if (result.success) {
      console.log('API Response successful:', {
        messageId: result.messageId,
        success: result.success
      });
      console.log('Note: Please check both inbox and spam folders for the test email');
    } else {
      console.error('Email sending failed:', {
        error: result.error,
        success: result.success
      });
    }
  } catch (error) {
    console.error('Test failed with error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
  }
}

runTest().catch(console.error);