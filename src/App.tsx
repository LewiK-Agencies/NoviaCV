import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import PreviewPage from './components/PreviewPage';
import PaymentPage from './components/PaymentPage';
import DownloadPage from './components/DownloadPage';
import { hasCompletedPayment, setPaymentCompleted } from './utils/storage';

type AppPage = 'home' | 'form' | 'preview' | 'payment' | 'download';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success') {
      setPaymentCompleted();
      setCurrentPage('download');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                  <FileText className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Professional Resume Builder
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Create stunning resumes with our 4 professional templates. Customize colors, fonts, and download in PDF format.
              </p>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Fill Your Information</h3>
                      <p className="text-blue-100 text-sm">Add your personal details, work experience, education, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Choose Template</h3>
                      <p className="text-blue-100 text-sm">Select from 4 beautiful templates and customize colors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Make Payment</h3>
                      <p className="text-blue-100 text-sm">Secure payment to unlock all templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Download PDFs</h3>
                      <p className="text-blue-100 text-sm">Get all 4 templates as PDF files instantly</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('form')}
                className="px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Start Building Your Resume
              </button>
            </div>
          </div>
        );

      case 'form':
        return <ResumeForm onComplete={() => setCurrentPage('preview')} />;

      case 'preview':
        return (
          <PreviewPage
            onBack={() => setCurrentPage('form')}
            onProceedToPayment={() => {
              if (hasCompletedPayment()) {
                setCurrentPage('download');
              } else {
                setCurrentPage('payment');
              }
            }}
          />
        );

      case 'payment':
        return <PaymentPage onBack={() => setCurrentPage('preview')} />;

      case 'download':
        return <DownloadPage onHome={() => setCurrentPage('home')} />;

      default:
        return null;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;
