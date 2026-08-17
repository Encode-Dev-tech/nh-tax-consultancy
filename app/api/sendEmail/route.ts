// app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ======================================================
// Helpers
// ======================================================

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ======================================================
// POST
// ======================================================

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Read multipart/form-data
    // --------------------------------------------------

    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const business = String(formData.get("business") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const file = formData.get("file");

    // --------------------------------------------------
    // 2. Validate required fields
    // --------------------------------------------------

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 3. Validate email
    // --------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 4. Validate phone
    // --------------------------------------------------

    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone / WhatsApp number.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 5. Environment variables
    // --------------------------------------------------

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;
    const mailToInfo = process.env.MAIL_TO_INFO || gmailUser;

    if (!gmailUser || !gmailPassword || !mailToInfo) {
      console.error("❌ Email environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    // --------------------------------------------------
    // 6. Escape values for HTML email
    // --------------------------------------------------

    const safeName = escapeHtml(name);
    const safeBusiness = escapeHtml(business || "Not provided");
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message || "Not provided");

    // --------------------------------------------------
    // 7. Prepare attachment
    // --------------------------------------------------

    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];

    let attachmentName = "No file attached";

    if (file instanceof File && file.size > 0) {
      // Maximum 5 MB
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "File size must be less than 5 MB.",
          },
          { status: 400 },
        );
      }

      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only JPG, PNG or PDF files are allowed.",
          },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      attachmentName = file.name;

      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    // --------------------------------------------------
    // 8. Create transporter
    // --------------------------------------------------

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // --------------------------------------------------
    // 9. Verify SMTP connection
    // --------------------------------------------------

    await transporter.verify();

    // ==================================================
    // EMAIL 1
    // NH TAX CONSULTANCY ADMIN EMAIL
    // ==================================================

    const adminSubject = `New Enquiry - ${service} | ${name}`;

    const adminText = `
New Consultation Request
NH Tax Consultancy Website

Client Details
-------------------------
Name: ${name}
Business / Company: ${business || "Not provided"}
Phone: ${phone}
Email: ${email}
Service: ${service}

Requirement
-------------------------
${message || "Not provided"}

Attachment
-------------------------
${attachmentName}

Please contact the client regarding this enquiry.
`;

    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Consultation Request</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#334155;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f1f5f9;padding:35px 15px;"
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:680px;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #e2e8f0;
  "
