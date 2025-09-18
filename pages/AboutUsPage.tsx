
import React from 'react';
import { TEAM_MEMBERS, TOOLS_MATERIALS } from '../constants';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Page Header */}
      <section 
        className="relative bg-cover bg-center py-24 text-white text-center"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/about-hero/1600/900)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Discover the passion, precision, and people behind Shri Guru Nanak Glass and Aluminium.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img src="https://picsum.photos/seed/about-workshop/800/600" alt="Our Workshop" className="rounded-lg shadow-xl w-full" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 text-lg">
              Founded on the principles of integrity and excellence, Shri Guru Nanak Glass and Aluminium has grown from a small local workshop into a leading provider of architectural glass and aluminum solutions.
            </p>
            <p className="text-gray-600 mb-4">
              With decades of experience in the industry, we pride ourselves on delivering superior quality products and exceptional craftsmanship. Our commitment to innovation and customer satisfaction has made us a trusted partner for architects, builders, and homeowners alike.
            </p>
            <p className="text-gray-600">
              From bespoke residential projects to large-scale commercial installations, we bring expertise, precision, and a keen eye for design to every job. We believe in building lasting relationships with our clients by exceeding their expectations every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Tools & Materials Section */}
      <section id="quality" className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">Our Commitment to Quality</h2>
            <p className="text-gray-700 text-lg mb-12">
              We believe that exceptional results begin with the finest tools and materials. That's why we invest in state-of-the-art equipment and source only high-grade glass and aluminum to ensure durability, safety, and a flawless finish.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TOOLS_MATERIALS.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img className="w-full h-56 object-cover" src={item.imageUrl} alt={item.name} />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-primary mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-serif text-center text-primary mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg text-center p-8 flex flex-col items-center">
                <img 
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-secondary" 
                  src={member.imageUrl} 
                  alt={member.name} 
                />
                <h3 className="text-xl font-bold font-serif text-primary">{member.name}</h3>
                <p className="text-secondary font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
