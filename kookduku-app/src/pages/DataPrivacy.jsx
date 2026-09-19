import React from "react";
import LegalLayout from "../components/LegalLayout";

/**
 * PrivacyPolicy — Compliant with India's Digital Personal Data Protection Act
 * (DPDPA) 2023 and the Information Technology Act 2000 / IT Rules 2011.
 *
 * ⚠️ IMPORTANT: This is a template. Have a qualified Indian privacy/IT lawyer
 * review and finalise this document before publishing.
 */
export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="[DATE — REPLACE BEFORE PUBLISHING]">
      <div className="space-y-6">

        {/* Disclaimer */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/40 text-xs text-amber-900 dark:text-amber-200">
          ⚠️ This document is a template. Replace all <span className="font-bold text-amber-950 dark:text-amber-100">[PLACEHOLDER]</span> values with
          your actual business details before going live.
        </div>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">1. About This Policy</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            This Privacy Policy describes how <strong className="text-slate-900 dark:text-white">Kook Du Ku Foods Pvt Ltd</strong>{" "}
            ("<strong className="text-slate-900 dark:text-white">we</strong>", "<strong className="text-slate-900 dark:text-white">us</strong>", or "
            <strong className="text-slate-900 dark:text-white">our</strong>") collects, uses, and protects your personal data when
            you access our website or place orders through us.
          </p>
          <p className="mt-2 text-slate-700 dark:text-neutral-300">
            We are committed to complying with the <strong className="text-slate-900 dark:text-white">Digital Personal Data
            Protection Act, 2023 (DPDPA)</strong> and the{" "}
            <strong className="text-slate-900 dark:text-white">Information Technology Act, 2000</strong> and rules thereunder.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">2. Who We Are (Data Fiduciary)</h2>
          <ul className="space-y-1.5 text-slate-700 dark:text-neutral-300">
            <li><strong className="text-slate-900 dark:text-white">Company Name:</strong> Kook Du Ku Foods Pvt Ltd <span className="text-amber-700 dark:text-amber-300 font-mono">[REPLACE WITH ACTUAL LEGAL NAME]</span></li>
            <li><strong className="text-slate-900 dark:text-white">Registered Address:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[FULL REGISTERED OFFICE ADDRESS]</span></li>
            <li><strong className="text-slate-900 dark:text-white">Restaurant Address:</strong> HSR Layout, Sector 2, Bangalore – 560102 <span className="text-amber-700 dark:text-amber-300 font-mono">[VERIFY]</span></li>
            <li><strong className="text-slate-900 dark:text-white">CIN:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[CORPORATE IDENTITY NUMBER]</span></li>
            <li><strong className="text-slate-900 dark:text-white">GSTIN:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[GST REGISTRATION NUMBER]</span></li>
            <li><strong className="text-slate-900 dark:text-white">Email:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">privacy@kookduku.com [REPLACE]</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">3. Data We Collect &amp; Why</h2>
          <p className="mb-2 text-slate-700 dark:text-neutral-300">
            This website is primarily a <strong className="text-slate-900 dark:text-white">browse-only storefront</strong>. We do
            not directly collect personal data through forms on this site. However, the following data
            processing occurs:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <p className="font-bold text-slate-900 dark:text-white text-xs mb-1">3.1 Google Fonts &amp; Material Icons (Essential)</p>
              <p className="text-xs text-slate-600 dark:text-neutral-400">Your browser sends a request (including your IP address) to Google's servers
              to load fonts and icons. This is necessary for the site to render correctly. Google processes
              this data under its own privacy policy. We have no control over Google's processing.</p>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-[#C0392B] dark:text-[#FF535A] underline text-xs mt-1.5 inline-block font-semibold">
                Google Privacy Policy →
              </a>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <p className="font-bold text-slate-900 dark:text-white text-xs mb-1">3.2 WhatsApp Orders</p>
              <p className="text-xs text-slate-600 dark:text-neutral-400">When you tap "WhatsApp Quick Order" or contact us via WhatsApp, you are
              redirected to WhatsApp (owned by Meta). Your phone number, name, and message content are
              processed by WhatsApp / Meta under their privacy policy. We retain your order information
              (name, address, order details) to fulfil your order and for legal compliance.</p>
              <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                className="text-[#C0392B] dark:text-[#FF535A] underline text-xs mt-1.5 inline-block font-semibold">
                WhatsApp Privacy Policy →
              </a>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <p className="font-bold text-slate-900 dark:text-white text-xs mb-1">3.3 Analytics (Currently: None)</p>
              <p className="text-xs text-slate-600 dark:text-neutral-400">We do not currently use web analytics tools. If we introduce analytics
              in the future (e.g., Google Analytics, Microsoft Clarity), we will update this policy and
              seek your explicit consent before enabling tracking.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">4. Legal Basis for Processing</h2>
          <p className="text-slate-700 dark:text-neutral-300">Under DPDPA 2023, we process your data on the following bases:</p>
          <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-700 dark:text-neutral-300">
            <li><strong className="text-slate-900 dark:text-white">Consent:</strong> Loading Google CDN resources (you can refuse via Essential Only in cookie consent).</li>
            <li><strong className="text-slate-900 dark:text-white">Contractual necessity:</strong> Processing your order details to fulfil orders placed via WhatsApp.</li>
            <li><strong className="text-slate-900 dark:text-white">Legal obligation:</strong> Retaining GST invoices, FSSAI records as required by Indian law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">5. Data Retention</h2>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li>Order records: 7 years (as required under the GST Act for financial records).</li>
            <li>WhatsApp chat history: Retained in our WhatsApp Business account per WhatsApp's data policies.</li>
            <li>Server access logs (IP addresses from CDN): Retained by Google per their policies (typically 9–18 months).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">6. Your Rights Under DPDPA 2023</h2>
          <p className="mb-2 text-slate-700 dark:text-neutral-300">As a Data Principal (person whose data is processed), you have the right to:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li><strong className="text-slate-900 dark:text-white">Access:</strong> Request a summary of your personal data we hold.</li>
            <li><strong className="text-slate-900 dark:text-white">Correction:</strong> Request correction of inaccurate personal data.</li>
            <li><strong className="text-slate-900 dark:text-white">Erasure:</strong> Request deletion of your personal data (subject to legal retention obligations).</li>
            <li><strong className="text-slate-900 dark:text-white">Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer (see Section 9).</li>
            <li><strong className="text-slate-900 dark:text-white">Withdraw Consent:</strong> At any time, without affecting lawfulness of prior processing.</li>
            <li><strong className="text-slate-900 dark:text-white">Nominate:</strong> Nominate another individual to exercise your rights in the event of death or incapacity.</li>
          </ul>
          <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400">
            To exercise any of these rights, contact our Grievance Officer. We will respond within
            <strong className="text-slate-900 dark:text-white"> 30 days</strong> of receiving your request, as required by
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">7. Children's Privacy</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            Our service is not directed to children under the age of 18. We do not knowingly collect
            personal data from minors. If you are a parent/guardian and believe your child has provided
            us personal data, please contact us immediately and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">8. Data Security</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            We implement reasonable technical and organisational measures to protect your personal data.
            WhatsApp communications are end-to-end encrypted. However, no method of electronic
            transmission is 100% secure. In the event of a data breach, we will notify affected
            individuals as required under DPDPA 2023.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">9. Grievance Officer (Mandatory under IT Act 2000)</h2>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <p><strong className="text-slate-900 dark:text-white">Name:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[GRIEVANCE OFFICER FULL NAME]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Designation:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[DESIGNATION]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Email:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">grievance@kookduku.com [REPLACE]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Phone:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[PHONE NUMBER]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Response Time:</strong> Within 30 days of receiving a complaint.</p>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400">
            If your complaint is not resolved, you may also approach the{" "}
            <strong className="text-slate-900 dark:text-white">Data Protection Board of India</strong> once constituted under DPDPA 2023.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">10. Changes to This Policy</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            We may update this Privacy Policy periodically. Material changes will be communicated via
            a notice on our website. Your continued use of our service after changes constitutes
            acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">11. Governing Law</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            This Privacy Policy is governed by the laws of India. Any disputes shall be subject to
            the exclusive jurisdiction of courts in Bangalore, Karnataka, India.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
