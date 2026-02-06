
import React from 'react';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';
import { ABOUT_TEXT, KPIs, BRAND_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/119/1920/1080" 
            alt="Verona Team" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-6xl font-black mb-6">Our Story</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Professionalism, transparency, and European excellence in every mile we travel.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900">Decades of Logistical Mastery</h2>
            <div className="text-lg text-slate-600 leading-relaxed space-y-6">
              {ABOUT_TEXT.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex items-center space-x-4 pt-6">
              <Award className="w-12 h-12 text-amber-600" />
              <div>
                <h4 className="font-bold text-slate-900">Certified Excellence</h4>
                <p className="text-sm text-slate-500">Adhering to the CQC Certification and International Transport</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {KPIs.map((kpi) => (
              <div key={kpi.label} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-center">
                <div className="text-5xl font-black text-amber-600 mb-2">
                  {kpi.value}<span className="text-amber-400">{kpi.suffix}</span>
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">Our Values</h2>
          <h3 className="text-4xl font-bold">The Pillars of {BRAND_NAME}</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
          {[
            { 
              title: 'Safety & Compliance', 
              icon: <ShieldCheck className="w-10 h-10" />,
              desc: 'We exceed European safety standards, ensuring your cargo and our drivers are protected at every turn.'
            },
            { 
              title: 'Professional Team', 
              icon: <Users className="w-10 h-10" />,
              desc: 'Our drivers are more than operators; they are highly trained professionals committed to precision delivery.'
            },
            { 
              title: 'Customer Centricity', 
              icon: <Target className="w-10 h-10" />,
              desc: 'Your business goals are our own. We provide transparent, accessible, and flexible solutions tailored to you.'
            }
          ].map((val) => (
            <div key={val.title} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all">
              <div className="text-amber-500 mb-6">{val.icon}</div>
              <h4 className="text-2xl font-bold mb-4">{val.title}</h4>
              <p className="text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[10, 11, 12, 13].map((num) => (
             <img 
               key={num}
               src={`https://picsum.photos/id/${100 + num}/600/600`} 
               alt="Operations" 
               className="w-full h-64 object-cover rounded-3xl"
             />
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
