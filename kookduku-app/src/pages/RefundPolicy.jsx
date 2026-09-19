import React from "react";
import LegalLayout from "../components/LegalLayout";

/**
 * RefundPolicy — Compliant with Consumer Protection Act 2019 and
 * Consumer Protection (E-Commerce) Rules 2020.
 * Food orders have specific non-refundable conditions once prepared.
 */
export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" lastUpdated="[DATE — REPLACE BEFORE PUBLISHING]">
      <div className="space-y-6">

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/40 text-xs text-amber-900 dark:text-amber-200">
          ⚠️ Template — Replace all <span className="font-bold text-amber-950 dark:text-amber-100">[PLACEHOLDER]</span> values. Review with a lawyer
          before publishing.
        </div>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">1. Our Commitment</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            At Kook Du Ku, we are committed to your satisfaction. We strive to ensure every order
            meets our quality standards. If something goes wrong, we will make it right.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">2. Order Cancellations</h2>
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30">
              <p className="font-bold text-emerald-950 dark:text-emerald-200 text-xs mb-1">✅ You can cancel — Free of charge</p>
              <ul className="list-disc pl-4 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
                <li>Cancellation within <strong className="text-emerald-950 dark:text-white">5 minutes</strong> of placing the order via WhatsApp, provided the kitchen has not yet started preparation.</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30">
              <p className="font-bold text-red-950 dark:text-red-200 text-xs mb-1">❌ Cancellation not possible</p>
              <ul className="list-disc pl-4 text-xs text-red-900 dark:text-red-300 space-y-1">
                <li>Once our kitchen team has confirmed and begun preparation of your order.</li>
                <li>After the 5-minute window has elapsed.</li>
                <li>Once the food has been dispatched for delivery.</li>
              </ul>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400">
            To cancel, message us immediately on WhatsApp at{" "}
            <span className="text-amber-700 dark:text-amber-300 font-mono">[YOUR WHATSAPP NUMBER]</span>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">3. Refund Eligibility</h2>
          <p className="mb-2 text-slate-700 dark:text-neutral-300">You are eligible for a refund or replacement in the following cases:</p>
          <div className="space-y-2">
            {[
              { icon: "✅", title: "Wrong item delivered", desc: "If you received a different dish than what you ordered, we will send the correct item or issue a full refund." },
              { icon: "✅", title: "Quality issue", desc: "If the food is found to be spoiled, contains foreign objects, or is substantially different from what was described, contact us within 30 minutes of delivery with photo evidence." },
              { icon: "✅", title: "Order not delivered", desc: "If your prepaid order was not delivered and we cannot redeliver within a reasonable time, a full refund will be issued." },
              { icon: "✅", title: "Order cancelled by us", desc: "If we cancel your order due to unavailability of items or operational issues, a full refund will be issued." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                <p className="font-bold text-slate-900 dark:text-white text-xs mb-1">{icon} {title}</p>
                <p className="text-xs text-slate-600 dark:text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">4. Non-Refundable Situations</h2>
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <li>Change of mind after food preparation has begun.</li>
            <li>Dissatisfaction with spice level, taste, or portion size where the item was correctly described on the menu.</li>
            <li>Delays caused by factors outside our control (e.g., traffic, weather, delivery partner issues).</li>
            <li>Allergy reactions where we were not informed of the allergy prior to ordering.</li>
            <li>Orders where you provided an incorrect address or were unavailable to receive delivery.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">5. How to Request a Refund</h2>
          <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-700 dark:text-neutral-300">
            <li>
              <strong className="text-slate-900 dark:text-white">Contact us within 30 minutes of receiving your order</strong> via
              WhatsApp at <span className="text-amber-700 dark:text-amber-300 font-mono">[YOUR WHATSAPP NUMBER]</span> or email at{" "}
              <span className="text-amber-700 dark:text-amber-300 font-mono">support@kookduku.com [REPLACE]</span>.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Provide:</strong> Your order details (date, items, amount), a brief
              description of the issue, and a photo of the food/packaging (where applicable).
            </li>
            <li>
              We will <strong className="text-slate-900 dark:text-white">acknowledge within 24 hours</strong> and resolve your
              complaint within <strong className="text-slate-900 dark:text-white">7 business days</strong>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">6. Refund Processing</h2>
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <li>Approved refunds will be processed to your original payment method.</li>
            <li>
              Refund processing time: <strong className="text-slate-900 dark:text-white">5–7 business days</strong> after approval
              (depending on your bank/payment provider).
            </li>
            <li>
              For cash-on-delivery orders, refunds will be made via bank transfer (NEFT/UPI).
              You will need to provide your bank account details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">7. Grievance Redressal</h2>
          <p className="text-xs text-slate-700 dark:text-neutral-300">
            If your refund complaint is not resolved satisfactorily, you may escalate to our Grievance Officer:
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 mt-2 space-y-1.5 text-xs text-slate-700 dark:text-neutral-300">
            <p><strong className="text-slate-900 dark:text-white">Grievance Officer:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">[FULL NAME]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Email:</strong> <span className="text-amber-700 dark:text-amber-300 font-mono">grievance@kookduku.com [REPLACE]</span></p>
            <p><strong className="text-slate-900 dark:text-white">Response Time:</strong> 48 hours acknowledgement / 30 days resolution</p>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400">
            You may also approach the National Consumer Helpline (NCH) at 1800-11-4000 or file a complaint
            at the Consumer Online Resource and Empowerment Centre (
            <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#C0392B] dark:text-[#FF535A] font-semibold underline">
              consumerhelpline.gov.in
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">8. Governing Law</h2>
          <p className="text-xs text-slate-700 dark:text-neutral-300">
            This Refund Policy is governed by the Consumer Protection Act 2019 and other applicable
            Indian laws. Disputes shall be subject to the jurisdiction of courts in Bangalore, Karnataka.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
