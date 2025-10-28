import TopBar from "@components/Website/Layout/topbar";
import UtilityRow from "@components/Website/Layout/utilityrow";
import Footer from "@components/website/layout/footer";

const DisclosurePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <UtilityRow />

      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Disclosure <span className="text-[#2DB3FF]">Policy</span>
            </h1>
            <p className="text-lg text-gray-700">
              Transparency and honesty are important to us. This disclosure
              policy explains how we maintain trust and integrity when sharing
              content, recommendations, or services.
            </p>
            <p className="text-gray-700">
              We believe in being upfront about partnerships, sponsorships, and
              affiliate relationships so you can make informed decisions.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md md:max-w-lg rounded-2xl shadow-xl bg-[#2DB3FF]-100 flex items-center justify-center p-10">
              <span className="text-6xl">🔎</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our <span className="text-[#2DB3FF]">Disclosures</span>
          </h2>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Affiliate Links
              </h3>
              <p>
                Some links on our website may be affiliate links. This means we
                may earn a small commission if you purchase through these links,
                at no additional cost to you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Sponsored Content
              </h3>
              <p>
                Occasionally, we may publish sponsored posts. Such content will
                always be clearly marked so you can easily identify it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. Honest Reviews
              </h3>
              <p>
                We only share reviews and recommendations based on our honest
                opinions, experiences, or thorough research. Our goal is to help
                you make informed decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Financial Disclosures
              </h3>
              <p>
                Any financial or material relationships that could influence our
                content will always be disclosed in advance to maintain
                transparency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                5. Updates to Policy
              </h3>
              <p>
                We may revise this disclosure policy from time to time. Updates
                will always be posted on this page for full transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DisclosurePolicy;
