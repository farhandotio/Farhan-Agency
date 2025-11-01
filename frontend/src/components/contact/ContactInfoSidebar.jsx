import React from 'react'
import { Mail, Phone, MapPin, Globe, CreditCard, Banknote, Bitcoin, Clock, CheckCircle, Send, Upload, Tablet, Palette, Calendar, ChevronDown } from 'lucide-react';

const PAYMENT_OPTIONS = [
  { name: 'PayPal', icon: CreditCard, color: 'text-blue-600' },
  { name: 'Stripe', icon: CreditCard, color: 'text-indigo-600' },
  { name: 'Bank Transfer', icon: Banknote, color: 'text-gray-600' },
  { name: 'Cryptocurrency', icon: Bitcoin, color: 'text-yellow-500' },
];

const RESPONSE_TIMES = [
  { text: 'Initial response: 2-4 hours', icon: Clock },
  { text: 'Detailed proposal: 24 hours', icon: CheckCircle },
  { text: 'Project kickoff: 48 hours', icon: Send },
];

const CONTACT_INFO = [
  { detail: 'hello@farhanagency.com', icon: Mail, type: 'email' },
  { detail: '+1 (555) 123-4567', icon: Phone, type: 'phone' },
  { detail: 'New York, NY', icon: MapPin, type: 'location' },
];

// --- Utility Components ---

// Generic Card for Sidebar Sections
const SidebarCard = ({ title, children }) => (
  <div className="bg-cardBg border border-border p-5 md:p-10 rounded-xl shadow-sm mb-5 md:mb-10">
    <h3 className="text-lg font-semibold text-text mb-3">{title}</h3>
    <div className="space-y-3 md:space-y-5">
      {children}
    </div>
  </div>
);

const ContactInfoSidebar = () => (
  <aside className="lg:col-span-1 space-y-10">
    {/* Payment Options Card */}
    <SidebarCard title="Payment Options">
      {PAYMENT_OPTIONS.map((option, index) => {
        const Icon = option.icon;
        return (
          <div key={index} className="flex items-center space-x-3 text-mutedText">
            <Icon className={`w-5 h-5 ${option.color}`} />
            <span className="text-sm">{option.name}</span>
          </div>
        );
      })}
    </SidebarCard>

    {/* Response Time Card */}
    <SidebarCard title="Response Time">
      {RESPONSE_TIMES.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center space-x-3 text-mutedText">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm">{item.text}</span>
          </div>
        );
      })}
    </SidebarCard>

    {/* Get in Touch Card */}
    <SidebarCard title="Get in Touch">
      {CONTACT_INFO.map((info, index) => {
        const Icon = info.icon;
        return (
          <div key={index} className="flex items-start space-x-3">
            <Icon className="w-5 h-5 text-mutedText mt-1 shrink-0" />
            <div>
              {info.type === 'email' ? (
                <a href={`mailto:${info.detail}`} className="text-sm text-primary hover:underline">
                  {info.detail}
                </a>
              ) : info.type === 'phone' ? (
                <a href={`tel:${info.detail.replace(/[^0-9+]/g, '')}`} className="text-sm text-primary hover:underline">
                  {info.detail}
                </a>
              ) : (
                <p className="text-sm text-mutedText">{info.detail}</p>
              )}
            </div>
          </div>
        );
      })}
    </SidebarCard>
    
  </aside>
);

export default ContactInfoSidebar