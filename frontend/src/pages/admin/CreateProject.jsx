import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../app/features/projects/projectsSlice";
import { toast, Toaster } from "react-hot-toast";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.projects || {});

  const [form, setForm] = useState({
    title: "",
    description: "",
    liveUrl: "",
    keyInsights: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.liveUrl) {
      toast.error("Title, Description, and Live URL are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("liveUrl", form.liveUrl);
    if (form.keyInsights) formData.append("keyInsights", form.keyInsights);
    if (imageFile) formData.append("image", imageFile);

    try {
      await dispatch(createProject(formData)).unwrap();
      toast.success("Project created successfully!");
      setForm({ title: "", description: "", liveUrl: "", keyInsights: "" });
      setImageFile(null);
    } catch (err) {
      toast.error(err || "Failed to create project");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-cardBg rounded-lg shadow-sm">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Live URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Live URL</label>
          <input
            type="url"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            className="w-full border border-border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Key Insights */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">
            Key Insights (comma separated)
          </label>
          <input
            type="text"
            name="keyInsights"
            value={form.keyInsights}
            onChange={handleChange}
            className="w-full border border-border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Optional"
          />
        </div>

        {/* Project Image */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-border px-2 py-1 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
