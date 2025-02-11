import { Router } from 'express';
import { sendTestEmail } from '../services/email';

const router = Router();

// Test email endpoint with improved error handling
router.post("/test-email", async (req, res) => {
  try {
    console.log('Test email endpoint called with body:', req.body);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email address is required" });
    }

    const success = await sendTestEmail(email);
    if (success) {
      res.json({ message: "Test email sent successfully" });
    } else {
      res.status(500).json({ error: "Failed to send test email. Please check Mailgun configuration." });
    }
  } catch (error) {
    console.error("Error in test email endpoint:", error);
    res.status(500).json({ error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;