>

  <!-- HEADER -->

  <tr>
    <td
      style="
        background:#10b981;
        padding:30px;
        color:#ffffff;
      "
    >

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>

          <td>
            <div
              style="
                font-size:24px;
                font-weight:700;
                line-height:1.3;
              "
            >
              NH Tax Consultancy
            </div>

            <div
              style="
                margin-top:6px;
                font-size:13px;
                color:#d1fae5;
              "
            >
              Tax • Accounting • Compliance
            </div>
          </td>

          <td
            align="right"
            style="
              font-size:12px;
              color:#d1fae5;
            "
          >
            NEW ENQUIRY
          </td>

        </tr>
      </table>

    </td>
  </tr>

  <!-- INTRO -->

  <tr>
    <td style="padding:30px 30px 10px;">

      <div
        style="
          font-size:22px;
          font-weight:700;
          color:#0f172a;
        "
      >
        New Consultation Request
      </div>

      <p
        style="
          margin:8px 0 0;
          font-size:14px;
          line-height:1.7;
          color:#64748b;
        "
      >
        A new enquiry has been submitted through the
        NH Tax Consultancy website.
      </p>

    </td>
  </tr>

  <!-- SERVICE -->

  <tr>
    <td style="padding:20px 30px;">

      <div
        style="
          background:#ecfdf5;
          border:1px solid #a7f3d0;
          border-radius:12px;
          padding:18px;
        "
      >

        <div
          style="
            font-size:12px;
            color:#047857;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:.5px;
          "
        >
          Requested Service
        </div>

        <div
          style="
            margin-top:6px;
            font-size:18px;
            font-weight:700;
            color:#065f46;
          "
        >
          ${safeService}
        </div>

      </div>

    </td>
  </tr>

  <!-- CLIENT DETAILS -->

  <tr>
    <td style="padding:5px 30px 20px;">

      <div
        style="
          font-size:17px;
          font-weight:700;
          color:#0f172a;
          margin-bottom:14px;
        "
      >
        Client Details
      </div>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="font-size:14px;"
      >

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
              width:38%;
              border-bottom:1px solid #f1f5f9;
            "
          >
            Full Name
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
              font-weight:600;
              border-bottom:1px solid #f1f5f9;
            "
          >
            ${safeName}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
              border-bottom:1px solid #f1f5f9;
            "
          >
            Business / Company
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
              border-bottom:1px solid #f1f5f9;
            "
          >
            ${safeBusiness}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
              border-bottom:1px solid #f1f5f9;
            "
          >
            Phone
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
              border-bottom:1px solid #f1f5f9;
            "
          >
            ${safePhone}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
            "
          >
            Email
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
            "
          >
            ${safeEmail}
          </td>
        </tr>

      </table>

    </td>
  </tr>

  <!-- REQUIREMENT -->

  <tr>
    <td style="padding:10px 30px 25px;">

      <div
        style="
          font-size:17px;
          font-weight:700;
          color:#0f172a;
          margin-bottom:12px;
        "
      >
        Client Requirement
      </div>

      <div
        style="
          background:#f8fafc;
          border:1px solid #e2e8f0;
          border-radius:12px;
          padding:18px;
          font-size:14px;
          line-height:1.8;
          color:#475569;
          white-space:pre-line;
        "
      >
        ${safeMessage}
      </div>

    </td>
  </tr>

  <!-- ATTACHMENT -->

  <tr>
    <td style="padding:0 30px 30px;">

      <div
        style="
          background:#f8fafc;
          border-radius:10px;
          padding:13px 15px;
          font-size:13px;
          color:#64748b;
        "
      >
        <strong style="color:#334155;">
          Attachment:
        </strong>
        ${escapeHtml(attachmentName)}
      </div>

    </td>
  </tr>

  <!-- FOOTER -->

  <tr>
    <td
      style="
        background:#0f172a;
        padding:22px 30px;
        color:#94a3b8;
        font-size:12px;
        line-height:1.6;
      "
    >
      <strong style="color:#ffffff;">
        NH Tax Consultancy
      </strong>
      <br />
      GST • Income Tax • TDS • Accounting • Audit
      <br />
      <span style="color:#64748b;">
        This enquiry was submitted through the website.
      </span>
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    // ==================================================
    // EMAIL 2
    // CUSTOMER CONFIRMATION EMAIL
    // ==================================================

    const customerSubject = `Thank You for Contacting NH Tax Consultancy`;

    const customerText = `
Dear ${name},

Thank you for contacting NH Tax Consultancy.

We have successfully received your enquiry.

Your Enquiry Details
-------------------------
Service: ${service}
Name: ${name}
Business / Company: ${business || "Not provided"}
Phone: ${phone}

Your Requirement
-------------------------
${message || "Not provided"}

Our team will review your enquiry and contact you regarding the next steps.

For any further information, you can contact us at:

Email:
${mailToInfo}

Phone:
+91 95558 36691

Regards,
NH Tax Consultancy

Tax • Accounting • Compliance
Noida, Uttar Pradesh
`;

    const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Thank You - NH Tax Consultancy</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#334155;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f1f5f9;padding:35px 15px;"
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:650px;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #e2e8f0;
  "
