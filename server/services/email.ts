import { Resend } from 'resend';

let resend: Resend;

// Initialize Resend with API key
function initializeResend() {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    throw new Error('RESEND_API_KEY environment variable must be set');
  }
  console.log('Initializing Resend client...');
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Shared email template generator
function generateEmailTemplate(username: string, appUrl: string) {
  console.log('Generating email template for user:', username);
  const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Sulla!</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #f4f7ff;
          color: #374151;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          padding: 48px 20px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 48px;
          font-weight: 800;
          margin: 0;
          padding: 0;
        }
        .logo span {
          font-weight: 400;
        }
        .tagline {
          font-size: 24px;
          opacity: 0.9;
          margin-top: 16px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          margin: 24px 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .section-title {
          color: #1e3a8a;
          font-size: 28px;
          margin-bottom: 24px;
        }
        .course-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .course-title {
          color: #1e3a8a;
          font-size: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .course-icon {
          width: 32px;
          height: 32px;
          padding: 8px;
          background: #dbeafe;
          border-radius: 8px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin: 32px 0;
        }
        .feature-item {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .feature-icon {
          width: 24px;
          height: 24px;
          color: #3b82f6;
        }
        .feature-content h4 {
          color: #1e3a8a;
          margin: 0 0 8px 0;
        }
        .feature-content p {
          margin: 0;
          color: #6b7280;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white !important;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          margin: 16px 0;
          text-align: center;
        }
        .module-list {
          margin: 16px 0;
          padding: 0;
          list-style: none;
        }
        .module-list li {
          margin: 12px 0;
          padding-left: 24px;
          position: relative;
        }
        .module-list li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #3b82f6;
        }
        .tech-pill {
          display: inline-block;
          padding: 6px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 20px;
          font-size: 14px;
          margin: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="logo">S<span>ulla</span></h1>
        <p class="tagline">Your Gateway to Emerging Technologies</p>
      </div>

      <div class="container">
        <div class="card">
          <h2 class="section-title">Welcome to the Future of Learning, ${username}!</h2>
          <p>
            Embark on an exciting journey into the world of emerging technologies with Sulla's innovative learning platform. Our curriculum combines cutting-edge content with hands-on experience in both Artificial Intelligence and Blockchain technology.
          </p>

          <div style="text-align: center;">
            <a href="${appUrl}/login" class="button" style="color: white !important; text-decoration: none;">
              Start Learning Now
            </a>
          </div>

          <div class="course-card">
            <div class="course-title">
              <div class="course-icon">🔗</div>
              Course 1: Introduction to Cryptocurrency
            </div>
            <p>
              Master the fundamentals of cryptocurrency and blockchain technology through our comprehensive learning path. From basic concepts to advanced applications, this course provides a solid foundation in digital assets and decentralized systems.
            </p>
            <ul class="module-list">
              <li>Understanding Cryptocurrency Fundamentals</li>
              <li>Bitcoin & Digital Assets Deep Dive</li>
              <li>Ethereum & Smart Contracts</li>
              <li>Practical Trading Simulator Experience</li>
            </ul>
            <div>
              <span class="tech-pill">Bitcoin</span>
              <span class="tech-pill">Ethereum</span>
              <span class="tech-pill">Smart Contracts</span>
              <span class="tech-pill">DeFi</span>
            </div>
          </div>

          <div class="course-card">
            <div class="course-title">
              <div class="course-icon">🤖</div>
              Course 2: Introduction to AI
            </div>
            <p>
              Explore the fascinating world of artificial intelligence through our structured learning modules. From theoretical foundations to practical applications, gain the skills needed to understand and work with AI technologies.
            </p>
            <ul class="module-list">
              <li>Foundations of AI & Machine Learning</li>
              <li>Neural Networks & Deep Learning</li>
              <li>Computer Vision & Natural Language Processing</li>
              <li>Hands-on AI Implementation Projects</li>
            </ul>
            <div>
              <span class="tech-pill">Machine Learning</span>
              <span class="tech-pill">Neural Networks</span>
              <span class="tech-pill">Computer Vision</span>
              <span class="tech-pill">NLP</span>
            </div>
          </div>

          <div class="feature-grid">
            <div class="feature-item">
              <div style="font-size: 24px;">💡</div>
              <div class="feature-content">
                <h4>Interactive Learning</h4>
                <p>Engage with hands-on projects and real-world applications</p>
              </div>
            </div>
            <div class="feature-item">
              <div style="font-size: 24px;">🎯</div>
              <div class="feature-content">
                <h4>AI-Powered Platform</h4>
                <p>Experience personalized learning paths and adaptive content</p>
              </div>
            </div>
            <div class="feature-item">
              <div style="font-size: 24px;">📊</div>
              <div class="feature-content">
                <h4>Progress Tracking</h4>
                <p>Monitor your journey with our achievement system</p>
              </div>
            </div>
            <div class="feature-item">
              <div style="font-size: 24px;">👥</div>
              <div class="feature-content">
                <h4>Expert Support</h4>
                <p>Join our community of learners and experts</p>
              </div>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${appUrl}/login" class="button" style="color: white !important; text-decoration: none;">
              Begin Your Learning Journey
            </a>
          </div>
        </div>
      </div>
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