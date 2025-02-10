import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Returns</h2>
        <p className="mt-2">Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.</p>
        <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
        <p>Several types of goods are exempt from being returned, such as perishable goods, intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
        <p className="font-semibold">Additional non-returnable items:</p>
        <ul className="list-disc ml-6">
          <li>Gift cards</li>
          <li>Downloadable software products</li>
          <li>Some health and personal care items</li>
        </ul>
        <p>To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Refunds (if applicable)</h2>
        <p>Once your return is received and inspected, we will notify you about the approval or rejection of your refund.</p>
        <p>If approved, your refund will be processed, and a credit will be applied to your original method of payment within a certain amount of days.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Late or Missing Refunds (if applicable)</h2>
        <p>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company and bank, as processing times may vary.</p>
        <p>If you’ve done all of this and still haven’t received your refund, please contact us at <span className="font-semibold">[itsyour.rohan@gmail.com]</span>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Sale Items (if applicable)</h2>
        <p>Only regular priced items may be refunded; unfortunately, sale items cannot be refunded.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Exchanges (if applicable)</h2>
        <p>We only replace items if they are defective or damaged. To request an exchange, email us at <span className="font-semibold">[itsyour.rohan@gmail.com]</span> and send your item to:</p>
        <p className="font-semibold">urban estate phase 1 , jalandhar punjab 144022</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Gifts</h2>
        <p>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return.</p>
        <p>If the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <p>To return your product, mail it to:</p>
        <p className="font-semibold">urban estate phase 1 , jalandhar punjab 144022</p>
        <p>You will be responsible for paying your own shipping costs. Shipping costs are non-refundable.</p>
        <p>If you are shipping an item over $75, consider using a trackable shipping service or purchasing shipping insurance.</p>
      </section>
    </div>
  );
};

export default RefundPolicy;
