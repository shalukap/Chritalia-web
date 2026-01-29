
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Get Your Freight Moving</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Complete the form below for a comprehensive transport quote, or reach out to our Verona office directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Headquarters</h3>
              <p className="text-slate-500">WARNAKULASURIYA FERNANDO SUJITH NIROSHAN E C.<br/>VIA DELLA PACE 13<br />37124, Verona (VR), Italy</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Line</h3>
              <p className="text-slate-500">Cell : +39 377 333 1089</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500">Pec : chritaliasas@pec.it<br />Mail : info@chritalia.it</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200 border border-gray-100">
              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-8">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-4">Quote Request Received!</h2>
                  <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. A logistics specialist from our Verona office will review your request and contact you within 2 business hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="Acme Logistics Ltd" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Contact Person</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="Mario Rossi" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input required type="email" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="mario@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                      <input required type="tel" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="+39 000 000 0000" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pickup Location</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="City, Country" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Delivery Location</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="City, Country" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Freight Type & Volume</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" placeholder="e.g. 10 Europallets, 5000kg" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Desired Date</label>
                      <input required type="date" className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Additional Notes</label>
                    <textarea className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all h-32" placeholder="Tell us more about your shipment requirements..."></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-slate-500">We respond quickly during business hours.</p>
                    <button type="submit" className="px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-lg hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/20 flex items-center">
                      Request Quote <Send className="ml-3 w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
