import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';

const sports = [
  { name: 'Football', season: 'Fall', schedule: 'Home opener Sep 5' },
  { name: 'Basketball', season: 'Winter', schedule: 'Season starts Nov 15' },
  { name: 'Soccer', season: 'Fall', schedule: 'Conference finals Mar 8' },
  { name: 'Track & Field', season: 'Spring', schedule: 'Outdoor season starts Mar 1' }
];

const clubs = [
  'Robotics Club', 'Debate Society', 'Coding Club', 'Environmental Action', 'Student Government',
  'International Student Association', 'Theatre Guild', 'Chess Club', 'Photography Society',
  'Investment Club', 'Volunteer Corps', 'Fashion & Design Club', 'Vegan & Sustainability Club', 'Improv Troupe'
];

export default function StudentLifePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Student Life' }]} />
      <PageHeader title="Life at " highlight="College" subtitle="From the playing field to the club room, find your place beyond the classroom." />

      {/* Sports */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header"><h2>Athletics & <span className="gold-gradient-text">Sports</span></h2><p>15 varsity teams, club sports, and intramurals.</p></div>
          <div className="table-wrapper">
            <table className="db-table">
              <thead><tr><th>Team</th><th>Season</th><th>Next Game</th></tr></thead>
              <tbody>
                {sports.map(s => (
                  <tr key={s.name}><td>🏆 {s.name}</td><td>{s.season}</td><td>{s.schedule}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Clubs & <span className="gold-gradient-text">Organizations</span></h2><p>With 120+ clubs, there's something for everyone.</p></div>
          <div className="dash-card">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {clubs.map(c => (
                <span key={c} className="badge badge-gold" style={{ fontSize: 'var(--text-sm)', padding: '8px 16px' }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Housing & dining */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            <div className="dash-card">
              <h3>🏠 Residential Life</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                85% of first-years live on campus across 6 residence halls — from traditional doubles to
                suite-style apartments. Housing applications open in March for the following fall.
              </p>
              <div className="media-item" style={{ marginTop: 'var(--space-4)' }}>
                <img src="/assets/media/images/student-life/housing.jpg" alt="Residence hall exterior" loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
              </div>
            </div>
            <div className="dash-card">
              <h3>🍽️ Dining</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Three dining halls, a food court, coffee shops, and a farmers market on the quad.
                Vegan, halal, kosher, and allergen-friendly options available at every meal.
              </p>
              <div className="media-item" style={{ marginTop: 'var(--space-4)' }}>
                <img src="/assets/media/images/student-life/clubs.jpg" alt="Students dining together" loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus activities media */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Campus <span className="gold-gradient-text">Activities</span></h2></div>
          <div className="media-grid">
            <figure className="media-item">
              <img src="/assets/media/images/student-life/sports-1.jpg" alt="Students playing soccer on campus field" loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
              <figcaption>Intramural soccer on the quad</figcaption>
            </figure>
            <figure className="media-item">
              <video src="/assets/media/videos/campus/campus-intro.mp4" controls preload="none" poster="/assets/media/images/student-life/clubs.jpg">
                Your browser does not support the video tag.
              </video>
              <figcaption>Tour our campus</figcaption>
            </figure>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/calendar" className="btn btn-gold">See Events Calendar &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
