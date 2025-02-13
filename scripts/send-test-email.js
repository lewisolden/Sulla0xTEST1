import { sendTestEmail } from '../server/services/email.js';

async function main() {
  const result = await sendTestEmail();
  console.log('Email sending result:', result);
}

main().catch(console.error);