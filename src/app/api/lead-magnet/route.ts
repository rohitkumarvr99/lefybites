import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save lead in SQLite DB (ignore if duplicate)
    try {
      await prisma.lead.create({
        data: { email },
      });
      console.log(`[LEAD CAPTURED] Email: ${email}`);
    } catch (dbErr: any) {
      // Prisma unique constraint error
      if (dbErr.code === "P2002") {
        console.log(`[LEAD REGISTERED ALREADY] Email: ${email}`);
      } else {
        console.error("DB error saving lead:", dbErr);
      }
    }

    // Trigger Email sending in background via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "Dadi Sutra <onboarding@resend.dev>";

    if (resendApiKey && resendApiKey !== "re_placeholder_key") {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [email],
            subject: "दादी सूत्र (Dadi Sutra) ई-बुक: आपका फ्री सैंपल चैप्टर!",
            html: `
              <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
                <h1 style="color: #6b1f1f; text-align: center;">दादी सूत्र (Dadi Sutra)</h1>
                <p>नमस्ते,</p>
                <p>दादी सूत्र ई-बुक में रुचि दिखाने के लिए धन्यवाद। यहाँ आपका फ्री सैंपल चैप्टर है:</p>
                <div style="background-color: #FAF7F2; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #c79a3a;">
                  <h3 style="margin-top: 0; color: #6b1f1f;">भाग 3 से एक नुस्खा: हल्दी और शहद (खांसी-जुकाम के लिए)</h3>
                  <p><b>सामग्री:</b> 1/2 चम्मच शुद्ध हल्दी पाउडर, 1 चम्मच कच्चा शहद।</p>
                  <p><b>विधि:</b> दोनों को अच्छी तरह मिलाएं और दिन में दो बार धीरे-धीरे चाटें।</p>
                  <p><b>फायदा:</b> यह गले की खराश और सुखी खांसी के लिए रामबाण उपाय है।</p>
                </div>
                <p>पूरे 100+ पेज और चमत्कारी घरेलू नुस्खों को तुरंत डाउनलोड करने के लिए केवल ₹199 में पूरी किताब खरीदें।</p>
                <p style="text-align: center; margin: 24px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}#pricing" style="background-color: #6b1f1f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
                    अभी खरीदें केवल ₹199 में (Buy Now)
                  </a>
                </p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="margin-bottom: 0;">शुभकामनाएँ,<br /><b>दादी सूत्र टीम</b></p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend API failed for lead magnet:", errText);
        } else {
          console.log(`Sample email successfully sent to ${email}`);
        }
      } catch (emailErr) {
        console.error("Failed to send lead email via Resend:", emailErr);
      }
    } else {
      console.log("[LEAD MAGNET EMAIL] Resend is not configured, logged email to database.");
    }

    return NextResponse.json({ success: true, message: "Sample sent successfully!" });
  } catch (error: any) {
    console.error("Lead magnet route error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
