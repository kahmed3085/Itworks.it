// ================================================================
//  ITWORKS — CAREERS CV UPLOAD HANDLER
//  Google Apps Script — Saves CVs to Google Drive + sends emails
// ================================================================
//
//  SETUP (takes ~5 minutes, completely free):
//
//  STEP 1 — Create a Google Drive folder for CVs
//    • Go to drive.google.com
//    • Create a folder called "ItWorks — Careers Applications"
//    • Right-click → Get link → copy the folder ID from the URL
//      (the long string after /folders/ in the URL)
//    • Paste it below as FOLDER_ID
//
//  STEP 2 — Open Google Apps Script
//    • Go to script.google.com
//    • Click "New project"
//    • Name it "ItWorks Careers"
//    • Delete any default code and paste this entire file
//    • Update FOLDER_ID and TEAM_EMAIL below
//
//  STEP 3 — Deploy as Web App
//    • Click "Deploy" → "New deployment"
//    • Type: Web app
//    • Execute as: Me (your Google account)
//    • Who has access: Anyone
//    • Click Deploy → Authorize (grant permissions)
//    • Copy the Web App URL
//
//  STEP 4 — Add URL to careers.html
//    • Open careers.html
//    • Find:  const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
//    • Replace with your copied Web App URL
//
//  STEP 5 — Push careers.html to GitHub
//    That's it — CVs will now save to your Drive and
//    confirmation emails will send automatically.
//
// ================================================================

// ── CONFIG ──────────────────────────────────────────────────────
const FOLDER_ID  = 'PASTE_YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';
const TEAM_EMAIL = 'londonheathrowcars.com@gmail.com';
// ────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── 1. Get or create a sub-folder for the role ──────────────
    const mainFolder = DriveApp.getFolderById(FOLDER_ID);
    let roleFolder;
    const existing = mainFolder.getFoldersByName(data.role);
    roleFolder = existing.hasNext() ? existing.next() : mainFolder.createFolder(data.role);

    // ── 2. Save CV file to Drive ────────────────────────────────
    if (data.cvData) {
      const date    = new Date().toISOString().split('T')[0];
      const safeName = `${data.role}_${data.lastName}_${data.firstName}_${date}.${data.cvExt || 'pdf'}`;
      const decoded  = Utilities.base64Decode(data.cvData);
      const blob     = Utilities.newBlob(decoded, data.cvType || 'application/pdf', safeName);
      roleFolder.createFile(blob);
    }

    // ── 3. Auto-reply to applicant ───────────────────────────────
    const toApplicant = `Hi ${data.firstName},

Thank you for applying for the ${data.role} position at ItWorks!

We have received your application and CV, and our talent team will carefully review your credentials and experience.

What happens next:
• Our team reviews all applications within 5–7 business days
• If you're shortlisted, we'll reach out to arrange a conversation
• All roles are fully remote — we'll be in touch via email

We appreciate your interest in joining the ItWorks team. We're building something exciting and the calibre of people applying makes us very optimistic about the future.

Best regards,
The ItWorks Talent Team
hello@itworks.ai
https://itworks.ai/careers`;

    GmailApp.sendEmail(
      data.email,
      '✅ Application Received — ItWorks',
      toApplicant
    );

    // ── 4. Notify the ItWorks team ───────────────────────────────
    const toTeam = `New job application received!

Role:   ${data.role}
Name:   ${data.firstName} ${data.lastName}
Email:  ${data.email}
Phone:  ${data.phone}

CV saved to: Google Drive → ItWorks Careers Applications → ${data.role}
File name: ${data.role}_${data.lastName}_${data.firstName}_${new Date().toISOString().split('T')[0]}.${data.cvExt || 'pdf'}

Reply directly to this email or use the candidate's email above to proceed.`;

    GmailApp.sendEmail(
      TEAM_EMAIL,
      `🆕 New Application: ${data.role} — ${data.firstName} ${data.lastName}`,
      toTeam
    );

    // ── 5. Return success ────────────────────────────────────────
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log error and return it
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Keeps the endpoint alive for GET requests (testing)
function doGet(e) {
  return ContentService.createTextOutput(
    'ItWorks Careers — CV Upload Endpoint is active.'
  );
}
