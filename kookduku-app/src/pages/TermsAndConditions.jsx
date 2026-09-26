import React from "react";
import LegalLayout from "../components/LegalLayout";

/**
 * TermsAndConditions — Compliant with Consumer Protection Act 2019,
 * Consumer Protection (E-Commerce) Rules 2020, FSSAI Regulations,
 * and applicable Indian law.
 *
 * ⚠️ IMPORTANT: This is a template. Have a qualified Indian lawyer
 * review and finalise this document before publishing.
 */
export default function TermsAndConditions() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="[DATE — REPLACE BEFORE PUBLISHING]">
      <div className="space-y-6">

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/40 text-xs text-amber-900 dark:text-amber-200">
          ⚠️ Template — Replace all <span className="font-bold text-amber-950 dark:text-amber-100">[PLACEHOLDER]</span> values before publishing.
          Have this reviewed by a qualified Indian lawyer.
        </div>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            By accessing or using the Kook Du Ku website (the "<strong className="text-slate-900 dark:text-white">Site</strong>"),
            you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">2. About Us (Mandatory Disclosure — E-Commerce Rules 2020)</h2>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <p><strong className="text-slate-900 dark:text-white">Legal Entity Name:</strong> Kook Du Ku Foods Pvt Ltd <span className="text-amber-700 dark:text-amber-300 font-mono">[REPLACE WITH EXACT LEGAL NAME]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Type:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[Private Limited / Sole Proprietorship / Partnership — CHOOSE ONE]</span></p>
            <p><strong className="text-slate-900 dark:text-white">CIN / Registration No.:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[COMPANY IDENTIFICATION NUMBER]</span></p>
            <p><strong className="text-slate-900 dark:text-white">GSTIN:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[GST REGISTRATION NUMBER — Required if GST-registered]</span></p>
            <p><strong className="text-slate-900 dark:text-white">FSSAI Registration No.:</strong> <span className="font-mono font-bold text-slate-900 dark:text-white">20725002000562</span></p>
            <p><strong className="text-slate-900 dark:text-white">Registered Office:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[FULL REGISTERED ADDRESS]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Principal Place of Business:</strong> Kook Du Ku Restaurant, F/23–24, Royal Heights, Near Vaishnodevi Circle, Ahmedabad – 382421 <span className="text-amber-700 dark:text-amber-300 font-mono">[VERIFY]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Contact Email:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">hello@kookduku.com [REPLACE]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Contact Phone:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[YOUR ACTUAL PHONE NUMBER]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Grievance Officer:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[NAME, EMAIL, PHONE — Required under E-Commerce Rules 2020, Rule 5(3)(f)]</span></p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">3. Our Services</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            Kook Du Ku is a restaurant offering authentic Indian cuisine — slow dum-cooked curries,
            biryanis, tikkas, and clay pot specialities — for delivery and pickup via WhatsApp ordering.
            We operate from{" "}
            <strong className="text-slate-900 dark:text-white">12:00 PM – 3:00 PM and 6:00 PM – 12:00 AM, Monday to Sunday</strong>.
          </p>
          <p className="mt-2 text-slate-700 dark:text-neutral-300">
            This site is a digital menu and ordering interface. Actual order processing occurs via WhatsApp.
            Orders are confirmed only upon acknowledgement by our team via WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">4. Pricing, Taxes &amp; Payments</h2>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li>All prices displayed on the Site are in <strong className="text-slate-900 dark:text-white">Indian Rupees (₹)</strong>.</li>
            <li>
              Prices are <span className="text-amber-700 dark:text-amber-300 font-mono">[INCLUSIVE / EXCLUSIVE — CHOOSE ONE]</span> of
              applicable GST. <span className="text-amber-700 dark:text-amber-300 font-mono">[If exclusive: state GST rate, e.g., 5% for restaurant food delivered]</span>
            </li>
            <li>Prices are subject to change without prior notice. The price at the time of order confirmation applies.</li>
            <li>Promotional discounts (e.g., KOOKDUKU20) are valid only during the stated promotional period and are subject to availability.</li>
            <li>Payment terms are as communicated at the time of ordering via WhatsApp.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">5. Orders, Delivery &amp; Preparation</h2>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li>Preparation time is approximately <strong className="text-slate-900 dark:text-white">25–30 minutes</strong> after order confirmation, subject to kitchen load.</li>
            <li>We reserve the right to refuse or cancel any order at our discretion (e.g., if items are out of stock).</li>
            <li>Delivery availability, charges, and area coverage are as communicated via WhatsApp.</li>
            <li>Risk of loss and title for food items passes to you upon delivery/handover to the delivery executive.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">6. Food Safety, Allergens &amp; Dietary Information</h2>
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/40 text-xs text-red-900 dark:text-red-200 mb-2">
            ⚠️ <strong className="text-red-950 dark:text-red-100 font-bold">Allergen Warning:</strong> Our kitchen handles nuts, dairy, gluten, and other common allergens.
            Cross-contamination is possible. If you have a food allergy or intolerance, please inform us
            before ordering via WhatsApp.
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li>All food is prepared in compliance with <strong className="text-slate-900 dark:text-white">FSSAI regulations</strong>.</li>
            <li>Veg/Non-Veg symbols displayed follow FSSAI's Food Safety and Standards (Labelling and Display) Regulations, 2020.</li>
            <li>Nutritional information is available upon request via WhatsApp.</li>
            <li>We are not liable for allergic reactions arising from undisclosed allergy information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">7. Accuracy of Menu Information</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            We strive to keep menu information accurate. However, dish availability, prices, and
            descriptions may change without notice. Food photography and descriptions are for
            illustrative purposes only; actual products may vary.
          </p>
          <p className="mt-2 text-slate-700 dark:text-neutral-300">
            <strong className="text-slate-900 dark:text-white">Ratings and reviews:</strong> Any ratings displayed on this site
            reflect <strong className="text-slate-900 dark:text-white">internal quality standards only and are not sourced from
            third-party verified review platforms</strong>. We do not display third-party aggregated ratings
            without verification.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">8. Marketing Claims</h2>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li><strong className="text-slate-900 dark:text-white">"Slow Dum Cooking" / "Clay Pot":</strong> Refers to our actual cooking method using clay handi vessels and slow-cooking techniques.</li>
            <li><strong className="text-slate-900 dark:text-white">"100% Contactless":</strong> Refers to no-contact delivery/pickup where hygienically packaged food is handed over without direct contact. Actual contactless delivery depends on delivery partner availability.</li>
            <li><strong className="text-slate-900 dark:text-white">"Biodegradable packaging":</strong> Refers to the use of natural terracotta clay pots sealed with wheat flour. Individual packaging may vary.</li>
            <li><strong className="text-slate-900 dark:text-white">Promo codes:</strong> Discount codes (e.g., KOOKDUKU20) are valid on qualifying orders above the stated minimum, subject to promotional terms communicated separately.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">9. Intellectual Property</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            All content on this Site — including text, logo, design, graphics, and code — is the property of
            Kook Du Ku Foods Pvt Ltd or its licensors and is protected under applicable Indian intellectual
            property laws. Reproduction without permission is prohibited.
          </p>
          <p className="mt-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/40">
            ⚠️ IMPORTANT: Food photography on this site was generated using Google Stitch (AI image generation).
            Before using this site commercially, verify the licensing terms for AI-generated images under
            Google Stitch's terms of service. Replace with licensed, original photography for production use.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">10. Prohibited Uses</h2>
          <p className="text-slate-700 dark:text-neutral-300">You may not use this Site to:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
            <li>Scrape or copy content for commercial use without permission.</li>
            <li>Engage in any fraudulent, deceptive, or harmful activity.</li>
            <li>Violate any applicable Indian law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">11. Limitation of Liability</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            To the extent permitted by Indian law, Kook Du Ku's total liability for any claim arising
            from use of the Site or our services shall not exceed the value of the order in question.
            We are not liable for indirect, incidental, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">12. Grievance Redressal (Consumer Protection Act 2019)</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            In accordance with the Consumer Protection Act 2019 and E-Commerce Rules 2020, you may lodge
            a complaint with our Grievance Officer. We will acknowledge within 48 hours and resolve
            within 30 days.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 mt-2 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <p><strong className="text-slate-900 dark:text-white">Grievance Officer:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[FULL NAME]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Email:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">grievance@kookduku.com [REPLACE]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Response Time:</strong> 48 hours acknowledgement / 30 days resolution</p>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400">
            You may also approach the National Consumer Disputes Redressal Commission (NCDRC) or your
            State Consumer Disputes Redressal Commission if your complaint is not resolved satisfactorily.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">13. Governing Law &amp; Dispute Resolution</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            These Terms are governed by the laws of India. Any dispute shall first be attempted to be
            resolved amicably. If unresolved within 30 days, disputes shall be subject to the exclusive
            jurisdiction of courts in <strong className="text-slate-900 dark:text-white">Bangalore, Karnataka, India</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">14. Changes to These Terms</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            We reserve the right to modify these Terms at any time. Continued use of the Site after
            changes constitutes acceptance. We recommend reviewing these Terms periodically.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