>

  <!-- HEADER -->

  <tr>
    <td
      style="
        background:#10b981;
        padding:32px 30px;
        text-align:center;
        color:#ffffff;
      "
    >

      <div
        style="
          font-size:26px;
          font-weight:700;
          line-height:1.3;
        "
      >
        NH Tax Consultancy
      </div>

      <div
        style="
          margin-top:7px;
          font-size:13px;
          color:#d1fae5;
        "
      >
        Tax • Accounting • Compliance
      </div>

    </td>
  </tr>

  <!-- SUCCESS -->

  <tr>
    <td
      style="
        padding:35px 30px 15px;
        text-align:center;
      "
    >

      <div
        style="
          display:inline-block;
          width:54px;
          height:54px;
          line-height:54px;
          border-radius:50%;
          background:#ecfdf5;
          color:#059669;
          font-size:28px;
          font-weight:700;
        "
      >
        ✓
      </div>

      <h1
        style="
          margin:18px 0 8px;
          font-size:24px;
          color:#0f172a;
        "
      >
        Thank You, ${safeName}
      </h1>

      <p
        style="
          margin:0 auto;
          max-width:480px;
          font-size:14px;
          line-height:1.7;
          color:#64748b;
        "
      >
        Your enquiry has been successfully received by
        NH Tax Consultancy.
      </p>

    </td>
  </tr>

  <!-- MESSAGE -->

  <tr>
    <td style="padding:20px 30px;">

      <div
        style="
          background:#ecfdf5;
          border:1px solid #a7f3d0;
          border-radius:14px;
          padding:20px;
        "
      >

        <div
          style="
            font-size:13px;
            color:#047857;
            font-weight:600;
          "
        >
          Requested Service
        </div>

        <div
          style="
            margin-top:7px;
            font-size:19px;
            font-weight:700;
            color:#065f46;
          "
        >
          ${safeService}
        </div>

      </div>

    </td>
  </tr>

  <!-- ENQUIRY SUMMARY -->

  <tr>
    <td style="padding:10px 30px 25px;">

      <h2
        style="
          margin:0 0 15px;
          font-size:18px;
          color:#0f172a;
        "
      >
        Your Enquiry
      </h2>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="font-size:14px;"
      >

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
              width:38%;
              border-bottom:1px solid #f1f5f9;
            "
          >
            Name
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
              font-weight:600;
              border-bottom:1px solid #f1f5f9;
            "
          >
            ${safeName}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
              border-bottom:1px solid #f1f5f9;
            "
          >
            Business
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
              border-bottom:1px solid #f1f5f9;
            "
          >
            ${safeBusiness}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:10px 0;
              color:#64748b;
            "
          >
            Phone
          </td>

          <td
            style="
              padding:10px 0;
              color:#0f172a;
            "
          >
            ${safePhone}
          </td>
        </tr>

      </table>

    </td>
  </tr>

  <!-- REQUIREMENT -->

  <tr>
    <td style="padding:0 30px 25px;">

      <h2
        style="
          margin:0 0 12px;
          font-size:18px;
          color:#0f172a;
        "
      >
        What You Submitted
      </h2>

      <div
        style="
          background:#f8fafc;
          border:1px solid #e2e8f0;
          border-radius:12px;
          padding:18px;
          font-size:14px;
          line-height:1.8;
          color:#475569;
          white-space:pre-line;
        "
      >
        ${safeMessage}
      </div>

    </td>
  </tr>

  <!-- RESPONSE -->

  <tr>
    <td style="padding:0 30px 30px;">

      <div
        style="
          border-left:4px solid #10b981;
          background:#f8fafc;
          padding:18px 20px;
          border-radius:0 10px 10px 0;
        "
      >

        <div
          style="
            font-size:15px;
            font-weight:700;
            color:#0f172a;
          "
        >
          What happens next?
        </div>

        <p
          style="
            margin:8px 0 0;
            font-size:14px;
            line-height:1.7;
            color:#64748b;
          "
        >
          Our team will review your enquiry and contact you
          regarding the service requirements, documentation
          and next steps.
        </p>

      </div>

    </td>
  </tr>

  <!-- CONTACT -->

  <tr>
    <td
      style="
        background:#f8fafc;
        padding:25px 30px;
        border-top:1px solid #e2e8f0;
      "
    >

      <div
        style="
          font-size:15px;
          font-weight:700;
          color:#0f172a;
          margin-bottom:12px;
        "
      >
        Need help?
      </div>

      <div
        style="
          font-size:13px;
          line-height:1.9;
          color:#64748b;
        "
      >
        Email:
        <a
          href="mailto:${mailToInfo}"
          style="
            color:#059669;
            text-decoration:none;
            font-weight:600;
          "
        >
          ${mailToInfo}
        </a>

        <br />

        Phone:
        <a
          href="tel:+919555836691"
          style="
            color:#059669;
            text-decoration:none;
            font-weight:600;
          "
        >
          +91 95558 36691
        </a>

        <br />

        A-12 Dharmapali Palace, Noida Sector-27,
        Atta Bhoja Market, U.P. 201301
      </div>

    </td>
  </tr>

  <!-- FOOTER -->

  <tr>
    <td
      style="
        background:#0f172a;
        padding:25px 30px;
        text-align:center;
        color:#94a3b8;
        font-size:12px;
        line-height:1.7;
      "
    >

      <strong
        style="
          color:#ffffff;
          font-size:14px;
        "
      >
        NH Tax Consultancy
      </strong>

      <br />

      GST • Income Tax • TDS • Accounting • Audit

      <br />

      <span style="color:#64748b;">
        Thank you for choosing NH Tax Consultancy.
      </span>

    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    // ==================================================
    // 10. Send ADMIN email first
    // ==================================================

    const adminEmailResponse = await transporter.sendMail({
      from: `"NH Tax Consultancy Website" <${gmailUser}>`,
      to: mailToInfo,
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      attachments,
    });

    console.log("✅ Admin email sent:", adminEmailResponse.messageId);

    // ==================================================
    // 11. Send CUSTOMER confirmation email
    // ==================================================

    const customerEmailResponse = await transporter.sendMail({
      from: `"NH Tax Consultancy" <${gmailUser}>`,
      to: email,
      replyTo: mailToInfo,
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
    });

    console.log(
      "✅ Customer confirmation email sent:",
      customerEmailResponse.messageId,
    );

    // ==================================================
    // 12. Success
    // ==================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry has been submitted successfully. A confirmation email has been sent to your email address.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}
