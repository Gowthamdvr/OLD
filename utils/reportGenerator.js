const { jsPDF } = window.jspdf;

function generateReport(appointments, stats) {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Header - Clinic Name
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('MediCare', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Medical Appointment System', pageWidth / 2, 25, { align: 'center' });
    
    // Report Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Appointment Report', 14, 50);
    
    // Report Date
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const reportDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Generated on: ${reportDate}`, 14, 58);
    
    // Summary Statistics
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Summary Statistics', 14, 70);
    
    doc.autoTable({
      startY: 75,
      head: [['Total Appointments', 'Scheduled', 'Cancelled']],
      body: [[stats.total.toString(), stats.scheduled.toString(), stats.cancelled.toString()]],
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], fontSize: 10 },
      styles: { fontSize: 10, halign: 'center' },
      margin: { left: 14, right: 14 }
    });
    
    // Appointments Table
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Appointment Details', 14, finalY);
    
    const tableData = appointments.map(apt => [
      apt.objectData.patientName,
      apt.objectData.doctorName,
      apt.objectData.specialty,
      apt.objectData.date,
      apt.objectData.time,
      apt.objectData.status
    ]);
    
    doc.autoTable({
      startY: finalY + 5,
      head: [['Patient Name', 'Doctor', 'Specialty', 'Date', 'Time', 'Status']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], fontSize: 9 },
      styles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 }
      }
    });
    
    // Footer
    const footerY = pageHeight - 20;
    doc.setFillColor(240, 240, 240);
    doc.rect(0, footerY - 5, pageWidth, 25, 'F');
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text('MediCare Medical Appointment System', pageWidth / 2, footerY, { align: 'center' });
    doc.text('© 2025 MediCare. All rights reserved.', pageWidth / 2, footerY + 5, { align: 'center' });
    doc.text('For inquiries: contact@medicare.com | Phone: (555) 123-4567', pageWidth / 2, footerY + 10, { align: 'center' });
    
    // Save PDF
    doc.save(`MediCare_Appointment_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    
  } catch (error) {
    console.error('Report generation error:', error);
    alert('Failed to generate report. Please try again.');
  }
}