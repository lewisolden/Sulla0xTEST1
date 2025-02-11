import { sendTestEmail } from './services/email';

async function runTest() {
  console.log('Starting email test...');
  const result = await sendTestEmail();
  console.log('Test result:', result);
}

runTest().catch(console.error);
