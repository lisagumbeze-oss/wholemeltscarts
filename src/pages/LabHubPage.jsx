import React from 'react';
import { Microscope, ShieldCheck, CheckCircle2, FlaskConical, Award, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function LabHubPage() {
  const currentBatch = {
    batchId: "WM-2025-V6-9932",
    date: "October 03, 2025",
    lab: "BelCosta Labs, California",
    status: "PASS",
    purity: 99.8,
    thc: 94.2
  };

  const tests = [
    { name: "Pesticides", status: "PASS", value: "ND (Not Detected)", desc: "Verified free of myclobutanil, spinosad, and 50+ other common agrichemicals." },
    { name: "Heavy Metals", status: "PASS", value: "PASSED", desc: "Arsenic, Cadmium, Lead, and Mercury levels all below California detection limits." },
    { name: "Microbial", status: "PASS", value: "CLEAN", desc: "Complete absence of Salmonella, E. coli, and Aspergillus species." },
    { name: "Residual Solvents", status: "PASS", value: "ND", desc: "No traces of butane, propane, or ethanol. Multi-stage purge complete." },
    { name: "Potency (THC/CBD)", status: "VERIFIED", value: "94.2%", desc: "Batch potency verified via HPLC (High-Performance Liquid Chromatography)." }
  ];

  return (
    <>
      <SEO 
        title="Official Lab Reports & COA Hub | Whole Melt Extracts"
        description="Verify your Whole Melt Extracts batch. Access real-time lab reports, COAs, and purity tests. Solventless concentrates with 100% transparency and safety."
        canonical="/lab-results"
      />

      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="section-header text-center animate-reveal">
            <span className="section-header__tag">Radical Transparency</span>
            <h1 className="section-header__title">Lab <span className="text-gradient">Hub & COAs</span></h1>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
              Your safety is our absolute priority. We perform full-panel third-party laboratory testing 
              on every single batch that leaves our extraction facility. 
              Search your batch code or browse our recent master certificates.
            </p>
          </div>

          {/* ═══ Current Master Batch Summary ═══ */}
          <div className="glass animate-reveal" style={{ padding: '3rem', borderRadius: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ 
                  padding: '0.4rem 1rem', 
                  background: 'rgba(39, 174, 96, 0.1)', 
                  border: '1px solid rgba(39, 174, 96, 0.3)', 
                  color: '#27ae60', 
                  borderRadius: '2rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem' 
                }}>
                  <CheckCircle2 size={14} /> LATEST BATCH VERIFIED
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Master Batch <span className="text-secondary">{currentBatch.batchId}</span></h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>RELEASE DATE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{currentBatch.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>CERTIFIED LAB</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{currentBatch.lab}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>TOTAL CANNABINOIDS</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>{currentBatch.thc}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PURITY SCORE</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>{currentBatch.purity}%</div>
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem' }}>
                <FileText size={18} /> Download Full PDF Report
              </button>
            </div>
            
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '2rem', border: '1px dashed var(--glass-border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Microscope size={64} style={{ margin: '0 auto' }} /></div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Enter Batch Code</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Found on the back of your official packaging.</p>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="WM-XXXX-XXXX" className="form-input" style={{ marginBottom: '1rem', textAlign: 'center', letterSpacing: '0.1em' }} />
                <button className="btn btn-secondary" style={{ width: '100%' }}>Verify Batch</button>
              </div>
            </div>
          </div>

          {/* ═══ Detailed Panel Results ═══ */}
          <div className="animate-reveal" style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FlaskConical className="text-secondary" /> Full Panel Results
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {tests.map((test, i) => (
                <div key={i} className="glass card-hover" style={{ padding: '1.5rem 2rem', borderRadius: '1.25rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1.5fr min-content', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600 }}>{test.name}</div>
                  <div style={{ 
                    color: test.status === 'PASS' || test.status === 'VERIFIED' ? '#27ae60' : 'var(--secondary)', 
                    fontSize: '0.85rem', 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {test.status === 'PASS' && <CheckCircle2 size={16} />}
                    {test.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{test.desc}</div>
                  <ChevronRight size={18} style={{ opacity: 0.3 }} />
                </div>
              ))}
            </div>
          </div>

          {/* ═══ Trust Badges ═══ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center', paddingBottom: '5rem' }} className="animate-reveal">
            {[
              { icon: <ShieldCheck size={32} />, title: "3rd Party Verified", desc: "All tests performed by ISO/IEC 17025 accredited facilities." },
              { icon: <Award size={32} />, title: "Quality Control", desc: "Rigorous internal inspection before independent lab submission." },
              { icon: <AlertCircle size={32} />, title: "Transparency First", desc: "No lab results are hidden; we publish every single batch run." }
            ].map((badge, i) => (
              <div key={i}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{badge.icon}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{badge.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
