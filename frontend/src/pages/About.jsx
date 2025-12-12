import React from "react";
import OurMission from "../components/about/OurMission";
import MeetOurFounder from "../components/about/MeetOurFounder";
import ExpertTeam from "../components/about/ExpertTeam";
import OurTechnologyStack from "../components/about/TechStack";
import SectionHeader from "../components/common/SectionHeader";

const About = () => {
  return (
    <main className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      <SectionHeader
        title="About Me"
        description="I am Farhan Sadik, a passionate web developer committed to turning ideas into high-quality digital products that create real impact. I focus on building experiences that solve problems, support business growth, and feel effortless for users."
        size="lg"
      />

      <section aria-labelledby="mission-section">
        <OurMission />
      </section>

      <section aria-labelledby="founder-section">
        <MeetOurFounder />
      </section>

      <section aria-labelledby="team-section">
        <ExpertTeam />
      </section>

      <section aria-labelledby="techstack-section">
        <OurTechnologyStack />
      </section>
    </main>
  );
};

export default About;
