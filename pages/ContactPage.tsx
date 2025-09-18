
import React from 'react';
import { CONTACT_INFO, DEVELOPER_INFO } from '../constants';

const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"></line></svg>
);
const WebIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9" /></svg>
);

const ContactPage: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Page Header */}
      <section
        className="relative bg-cover bg-center py-24 text-white text-center"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/contact-hero/1600/900)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            We're here to help. Reach out to us for quotes, questions, or to discuss your next project.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-serif text-primary mb-6">Our Information</h2>
              <div className="space-y-6 text-gray-700">
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1"><PhoneIcon /></span>
                  <div>
                    <h3 className="font-semibold text-primary">Manager Contacts</h3>
                    {CONTACT_INFO.managers.map((manager, index) => (
                      <p key={index}>{manager.name}: {manager.phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1"><MailIcon /></span>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-secondary transition-colors">{CONTACT_INFO.email}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                    <span className="text-secondary mt-1"><InstagramIcon /></span>
                    <div>
                        <h3 className="font-semibold text-primary">Instagram</h3>
                        <a href={CONTACT_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">{CONTACT_INFO.instagram.handle}</a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-secondary mt-1"><LocationIcon /></span>
                  <div>
                    <h3 className="font-semibold text-primary">Shop Location</h3>
                    <p>{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-serif text-primary mb-6">Send Us a Message</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-primary font-semibold mb-2">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-primary font-semibold mb-2">Your Email</label>
                  <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-primary font-semibold mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                </div>
                <button type="submit" className="w-full bg-secondary text-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold font-serif text-primary mb-4">Website Inquiries</h3>
            <div className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-md inline-block">
                <p className="text-gray-700 mb-2">For questions or issues related to the website, please contact:</p>
                <p className="font-bold text-lg text-primary">{DEVELOPER_INFO.name}</p>
                <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-600">
                    <span className="flex items-center gap-2"><PhoneIcon /> {DEVELOPER_INFO.phone}</span>
                    <a href={`mailto:${DEVELOPER_INFO.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors"><MailIcon />{DEVELOPER_INFO.email}</a>
                    <a href={DEVELOPER_INFO.website.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors"><WebIcon />{DEVELOPER_INFO.website.name}</a>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
