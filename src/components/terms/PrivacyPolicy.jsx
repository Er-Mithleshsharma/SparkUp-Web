import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold">1. What Do We Do With Your Information?</h2>
          <p>
            When you purchase something from our store, we collect personal information like your name, address, and email. Additionally, your IP address is collected to enhance your browsing experience.
          </p>
          <p>
            With your permission, we may send you emails about our store, new products, and other updates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Consent</h2>
          <p>
            By providing personal information to complete a transaction, you consent to its collection and use for that purpose only. If we ask for your personal information for a secondary reason, like marketing, we will ask for your explicit consent or provide an option to decline.
          </p>
          <p>
            You may withdraw your consent anytime by contacting us at [+919592004177] or mailing us at: [itsyour.rohan@gmail.com].
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Disclosure</h2>
          <p>
            We may disclose your information if required by law or if you violate our Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Payment</h2>
          <p>
            We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as necessary to complete your transaction and is not saved thereafter.
          </p>
          <p>
            Our payment gateway adheres to PCI-DSS standards managed by the PCI Security Standards Council, ensuring secure handling of credit card information.
          </p>
          <p>
            For more details, refer to Razorpay's terms at <a href="https://razorpay.com" className="text-blue-500">Razorpay's website</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
          <p>
            Third-party providers collect, use, and disclose your information only as necessary to perform their services. Some providers, like payment gateways, have their own privacy policies governing their handling of data.
          </p>
          <p>
            If you proceed with a transaction involving a third-party provider, your data may be subject to the jurisdiction where their facilities are located.
          </p>
          <p>
            Once you leave our store or are redirected to a third-party website, our Privacy Policy and Terms of Service no longer apply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Security</h2>
          <p>
            We take reasonable precautions and follow industry best practices to protect your personal information from loss, misuse, unauthorized access, disclosure, alteration, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Cookies</h2>
          <p>
            We use cookies to maintain your session but do not track personal information across websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Age of Consent</h2>
          <p>
            By using our site, you confirm that you are at least the age of majority in your jurisdiction, or you have given consent for minor dependents to use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Changes to this Privacy Policy</h2>
          <p>
            We reserve the right to modify this policy at any time. Changes take effect immediately upon posting. Material changes will be notified on our website.
          </p>
          <p>
            If our store is acquired or merged with another company, your information may be transferred to continue serving you.
          </p>
        </section>
      </div>

      <div className="mt-6 text-center">
        <p>
          For inquiries, contact our Privacy Compliance Officer at
          <span className="text-blue-500"> [itsyour.rohan@gmail.com]</span> or
          Reach us at: 
        </p>
        <p className="font-semibold">urban estate phase 1 , jalandhar punjab 144022</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
