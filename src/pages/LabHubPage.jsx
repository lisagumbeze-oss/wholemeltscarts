import { Microscope, ShieldCheck, CheckCircle2, FlaskConical, Award, FileText, AlertCircle } from 'lucide-react';
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
        <div className="container content-page">
          <div className="section-header section-header--center animate-reveal">
            <span className="section-header__tag">Transparency</span>
            <h1 className="section-header__title">Lab hub & COAs</h1>
            <p className="section-header__desc">
              Full-panel third-party testing on every batch that leaves our facility.
            </p>
          </div>

          <div className="about-split animate-reveal" style={{ marginBottom: '3rem' }}>
            <div className="about-block">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', fontWeight: 700, color: '#3D9B6E', marginBottom: '1rem' }}>
                <CheckCircle2 size={14} /> Latest batch verified
              </span>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Batch {currentBatch.batchId}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Release date</div>
                  <div style={{ fontWeight: 600 }}>{currentBatch.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Certified lab</div>
                  <div style={{ fontWeight: 600 }}>{currentBatch.lab}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total cannabinoids</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{currentBatch.thc}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Purity score</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{currentBatch.purity}%</div>
                </div>
              </div>
              <button type="button" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} /> Download PDF report
              </button>
            </div>

            <div className="about-block" style={{ border: '1px dashed var(--glass-border)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Microscope size={40} /></div>
              <h3 style={{ marginBottom: '0.5rem' }}>Verify your batch</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Found on the back of official packaging.</p>
              <input type="text" placeholder="WM-XXXX-XXXX" className="form-input" style={{ marginBottom: '0.75rem', textAlign: 'center', letterSpacing: '0.08em' }} />
              <button type="button" className="btn btn-outline" style={{ width: '100%' }}>Verify batch</button>
            </div>
          </div>

          <div className="animate-reveal info-panel">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FlaskConical size={20} /> Full panel results
            </h3>
            <div className="home-proof">
              {tests.map((test) => (
                <div key={test.name} className="home-proof__item">
                  <div className="home-proof__icon"><CheckCircle2 size={18} /></div>
                  <div>
                    <h4 className="home-proof__title">{test.name} — {test.value}</h4>
                    <p className="home-proof__desc">{test.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-strip animate-reveal" style={{ marginTop: '3rem' }}>
            {[
              { icon: <ShieldCheck size={22} />, title: '3rd party verified', desc: 'ISO/IEC 17025 accredited facilities.' },
              { icon: <Award size={22} />, title: 'Quality control', desc: 'Internal inspection before lab submission.' },
              { icon: <AlertCircle size={22} />, title: 'Transparency first', desc: 'Every batch run is published.' },
            ].map((badge) => (
              <div key={badge.title} className="service-strip__item">
                <div className="service-strip__icon">{badge.icon}</div>
                <h4 className="service-strip__title">{badge.title}</h4>
                <p className="service-strip__desc">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
