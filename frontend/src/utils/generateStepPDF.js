import jsPDF from 'jspdf';

export const generateStepPDF = (step) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  let y = 40;

  // Step Title
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text(`${step.step}: ${step.title}`, 40, y);

  y += 30;

  // Phase
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Phase: ${step.week}`, 40, y);

  y += 20;

  // Description
  doc.setFontSize(12);
  doc.text(`Description: ${step.description}`, 40, y, { maxWidth: 500 });

  y += 40;

  // Deliverables
  doc.setFontSize(14);
  doc.setTextColor(0, 51, 102);
  doc.text('Deliverables:', 40, y);
  y += 20;
  step.deliverables.forEach((d) => {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`• ${d}`, 50, y);
    y += 20;
  });

  // Collaboration
  if (step.collaboration) {
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text('Collaboration:', 40, y);
    y += 20;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${step.collaboration.main}: ${step.collaboration.note}`, 50, y);
  }

  // Payment & Delivery (for delivery type)
  if (step.type === 'delivery') {
    y += 30;
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text('Payment Structure:', 40, y);
    y += 20;
    step.paymentStructure.forEach((p) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${p.percentage} - ${p.description}`, 50, y);
      y += 20;
    });

    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text('Delivery Process:', 40, y);
    y += 20;
    step.deliveryProcess.forEach((d) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${d}`, 50, y);
      y += 20;
    });

    if (step.qualityAssurance) {
      y += 20;
      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0);
      doc.text(`Quality Assurance: ${step.qualityAssurance}`, 40, y, {
        maxWidth: 500,
      });
    }
  }

  // Template link
  if (step.template?.link) {
    y += 30;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink(step.template.text, 40, y, { url: step.template.link });
  }

  // Save PDF
  doc.save(`${step.step.replace(/\s+/g, '_')}.pdf`);
};
