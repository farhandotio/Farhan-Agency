// controllers/project.controllers.js
import mongoose from "mongoose";
import projectModel from "../models/project.model.js";
import uploadFile from "../services/storage.service.js";

// Helper: normalize keyInsights input
const parseKeyInsights = (input) => {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input
      .map((item) =>
        typeof item === "string"
          ? { insight: item }
          : { insight: item.insight ?? "" }
      )
      .filter((i) => Boolean(i.insight));
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({ insight: s }));
  }

  // fallback
  return [];
};

// GET /projects?search=&page=1&limit=10&sort=createdAt:desc
export async function getAllProjects(req, res) {
  try {
    const { search, page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limNum;

    const filter = {};
    if (search) {
      // basic text search on title & description
      const regex = new RegExp(search, "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const [total, projects] = await Promise.all([
      projectModel.countDocuments(filter),
      projectModel.find(filter).sort(sort).skip(skip).limit(limNum).lean(),
    ]);

    res.status(200).json({
      total,
      page: pageNum,
      limit: limNum,
      projects,
    });
  } catch (err) {
    console.error("Get all projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /projects/:id
export async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid project id" });

    const project = await projectModel.findById(id).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (err) {
    console.error("Get project by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /projects  (admin only)
export async function createProject(req, res) {
  try {
    const { title, description, liveUrl } = req.body;

    if (!title || !description || !liveUrl) {
      return res
        .status(400)
        .json({ message: "title, description and liveUrl are required" });
    }

    // handle keyInsights (optional)
    const keyInsights = parseKeyInsights(req.body.keyInsights);

    // handle image: either req.file or req.body.image (url)
    let imageUrl = req.body.image || null;
    if (req.file) {
      try {
        const base64 = req.file.buffer.toString("base64");
        const fileStr = `data:${req.file.mimetype};base64,${base64}`;
        const uploadResp = await uploadFile(fileStr, req.file.originalname);
        imageUrl = uploadResp.url || uploadResp.filePath || imageUrl;
      } catch (err) {
        console.error("Project image upload failed:", err);
        // continue without failing the whole request; return 400 optionally
      }
    }

    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "Project image or image URL is required" });
    }

    const newProject = await projectModel.create({
      title,
      description,
      image: imageUrl,
      liveUrl,
      keyInsights,
    });

    res.status(201).json({ message: "Project created", project: newProject });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// PATCH /projects/:id  (admin only)
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid project id" });

    const existing = await projectModel.findById(id);
    if (!existing)
      return res.status(404).json({ message: "Project not found" });

    const { title, description, liveUrl } = req.body;

    // update fields if provided
    if (title) existing.title = title;
    if (description) existing.description = description;
    if (liveUrl) existing.liveUrl = liveUrl;

    // keyInsights: replace entirely if provided
    if (req.body.keyInsights !== undefined) {
      existing.keyInsights = parseKeyInsights(req.body.keyInsights);
    }

    // image update: either new file or new image url in body
    if (req.file) {
      try {
        const base64 = req.file.buffer.toString("base64");
        const fileStr = `data:${req.file.mimetype};base64,${base64}`;
        const uploadResp = await uploadFile(fileStr, req.file.originalname);
        existing.image =
          uploadResp.url || uploadResp.filePath || existing.image;
      } catch (err) {
        console.error("Project image upload failed:", err);
      }
    } else if (req.body.image) {
      existing.image = req.body.image;
    }

    const updated = await existing.save();

    res.status(200).json({ message: "Project updated", project: updated });
  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /projects/:id  (admin only)
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid project id" });

    const project = await projectModel.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Optional: if you want to delete remote image from storage, implement it in uploadFile service
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
