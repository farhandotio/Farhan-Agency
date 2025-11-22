// src/pages/admin/Projects.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  updateProject,
  deleteProject,
} from "../../app/features/projects/projectsSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className="w-full p-4 rounded-lg bg-cardBg border border-border flex items-start justify-between gap-4">
    <div className="flex items-start gap-4 flex-1 min-w-0">
      <div className="w-16 h-16 rounded-md bg-hoverCardBg flex items-center justify-center overflow-hidden shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-sm font-semibold text-mutedText px-2 text-center">
            {project.title?.slice(0, 2)?.toUpperCase() || "PJ"}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-medium truncate">{project.title}</div>
        <div className="text-sm text-mutedText truncate mt-1">
          {project.description?.slice(0, 120)}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => onEdit(project)}
        className="p-2 rounded hover:bg-hoverCardBg transition"
        title="Edit"
      >
        <FiEdit size={18} />
      </button>
      <button
        onClick={() => onDelete(project)}
        className="p-2 rounded hover:bg-red-600/10 text-danger transition"
        title="Delete"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  </div>
);

const Projects = () => {
  const dispatch = useDispatch();
  const {
    projects = [],
    total = 0,
    loading,
    error,
  } = useSelector((s) => s.projects || {});
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    liveUrl: "",
    imageUrl: "",
    imageFile: null,
    keyInsightsStr: "",
  });

  useEffect(() => {
    dispatch(fetchProjects({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      liveUrl: project.liveUrl,
      imageUrl: project.image || "",
      imageFile: null,
      keyInsightsStr: project.keyInsights
        ? project.keyInsights.map((k) => k.insight).join(", ")
        : "",
    });
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      liveUrl: "",
      imageUrl: "",
      imageFile: null,
      keyInsightsStr: "",
    });
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`))
      return;
    try {
      await dispatch(deleteProject(project._id)).unwrap();
      toast.success(`Deleted project "${project.title}"`);
      dispatch(fetchProjects({ page: 1, limit: 50 }));
    } catch (err) {
      toast.error(err || "Failed to delete project");
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.liveUrl) {
      toast.error("Title, Description, and Live URL are required");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("liveUrl", form.liveUrl);

      if (form.keyInsightsStr)
        formData.append("keyInsights", form.keyInsightsStr);

      if (form.imageFile) formData.append("image", form.imageFile);

      await dispatch(updateProject({ id: editing._id, formData })).unwrap();
      dispatch(fetchProjects({ page: 1, limit: 50 }));
      toast.success(`Project "${form.title}" updated successfully`);
      handleCancelEdit();
    } catch (err) {
      toast.error(err || "Failed to update project");
    } finally {
      setSaving(false);
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
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="inline-flex items-center gap-3 text-sm text-mutedText">
          <span>Total:</span>
          <span className="px-3 py-1 rounded-full bg-hoverCardBg text-sm font-medium">
            {total || projects.length}
          </span>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-mutedText">No projects found.</p>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-bg/60"
            onClick={handleCancelEdit}
          />
          <div className="relative z-10 w-full max-w-2xl bg-cardBg rounded-lg p-6 shadow-lg max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">
              Edit Project — {editing.title}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">Title</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Live URL */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">
                  Live URL
                </label>
                <input
                  value={form.liveUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, liveUrl: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Key Insights */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">
                  Key Insights (comma separated)
                </label>
                <input
                  value={form.keyInsightsStr}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, keyInsightsStr: e.target.value }))
                  }
                  placeholder="Insight 1, Insight 2, Insight 3"
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-mutedText mt-1">
                  Separate each insight with a comma.
                </p>
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">
                  Image URL (optional)
                </label>
                <input
                  value={form.imageUrl || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Upload Image */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text">
                  Or Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((p) => ({ ...p, imageFile: e.target.files[0] }))
                  }
                  className="w-full"
                />
                {form.imageFile && (
                  <p className="text-sm text-mutedText mt-1">
                    Selected: {form.imageFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded border border-border hover:bg-hoverCardBg transition"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
