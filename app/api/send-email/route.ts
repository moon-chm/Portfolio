import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 requests per 10 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps within window
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const validTimes = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (validTimes.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimes);
      }
    }
  }

  return false;
}

// Strict schema validation with length constraints
const emailSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(120, "Email must be less than 120 characters"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(150, "Subject must be less than 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be less than 3000 characters"),
});

// HTML escaping helper to prevent HTML injection in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction & rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Body parsing and schema validation
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const result = emailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.errors[0]?.message || "Validation failed.",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // 3. Verify server environment configuration without leaking credentials
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const emailServer = process.env.EMAIL_SERVER;
    const emailPort = process.env.EMAIL_PORT;

    if (!emailUser || !emailPassword || !emailServer || !emailPort) {
      console.error("[Email Security] Missing required email environment variables.");
      return NextResponse.json(
        { success: false, error: "Email service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const cleanPassword = emailPassword.trim().replace(/\s+/g, "");

    // 4. Create hardened nodemailer transporter (no sensitive logs/debugging)
    const transporter = nodemailer.createTransport(
      emailServer === "smtp.gmail.com"
        ? {
            service: "gmail",
            auth: {
              user: emailUser.trim(),
              pass: cleanPassword,
            },
            logger: false,
            debug: false,
          }
        : {
            host: emailServer,
            port: Number(emailPort),
            secure: emailPort === "465",
            auth: {
              user: emailUser.trim(),
              pass: cleanPassword,
            },
            logger: false,
            debug: false,
          }
    );

    // Verify SMTP connection
    await transporter.verify();

    // 5. Sanitize fields for HTML email to prevent injection attacks
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // 6. Mail options with sanitized content
    const mailOptions = {
      from: emailUser.trim(),
      to: emailUser.trim(),
      replyTo: email,
      subject: `Portfolio Contact: ${subject.replace(/[\r\n]/g, "")}`, // prevent header injection
      text: `
New message from your portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
      html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); color: #222;">
  <header style="text-align: center; margin-bottom: 25px;">
    <h2 style="color: #D4A373; font-weight: 700; font-size: 24px; margin: 0;">
      🚀 New Message from Portfolio
    </h2>
  </header>

  <section style="background: #fdfaf6; border: 1px solid #FAEDCD; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${safeName}</p>
    <p style="margin: 8px 0;"><strong>📫 Email:</strong> <a href="mailto:${safeEmail}" style="color: #D4A373; text-decoration: none;">${safeEmail}</a></p>
    <p style="margin: 8px 0;"><strong>📋 Subject:</strong> ${safeSubject}</p>
  </section>

  <section style="background: #fff; padding: 20px; border-left: 5px solid #D4A373; border-radius: 0 8px 8px 0; border-top: 1px solid #f0f0f0; border-right: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
    <h3 style="color: #D4A373; margin-top: 0; margin-bottom: 15px;">💬 Message:</h3>
    <p style="white-space: pre-line; font-size: 15px; line-height: 1.6; color: #333;">
      ${safeMessage}
    </p>
  </section>

  <footer style="text-align: center; margin-top: 35px; font-size: 12px; color: #999;">
    <p>Sent securely from your portfolio contact form</p>
  </footer>
</div>
      `.trim(),
    };

    // 7. Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    });
  } catch (error: any) {
    // Log server-side only without exposing sensitive internals to caller
    console.error("[Email Send Error]:", error?.message || error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later or reach out directly on LinkedIn / GitHub.",
      },
      { status: 500 }
    );
  }
}
