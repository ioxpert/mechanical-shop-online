import React, { useState, FormEvent } from "react";
import { CONTACT_INFO, DEVELOPER_INFO } from "../constant/constants";
import { useTranslation } from "../localization/useTranslation";

const PhoneIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const WhatsAppIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);
const MailIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const LocationIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const InstagramIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <rect
      width="20"
      height="20"
      x="2"
      y="2"
      rx="5"
      ry="5"
      strokeWidth="2"></rect>
    <path
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      strokeWidth="2"></path>
    <line
      x1="17.5"
      y1="6.5"
      x2="17.51"
      y2="6.5"
      strokeWidth="2"
      strokeLinecap="round"></line>
  </svg>
);
const WebIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9"
    />
  </svg>
);

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copySuccessMessage, setCopySuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Please fill in your name and message.");
      return;
    }

    const messageToCopy = `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;

    navigator.clipboard
      .writeText(messageToCopy)
      .then(() => {
        setCopySuccessMessage(t("contactFormSuccess"));
        window.open(
          CONTACT_INFO.instagram.url,
          "_blank",
          "noopener,noreferrer"
        );
        setTimeout(() => setCopySuccessMessage(""), 5000); // Clear message after 5 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy message. Please try again.");
      });
  };

  return (
    <div className="bg-light">
      {/* Page Header */}
      <section
        className="relative bg-cover bg-center py-24 text-white text-center"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/contact-hero/1600/900)",
        }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 drop-shadow-lg">
            {t("contactTitle")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            {t("contactSubtitle")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-serif text-primary mb-6">
                {t("contactInfoTitle")}
              </h2>
              <div className="space-y-6 text-gray-700">
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1">
                    <PhoneIcon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {t("contactManager")}
                    </h3>
                    {CONTACT_INFO.managers.map((manager, index) => (
                      <p key={index}>
                        {manager.name}: {manager.phone}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1">
                    <WhatsAppIcon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {t("contactWhatsapp")}
                    </h3>
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors">
                      {CONTACT_INFO.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1">
                    <MailIcon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {t("contactEmail")}
                    </h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="hover:text-secondary transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1">
                    <InstagramIcon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">Instagram</h3>
                    <a
                      href={CONTACT_INFO.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors">
                      {CONTACT_INFO.instagram.handle}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1">
                    <LocationIcon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {t("contactLocation")}
                    </h3>
                    <p>{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-serif text-primary mb-6">
                {t("contactFormTitle")}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-primary font-semibold mb-2">
                    {t("contactFormName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-primary font-semibold mb-2">
                    {t("contactFormEmail")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-primary font-semibold mb-2">
                    {t("contactFormMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary text-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300">
                  {t("contactFormButton")}
                </button>
                {copySuccessMessage && (
                  <p className="mt-4 text-center text-green-600 bg-green-100 p-3 rounded-md">
                    {copySuccessMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold font-serif text-primary mb-4">
            {t("developerTitle")}
          </h3>
          <div className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-md inline-block">
            <p className="text-gray-700 mb-2">{t("developerSubtitle")}</p>

            <p className="font-bold text-lg text-primary">
              {DEVELOPER_INFO.name}
            </p>
            <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-600">
              <span className="flex items-center gap-2">
                <PhoneIcon /> {DEVELOPER_INFO.phone}
              </span>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center gap-2 hover:text-secondary transition-colors">
                <MailIcon />
                {DEVELOPER_INFO.email}
              </a>
              <a
                href={DEVELOPER_INFO.website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                title={DEVELOPER_INFO.website.name}>
                <img
                  src="icons/ioxpert_logo.png"
                  alt="Ioxpert"
                  className="w-25 h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

{
  /* <WebIcon /> */
}
