// Services.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/services/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          "https://farhan-agency.onrender.com/api/services"
        );
        setServices(data.data || data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return null
  }

  return (
    <div className="min-h-screen bg-bg py-30 px-5 sm:px-7 lg:px-10">
      <header className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-8">
          Our Services
        </h2>
        <p className="text-xl max-w-4xl text-mutedText" itemProp="description">
          Comprehensive fullstack development solutions tailored to elevate your
          business in the digital landscape.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
