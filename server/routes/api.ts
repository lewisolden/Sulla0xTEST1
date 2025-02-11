import { Router } from 'express';
import { sendTestEmail } from '../services/email';

const router = Router();

// Test email endpoint
router.post("/test-email", async (req, res) => {
  try {
    console.log('Test email endpoint called');
    const success = await sendTestEmail();
    if (success) {
      res.json({ message: "Test email sent successfully" });
    } else {
      res.status(500).json({ error: "Failed to send test email" });
    }
  } catch (error) {
    console.error("Error in test email endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
