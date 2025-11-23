// src/pages/admin/CreateService.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createService, fetchServices } from "../../app/features/services/servicesSlice";
import toast, { Toaster } from "react-hot-toast";

/** helpers */
const linesToArray = (str) =>
  String(str || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const parseProcessSteps = (text) =>
  linesToArray(text).map((line, idx) => {
    const [title, description] = line.split("|").map((s) => s?.trim() || "");
    return {
      stepNumber: idx + 1,
      title: title || `Step ${idx + 1}`,
      description: description || "",
    };
  });

const parseTimelineLines = (text) =>
  linesToArray(text).map((line) => {
    const parts = line.split("|").map((s) => s?.trim() || "");
    return {
      projectType: parts[0] || "",
      duration: parts[1] || "",
      inclusions: parts[2]
        ? parts[2].split(";").map((i) => i.trim()).filter(Boolean)
        : [],
    };
  });

const CreateService = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    heroDescription: "",
    heroImageUrl: "",
    overviewDescription: "",
    keyTechnologiesStr: "",
    offerings: [{ title: "", description: "" }],
    whatsIncludedSections: [
      { sectionTitle: "", iconName: "", featuresStr: "" }
    ],
    processStepsLines: "",
    timelineLines: "",
    featured: false,
    order: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [heroFileName, setHeroFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  // Offerings
  const updateOffering = (index, key, value) => {
    setForm((p) => {
      const offerings = [...p.offerings];
      offerings[index] = { ...offerings[index], [key]: value };
      return { ...p, offerings };
    });
  };
  const addOffering = () => setForm((p) => ({ ...p, offerings: [...p.offerings, { title: "", description: "" }] }));
  const removeOffering = (index) => setForm((p) => ({ ...p, offerings: p.offerings.filter((_, i) => i !== index) }));

  // Whats Included Sections
  const updateWhatsIncluded = (index, key, value) => {
    setForm((p) => {
      const sections = [...p.whatsIncludedSections];
      sections[index] = { ...sections[index], [key]: value };
      return { ...p, whatsIncludedSections: sections };
    });
  };
  const addWhatsIncludedSection = () => {
    setForm((p) => ({
      ...p,
      whatsIncludedSections: [...p.whatsIncludedSections, { sectionTitle: "", iconName: "", featuresStr: "" }]
    }));
  };
  const removeWhatsIncludedSection = (index) => {
    setForm((p) => ({ ...p, whatsIncludedSections: p.whatsIncludedSections.filter((_, i) => i !== index) }));
  };

  // Hero Image
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setForm((p) => ({ ...p, heroImageUrl: reader.result }));
    reader.onerror = () => toast.error("Failed to read image file");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.slug || !form.title) {
      toast.error("Slug and Title are required");
      return;
    }
    setLoading(true);

    try {
      const normalizedSlug = form.slug.trim().toLowerCase().replace(/\s+/g, "-");
      const keyTechnologies = form.keyTechnologiesStr
        ? form.keyTechnologiesStr.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      const offerings = form.offerings.map((o) => ({ title: o.title.trim(), description: o.description.trim() })).filter((o) => o.title);

      // Build WhatsIncluded
      const whatsIncluded = form.whatsIncludedSections
        .map((s) => {
          const features = linesToArray(s.featuresStr);
          if (!s.sectionTitle && features.length === 0) return null;
          return { sectionTitle: s.sectionTitle || "Section", iconName: s.iconName || "", features };
        })
        .filter(Boolean);

      const processSteps = parseProcessSteps(form.processStepsLines);
      const timelineEstimate = parseTimelineLines(form.timelineLines);

      const payload = {
        slug: normalizedSlug,
        title: form.title,
        heroDescription: form.heroDescription || undefined,
        heroImageUrl: form.heroImageUrl || undefined,
        featured: !!form.featured,
        order: form.order === "" ? undefined : Number(form.order),
        serviceOverview: (form.overviewDescription || keyTechnologies.length || offerings.length) ? {
          description: form.overviewDescription || "",
          keyTechnologies,
          offerings,
        } : undefined,
        whatsIncluded: whatsIncluded.length ? whatsIncluded : undefined,
        processSteps: processSteps.length ? processSteps : undefined,
        timelineEstimate: timelineEstimate.length ? timelineEstimate : undefined,
        meta: (form.metaTitle || form.metaDescription) ? {
          seoTitle: form.metaTitle || undefined,
          seoDescription: form.metaDescription || undefined
        } : undefined,
      };

      // remove undefined keys
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      await dispatch(createService(payload)).unwrap();
      toast.success("Service created successfully");
      dispatch(fetchServices({ page: 1, limit: 50 }));

      setForm({
        slug: "",
        title: "",
        heroDescription: "",
        heroImageUrl: "",
        overviewDescription: "",
        keyTechnologiesStr: "",
        offerings: [{ title: "", description: "" }],
        whatsIncludedSections: [{ sectionTitle: "", iconName: "", featuresStr: "" }],
        processStepsLines: "",
        timelineLines: "",
        featured: false,
        order: "",
        metaTitle: "",
        metaDescription: "",
      });
      setHeroFileName("");
    } catch (err) {
      toast.error(err?.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-cardBg rounded-lg shadow-sm">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold mb-4">Create New Service</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Slug & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} required
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="frontend-web-development" />
            <p className="text-xs text-mutedText mt-1">Normalized automatically (lowercase, spaces → -)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Frontend Web Development" />
          </div>
        </div>

        {/* Hero */}
        <div>
          <label className="block text-sm font-medium text-text mb-1">Hero Description</label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Short hero description" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-text mb-1">Hero Image Upload</label>
            <input type="file" accept="image/*" onChange={handleImageFile} />
            {heroFileName && <p className="text-xs text-mutedText mt-1">Selected: {heroFileName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Or Hero Image URL</label>
            <input name="heroImageUrl" value={form.heroImageUrl} onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..." />
          </div>
        </div>

        {/* Service Overview */}
        <div>
          <label className="block text-sm font-medium text-text mb-1">Overview Description</label>
          <textarea name="overviewDescription" value={form.overviewDescription} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Key Technologies (comma separated)</label>
            <input name="keyTechnologiesStr" value={form.keyTechnologiesStr} onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="React, Next.js, TailwindCSS" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Offerings</label>
            <div className="space-y-2">
              {form.offerings.map((o, i) => (
                <div key={i} className="p-2 border border-border rounded">
                  <input value={o.title} onChange={(e) => updateOffering(i, "title", e.target.value)}
                    placeholder={`Offering ${i + 1} title`} className="w-full mb-1 px-2 py-1 border rounded" />
                  <textarea value={o.description} onChange={(e) => updateOffering(i, "description", e.target.value)}
                    placeholder="Description" rows={2} className="w-full px-2 py-1 border rounded" />
                  <div className="flex justify-end mt-1">
                    <button type="button" onClick={() => removeOffering(i)} className="text-sm px-2 py-1 border rounded hover:bg-hoverCardBg">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addOffering} className="px-3 py-1 rounded bg-primary text-white">Add Offering</button>
            </div>
          </div>
        </div>

        {/* Whats Included */}
        <div>
          <label className="block text-sm font-medium text-text mb-1">What's Included Sections</label>
          {form.whatsIncludedSections.map((s, i) => (
            <div key={i} className="p-2 border border-border rounded mb-2">
              <input placeholder="Section Title" value={s.sectionTitle} onChange={(e) => updateWhatsIncluded(i, "sectionTitle", e.target.value)}
                className="w-full mb-1 px-2 py-1 border rounded" />
              <input placeholder="Icon Name" value={s.iconName} onChange={(e) => updateWhatsIncluded(i, "iconName", e.target.value)}
                className="w-full mb-1 px-2 py-1 border rounded" />
              <textarea placeholder="Features (one per line)" value={s.featuresStr} onChange={(e) => updateWhatsIncluded(i, "featuresStr", e.target.value)}
                rows={3} className="w-full px-2 py-1 border rounded" />
              <div className="flex justify-end gap-1 mt-1">
                <button type="button" onClick={() => removeWhatsIncludedSection(i)} className="text-sm px-2 py-1 border rounded hover:bg-hoverCardBg">Remove</button>
                {i === form.whatsIncludedSections.length - 1 && <button type="button" onClick={addWhatsIncludedSection} className="text-sm px-2 py-1 border rounded hover:bg-hoverCardBg">Add Section</button>}
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Process Steps (Title|Description)</label>
            <textarea name="processStepsLines" value={form.processStepsLines} onChange={handleChange} rows={4}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Step1|Description" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Timeline (ProjectType|Duration|Inclusions)</label>
            <textarea name="timelineLines" value={form.timelineLines} onChange={handleChange} rows={4}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Small|1-2 weeks|Feature1;Feature2" />
          </div>
        </div>

        {/* Featured, Order & SEO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            <label>Featured</label>
          </div>
          <div>
            <label>Order</label>
            <input type="number" name="order" value={form.order} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label>SEO Meta Title</label>
            <input name="metaTitle" value={form.metaTitle} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </div>
        </div>
        <div>
          <label>SEO Meta Description</label>
          <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} rows={2} className="w-full px-2 py-1 border rounded" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => setForm({
            slug: "", title: "", heroDescription: "", heroImageUrl: "", overviewDescription: "",
            keyTechnologiesStr: "", offerings: [{ title: "", description: "" }],
            whatsIncludedSections: [{ sectionTitle: "", iconName: "", featuresStr: "" }],
            processStepsLines: "", timelineLines: "", featured: false, order: "", metaTitle: "", metaDescription: ""
          })} className="px-4 py-2 border rounded">Reset</button>
          <button type="submit" disabled={loading} className="px-5 py-2 bg-primary text-white rounded hover:bg-primary/90">{loading ? "Creating..." : "Create Service"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateService;
