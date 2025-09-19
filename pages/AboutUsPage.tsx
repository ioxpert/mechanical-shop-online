import React from "react";
import { TEAM_MEMBERS, TOOLS_MATERIALS } from "../constants";
import { useTranslation } from "../localization/useTranslation";

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-light">
      {/* Page Header */}
      <section
        className="relative bg-cover bg-center py-24 text-white text-center"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/about-hero/1600/900)",
        }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 drop-shadow-lg">
            {t("aboutTitle")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            {t("aboutSubtitle")}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://picsum.photos/seed/about-workshop/800/600"
              alt={t("ourWorkshopAlt")}
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">
              {t("ourStoryTitle")}
            </h2>
            <p className="text-gray-600 mb-4 text-lg">{t("ourStoryP1")}</p>
            <p className="text-gray-600 mb-4">{t("ourStoryP2")}</p>
            <p className="text-gray-600">{t("ourStoryP3")}</p>
          </div>
        </div>
      </section>

      {/* Tools & Materials Section */}
      <section id="quality" className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">
              {t("qualityTitle")}
            </h2>
            <p className="text-gray-700 text-lg mb-12">
              {t("qualitySubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TOOLS_MATERIALS.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img
                  className="w-full h-56 object-cover"
                  src={item.imageUrl}
                  alt={t(item.nameKey)}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-primary mb-2">
                    {t(item.nameKey)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-serif text-center text-primary mb-12">
            {t("teamTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg text-center p-8 flex flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-secondary"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h3 className="text-xl font-bold font-serif text-primary">
                  {member.name}
                </h3>
                <p className="text-secondary font-semibold mb-2">
                  {t(member.roleKey)}
                </p>
                <p className="text-gray-600 text-sm">{t(member.bioKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
