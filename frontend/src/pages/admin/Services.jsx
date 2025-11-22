// File: src/pages/admin/Services.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../../app/features/services/servicesSlice";
import { FiTrash2 } from "react-icons/fi";

const ServiceCard = ({ service, onDelete }) => (
  <div className="w-full p-4 rounded-lg bg-cardBg border border-border flex items-start justify-between gap-4">
    <div className="flex items-start gap-4 flex-1 min-w-0">
      <div className="w-16 h-16 rounded-md bg-hoverCardBg flex items-center justify-center overflow-hidden shrink-0">
        {service.heroImageUrl ? (
          <img src={service.heroImageUrl} alt={service.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm font-semibold text-mutedText px-2 text-center">
            {service.title?.slice(0, 2)?.toUpperCase() || "SV"}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-medium truncate">{service.title}</div>
        <div className="text-sm text-mutedText truncate mt-1">{service.heroDescription?.slice(0, 120) || ""}</div>
        <div className="flex items-center gap-3 mt-3 text-xs text-mutedText">
          {service.featured && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Featured</span>}
          {typeof service.order !== "undefined" && <span className="px-2 py-0.5 rounded-full bg-hoverCardBg">Order: {service.order}</span>}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => onDelete(service)}
        className="p-2 rounded text-danger hover:text-danger/95 cursor-pointer transition"
        title="Delete"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  </div>
);

const Services = () => {
  const dispatch = useDispatch();
  const { services = [], total = 0, loading, error } = useSelector((s) => s.services || {});

  useEffect(() => {
    dispatch(fetchServices({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleDelete = async (service) => {
    const ok = window.confirm(`Delete "${service.title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      await dispatch(deleteService(service._id)).unwrap();
      dispatch(fetchServices({ page: 1, limit: 50 }));
    } catch (err) {
      const msg = (err && (err.message || err)) || "Failed to delete service";
      alert(msg);
    }
  };

  if (loading)
    return (
      <div className="min-h-[200px]">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-hoverCardBg rounded-lg" />
          ))}
        </div>
      </div>
    );

  if (error) return <div className="text-danger p-4">{error}</div>;

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Services</h1>
        <div className="inline-flex items-center gap-3 text-sm text-mutedText">
          <span className="text-mutedText">Total:</span>
          <span className="px-3 py-1 rounded-full bg-hoverCardBg text-sm font-medium">{total || services.length || 0}</span>
        </div>
      </div>

      {services.length === 0 ? (
        <p className="text-mutedText">No services found.</p>
      ) : (
        <div className="grid gap-3">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
