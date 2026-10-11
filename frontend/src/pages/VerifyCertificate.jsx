import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiAward, FiDownload } from 'react-icons/fi';
import { axiosInstance } from '../api/axiosInstance';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';

function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  
  const [status, setStatus] = useState('loading'); // loading, valid, invalid
  const [certData, setCertData] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setStatus('invalid');
      return;
    }
    
    const verifyCert = async () => {
      try {
        const response = await axiosInstance.get(`/user-api/verify-certificate/${id}`);
        setCertData(response.data.payload);
        setStatus('valid');
      } catch (error) {
        console.error("Verification error", error);
        setStatus('invalid');
      }
    };
    
    verifyCert();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certData.course.title.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setDownloading(false);
    }
  };

  const verificationUrl = window.location.href;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      {status === 'loading' && (
        <div className="py-12 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Verifying certificate...</p>
        </div>
      )}

      {status === 'valid' && certData && (
        <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <FiCheckCircle size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Certificate Verified</h1>
              <p className="text-slate-500">This is an official CourseHub certificate.</p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-violet-700 transition disabled:opacity-70 shadow-lg shadow-violet-200"
            >
              {downloading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiDownload size={18} />}
              {downloading ? "Generating PDF..." : "Download as PDF"}
            </button>
            <Link to="/student-dashboard" className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm">
              Back to Dashboard
            </Link>
          </div>

          {/* Certificate UI for PDF */}
          <div className="w-full overflow-x-auto pb-8 flex justify-center">
            <div 
              ref={certRef} 
              className="relative shrink-0 overflow-hidden shadow-2xl"
              style={{ width: '1056px', height: '816px', backgroundColor: '#ffffff', color: '#1e293b' }} // Standard Landscape A4 at 96 DPI
            >
              {/* Outer Border Design */}
              <div className="absolute inset-4 border-[12px] border-double rounded-2xl pointer-events-none z-10" style={{ borderColor: '#ede9fe' }}></div>
              <div className="absolute inset-8 border-[2px] rounded-xl pointer-events-none z-10" style={{ borderColor: '#ddd6fe' }}></div>
              
              {/* Background Shapes */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-br-full opacity-10" style={{ backgroundColor: '#7c3aed' }}></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 rounded-tl-full opacity-10" style={{ backgroundColor: '#4f46e5' }}></div>

              <div className="relative z-20 flex flex-col items-center justify-center h-full px-24 text-center">
                
                {/* Logo & Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#7c3aed' }}>
                    <FiAward size={24} style={{ color: '#ffffff' }} />
                  </div>
                  <span className="text-3xl font-black tracking-tight" style={{ color: '#1e293b' }}>
                    Course<span style={{ color: '#7c3aed' }}>Hub</span>
                  </span>
                </div>

                <h1 className="text-[4rem] font-serif mb-2 font-bold tracking-wide uppercase" style={{ color: '#1e293b' }}>
                  Certificate of Completion
                </h1>
                <p className="text-xl uppercase tracking-widest font-semibold mb-12" style={{ color: '#64748b' }}>
                  This is to certify that
                </p>

                <h2 className="text-6xl font-bold mb-8 border-b-2 pb-4 inline-block px-12" style={{ color: '#6d28d9', borderColor: '#ddd6fe' }}>
                  {certData.user?.firstName} {certData.user?.lastName}
                </h2>

                <p className="text-xl mb-4 max-w-3xl leading-relaxed" style={{ color: '#475569' }}>
                  has successfully completed the comprehensive online course:
                </p>
                <h3 className="text-3xl font-bold mb-12 max-w-4xl leading-tight" style={{ color: '#1e293b' }}>
                  "{certData.course?.title}"
                </h3>

                {/* Footer Details */}
                <div className="w-full flex items-end justify-between mt-auto mb-16 px-12">
                  
                  {/* Left: Date & ID */}
                  <div className="text-left flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Date of Issue</p>
                      <p className="text-xl font-semibold" style={{ color: '#1e293b' }}>{new Date(certData.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Certificate ID</p>
                      <p className="text-md font-mono" style={{ color: '#475569' }}>{certData.certificateId}</p>
                    </div>
                  </div>

                  {/* Center: QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="p-3 shadow-md border rounded-xl mb-3" style={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9' }}>
                      <QRCodeCanvas value={verificationUrl} size={100} level={"H"} fgColor="#1e293b" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Scan to Verify</p>
                  </div>

                  {/* Right: Signature */}
                  <div className="text-right flex flex-col items-end">
                    <div className="border-b-2 pb-2 mb-2 w-48" style={{ borderColor: '#1e293b' }}>
                      <span className="font-serif text-4xl ml-4" style={{ fontFamily: 'cursive', color: '#1e293b' }}>
                        CourseHub
                      </span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Authorized Signature</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

      {status === 'invalid' && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiXCircle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Verification Failed</h1>
          <p className="text-slate-500 mb-8">We couldn't verify this certificate. The ID might be invalid or the certificate has been revoked.</p>
          <Link to="/" className="inline-block bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition shadow-lg shadow-violet-200">
            Return to Homepage
          </Link>
        </div>
      )}

    </div>
  );
}

export default VerifyCertificate;
