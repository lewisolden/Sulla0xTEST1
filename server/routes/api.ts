import { Router } from 'express';
import { sendTestEmail } from '../services/email';

const router = Router();

// Test email endpoint
router.post("/test-email", async (req, res) => {
  try {
    console.log('Test email endpoint called');
    const result = await sendTestEmail();
    if (result.success) {
      res.json({ 
        message: "Test email sent successfully",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({ 
        error: "Failed to send test email",
        details: result.error,
        note: "Make sure your domain mail.sullacrypto.com is verified and you're using a correct sending address (e.g., test@mail.sullacrypto.com)"
      });
    }
  } catch (error) {
    console.error("Error in test email endpoint:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router;