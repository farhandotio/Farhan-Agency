import React, { useState, useCallback } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Banknote,
  Bitcoin,
  Clock,
  CheckCircle,
  Send,
  Upload,
  Tablet,
  Palette,
  Calendar,
  ChevronDown,
} from "lucide-react";

const QUICK_ORDER_TEMPLATES = [
  {
    title: "Website Design",
    description: "Complete website solution",
    icon: Globe,
  },
  {
    title: "Logo Design",
    description: "Brand identity package",
    icon: Palette,
  },
  {
    title: "Mobile App",
    description: "iOS & Android development",
    icon: Tablet,
  },
];

const TemplateItem = ({ title, description, icon: Icon }) => (
  <div className="p-4 flex flex-col items-center text-center bg-cardBg rounded-lg border border-border hover:border-primary transition duration-300 cursor-pointer shadow-sm">
    <Icon className="w-6 h-6 text-primary mb-2" />
    <p className="font-semibold text-text text-sm">{title}</p>
    <p className="text-xs text-mutedText mt-0.5">{description}</p>
  </div>
);

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  // Simplified drag handlers for visual feedback
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    setFileCount(files.length);
    console.log(`Files dropped: ${files.length}`);
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileCount(files.length);
    console.log(`Files selected: ${files.length}`);
  };

  const handleFileInputClick = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div
      className={`mt-2 border-2 border-dashed p-8 text-center rounded-xl transition-colors duration-300
        ${isDragging ? "border-primary" : "border-border bg-hoverCardBg"}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter} // Must have both for drop to work
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-8 h-8 mx-auto text-mutedText mb-3" />
      <p className="text-mutedText text-sm">
        {fileCount > 0
          ? `${fileCount} file(s) ready for submission.`
          : "Drag and drop files here or click to browse"}
      </p>
      <button
        type="button" // Important to prevent form submission
        className="text-sm font-semibold text-primary hover:text-hoverPrimary mt-1"
        onClick={handleFileInputClick}
      >
        Choose Files
      </button>
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    projectType: "Select project type",
    budgetRange: "Select budget",
    projectDeadline: "",
    projectBrief: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: "", text: "" });

    if (!formData.termsAccepted) {
      setSubmitMessage({
        type: "error",
        text: "You must agree to the terms and conditions.",
      });
      return;
    }

    setIsSubmitting(true);

    // --- API Call Placeholder ---
    try {
      // Simulate an API call delay (e.g., fetching, sending email, saving to Firestore)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log the data for demonstration purposes
      console.log("Form Submitted successfully:", formData);

      setSubmitMessage({
        type: "success",
        text: "Thank you! Your project request has been submitted successfully. We will contact you soon.",
      });
      // Optionally reset form here: setFormData({...initialState});
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitMessage({
        type: "error",
        text: "There was an error submitting your form. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
    // --- End API Call Placeholder ---
  };

  return (
    <section className="lg:col-span-2 bg-cardBg p-5 md:p-10 rounded-xl shadow-lg border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Details */}
        <div>
          <h2 className="text-xl font-bold text-text mb-6">Project Details</h2>

          {/* Quick Order Templates */}
          <p className="font-semibold text-text mb-3">Quick Order Templates</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {QUICK_ORDER_TEMPLATES.map((item, index) => (
              <TemplateItem key={index} {...item} />
            ))}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-text"
              >
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-3 input"
                disabled={isSubmitting}
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label
                htmlFor="emailAddress"
                className="text-sm font-medium text-text"
              >
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="w-full p-3 input"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-text"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-3 input"
                disabled={isSubmitting}
              />
            </div>

            {/* Project Type Dropdown */}
            <div className="space-y-1">
              <label
                htmlFor="projectType"
                className="text-sm font-medium text-text"
              >
                Project Type <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <select
                  name="projectType"
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 select appearance-none"
                  disabled={isSubmitting}
                >
                  <option value="Select project type" disabled>
                    Select project type
                  </option>
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Branding/Logo">Branding/Logo</option>
                  <option value="Custom Software">Custom Software</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mutedText pointer-events-none" />
              </div>
            </div>

            {/* Budget Range Dropdown */}
            <div className="space-y-1">
              <label
                htmlFor="budgetRange"
                className="text-sm font-medium text-text"
              >
                Budget Range <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <select
                  name="budgetRange"
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  required
                  className="select w-full p-3 appearance-none"
                  disabled={isSubmitting}
                >
                  <option value="Select budget" disabled>
                    Select budget
                  </option>
                  <option value="$500 - $1K">$1,000 - $5,000</option>
                  <option value="$1K - $5K">$1,000 - $5,000</option>
                  <option value="$5K - $10K">$5,000 - $10,000</option>
                  <option value="$10K+">$10,000+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mutedText pointer-events-none" />
              </div>
            </div>

            {/* Project Deadline Date Picker */}
            <div className="space-y-1">
              <label
                htmlFor="projectDeadline"
                className="text-sm font-medium text-text"
              >
                Project Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="projectDeadline"
                  id="projectDeadline"
                  value={formData.projectDeadline}
                  onChange={handleChange}
                  className="input w-full p-3 bg-cardBg"
                  placeholder="mm/dd/yyyy"
                  disabled={isSubmitting}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mutedText pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Project Brief Textarea (Full Width) */}
          <div className="space-y-1 mt-6">
            <label
              htmlFor="projectBrief"
              className="text-sm font-medium text-text"
            >
              Project Brief <span className="text-danger">*</span>
            </label>
            <textarea
              name="projectBrief"
              id="projectBrief"
              value={formData.projectBrief}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your project, goals, target audience, and any specific requirements..."
              required
              className="textarea w-full p-3 resize-none"
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Upload Files */}
          <div className="space-y-1 mt-6">
            <label className="text-sm font-medium text-text">
              Upload Files
            </label>
            <FileUpload />
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4 checked:bg-primary"
              required
              disabled={isSubmitting}
            />
            <span className="text-sm text-text">
              I agree to the terms and conditions, including 50% upfront payment
              requirement <span className="text-danger">*</span>
            </span>
          </label>
        </div>

        {/* Submission Message Area */}
        {submitMessage.text && (
          <div
            className={`p-3 rounded-lg text-sm font-medium ${
              submitMessage.type === "success"
                ? "bg-hoverCardBg text-green-700 border border-green-300"
                : "bg-cardBg text-red-700 border border-red-300"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-primary hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:bg-hoverCardBg cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <Send className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? "Sending Request..." : "Submit Project Request"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
