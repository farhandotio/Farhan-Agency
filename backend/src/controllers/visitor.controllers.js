import visitorModel from '../models/visitor.model.js';
import geoip from 'geoip-lite';

export const trackVisitor = async (req, res) => {
  try {
    const visitorData = req.body;

    // 1. Backend theke Real IP detect kora (Localhost-e ::1 ashte pare)
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '0.0.0.0';

    // 2. IP theke City/Country ber kora (CORS jhamela nei)
    const geo = geoip.lookup(ip);

    // Ajker diner shuru
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 3. Duplicate check (IP + Page + Date)
    // Apnar code-e 'Visitor' chilo, eta 'visitorModel' hobe
    const existingVisit = await visitorModel.findOne({
      ipAddress: ip,
      pageVisited: visitorData.pageVisited,
      timestamp: { $gte: today },
    });

    if (existingVisit) {
      existingVisit.count += 1;
      await existingVisit.save();
      return res.status(200).json({
        success: true,
        message: 'Visitor count updated',
      });
    }

    // 4. Notun visitor record toiri
    const newVisitor = new visitorModel({
      ...visitorData,
      ipAddress: ip,
      country: geo?.country || visitorData.country || 'Unknown',
      city: geo?.city || visitorData.city || 'Unknown',
      region: geo?.region || visitorData.region || 'Unknown',
      timezone: geo?.timezone || visitorData.timezone || 'Unknown',
    });

    await newVisitor.save();

    res.status(201).json({
      success: true,
      message: 'New visitor tracked successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getVisitorStats = async (req, res) => {
  try {
    const stats = await visitorModel.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
