import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, ValidationError } from '@formspree/react';
import PrimaryButton from '../components/common/PrimaryButton';

const BookACall = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center overflow-hidden justify-center bg-bg text-text px-4">
        <div className="relative group text-center p-12 rounded-3xl">
          {/* Success Glow */}
          <div className="absolute top-30 left-30 w-50 h-50 bg-secondary blur-[200px] rounded-full"></div>

          <div className="text-6xl my-6">🚀</div>
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-b from-text to-mutext-mutedText bg-clip-text text-transparent">
            Request Sent!
          </h2>
          <p className="text-mutedText max-w-xs mx-auto text-lg">
            Thanks! Farhan will get back to you shortly to confirm the call for <br />
            <span className="text-primary font-semibold">{startDate.toLocaleString()}</span>.
          </p>

          <div className="pt-4 w-fit mx-auto">
            <PrimaryButton
              onClick={() => window.location.reload()}
              size="md"
              text={'Back to Form'}
              className="rounded-full"
              bgColor={'bg-secondary'}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-text p-5 md:p-7 lg:p-10 overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-primary/50 blur-[200px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative pt-20">
        <SectionHeader
          title={
            <>
              Ready to take your <br />
              Business Digital?
            </>
          }
          description="Select a time that works for you. Let’s discuss your goals and create a plan to scale your project."
          size="xl"
          className="text-center mb-16"
        />

        {/* The Glassmorphic Form */}
        <div className="relative group">
          <form
            onSubmit={handleSubmit}
            className="relative border border-border bg-cardBg/10 backdrop-blur-2xl p-8 md:p-12 rounded-3xl space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-mutedText ml-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="input w-full p-4 text-text"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-mutedText ml-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="input w-full p-4 text-text"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
            </div>

            {/* Date Picker Custom Wrapper */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-mutedText ml-1">
                Preferred Date & Time
              </label>
              <div className="relative custom-datepicker">
                <input type="hidden" name="meeting_date" value={startDate.toLocaleString()} />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy - h:mm aa"
                  className="input w-full p-4 text-text"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-mutedText ml-1">
                Tell me about your project
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="I have an idea for a..."
                className="textarea w-full p-4 text-text"
              ></textarea>
            </div>

            <div className="pt-4">
              <PrimaryButton
                type="submit"
                size="xl"
                text={state.submitting ? 'Processing...' : 'Request a Meeting'}
                disabled={state.submitting}
                className="rounded-2xl"
                bgColor={'bg-primary'}
              />
            </div>
          </form>
        </div>

        {/* Footer Contact Info */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-500 text-sm tracking-[0.2em] uppercase">Or reach out directly</p>
          <a
            href="mailto:farhansadik0760@gmail.com"
            className="text-xl font-medium hover:text-primary transition-colors inline-block"
          >
            farhansadik0760@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookACall;
