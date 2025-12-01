"use client";

export default function Location() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Our Office
        </h2>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          ARNA SKIN CARE, Shop No. 03, David Chawl, Near Saint Joseph English High School,
          Opposite Nazar Ali Imam Bada, Opposite Mansi Apartment, New Mill Road,
          Kurla West, Mumbai 400070
        </p>

        <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3770.858470198494!2d72.87604706120126!3d19.06995928205893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20ARNA%20SKIN%20Care%20shop%20number%2003%20David%20Chawl%20near%20Saint%20Joseph%20English%20High%20School%20opposite%20Nazar%20Ali%20Imam%20Bada%20opposite%20Mansi%20apartment%20new%20Mill%20road%20Kurla%20West%20Mumbai%20400070!5e0!3m2!1sen!2sin!4v1764535189042!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
