import { Microscope, ShieldCheck, CheckCircle2, FlaskConical, Award, FileText, AlertCircle, Search } from 'lucide-react';
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
    <div className="lab-hub-page">
      <SEO 
        title="Official Lab Reports & COA Hub | Whole Melt Extracts"
        description="Verify your Whole Melt Extracts batch. Access real-time lab reports, COAs, and purity tests. Solventless concentrates with 100% transparency and safety."
        canonical="/lab-results"
      />

      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal" style={{ color: '#3D9B6E', background: 'rgba(61, 155, 110, 0.1)', borderColor: 'rgba(61, 155, 110, 0.3)' }}>
            <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Transparency
          </span>
          <h1 className="page-header__title animate-reveal">Lab Hub & COAs</h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Full-panel third-party testing on every batch that leaves our facility. 100% solventless purity guaranteed.
          </p>
        </div>
      </section>

      <div className="section bg-deep">
        <div className="container content-page">

          {/* ═══ Verification Dashboard ═══ */}
          <div className="about-split" style={{ marginBottom: '4rem', alignItems: 'start', gap: '3rem' }}>
            
            {/* Left: Batch Info */}
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#3D9B6E', marginBottom: '1.5rem', padding: '0.4rem 0.8rem', background: 'rgba(61, 155, 110, 0.1)', borderRadius: '2rem' }}>
                <CheckCircle2 size={14} /> Latest batch verified
              </div>
              
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.02em' }}>
                Batch <span style={{ color: 'var(--primary)' }}>{currentBatch.batchId}</span>
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Release date</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{currentBatch.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Certified lab</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{currentBatch.lab}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Total cannabinoids</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    {currentBatch.thc}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>%</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Purity score</div>
                  <div style={{ fontWeight: 700, color: '#3D9B6E', fontSize: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    {currentBatch.purity}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>%</span>
                  </div>
                </div>
              </div>
              
              <button type="button" className="btn btn-outline glow-border" style={{ width: '100%' }}>
                <FileText size={18} /> Download Full PDF Report
              </button>
            </div>

            {/* Right: Verification Input */}
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', animationDelay: '0.2s' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'inline-flex', padding: '1.25rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <Microscope size={48} />
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Verify Your Batch</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Check the authenticity and test results of your specific product. Your batch number is located on the back of official Whole Melt Extracts packaging.
              </p>
              
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="e.g. WM-2025-V6-9932" 
                  className="form-input" 
                  style={{ 
                    paddingLeft: '3rem', 
                    height: '56px', 
                    fontSize: '1rem', 
                    textAlign: 'left', 
                    letterSpacing: '0.05em',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                  }} 
                />
              </div>
              <button type="button" className="btn btn-primary glow-border" style={{ width: '100%', height: '56px', fontSize: '1rem' }}>
                Lookup Results
              </button>
            </div>
          </div>

          {/* ═══ Test Grid ═══ */}
          <div className="animate-reveal info-panel" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                <FlaskConical size={28} color="var(--primary)" /> Full Panel Results
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Breakdown of the stringent testing performed on every gram.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {tests.map((test, index) => (
                <div key={test.name} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(61, 155, 110, 0.1)', color: '#3D9B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {test.name}
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', color: 'var(--text-muted)' }}>{test.value}</span>
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{test.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ Service Strip ═══ */}
          <div className="service-strip animate-reveal" style={{ marginTop: '5rem', background: 'rgba(13,13,13,0.4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
            {[
              { icon: <ShieldCheck size={28} />, title: '3rd Party Verified', desc: 'ISO/IEC 17025 accredited facilities.' },
              { icon: <Award size={28} />, title: 'Quality Control', desc: 'Internal inspection before lab submission.' },
              { icon: <AlertCircle size={28} />, title: 'Transparency First', desc: 'Every batch run is published.' },
            ].map((badge) => (
              <div key={badge.title} className="service-strip__item" style={{ padding: '2rem 1rem' }}>
                <div className="service-strip__icon" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{badge.icon}</div>
                <h4 className="service-strip__title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{badge.title}</h4>
                <p className="service-strip__desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
