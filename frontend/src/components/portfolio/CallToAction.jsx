import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';

const CallToAction = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-3/5 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/5 -translate-y-1/2 right-1/4 w-[300px] h-[350px] bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="min-h-[500px] flex items-center justify-center">
        <div className="relative mx-auto px-5 sm:px-7 lg:px-10 text-center">
          <SectionHeader
            title="Ready to Build Something Amazing Together?"
            description="Let’s turn your ideas into a modern, scalable, and high-performing web solution. I’m
            here to help from planning to deployment.."
            size="xl"
            className=""
          />

          {/* Buttons */}
          <div className="flex justify-center max-md:flex-col gap-4 mx-auto md:w-fit  md:-mt-10">
            <div className="inline-block md:mr-auto">
              <PrimaryButton text="Book A Call" url="contact" size="xl" className="rounded-full" />
            </div>
            <div className="inline-block md:ml-auto">
              <PrimaryButton
                text="Hire Me"
                url="contact"
                size="xl"
                className="rounded-full"
                bgColor={'bg-secondary'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
