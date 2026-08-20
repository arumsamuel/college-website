import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState([]);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/staff').then(rows => {
      setStaff(rows);
      setDepartments(['All', ...new Set(rows.map(s => s.department))]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (department !== 'All') params.set('department', department);
    const qs = params.toString();
    api.get(`/staff${qs ? '?' + qs : ''}`).then(setStaff).catch(() => {});
  }, [query, department]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Staff Directory' }]} />
      <PageHeader title="Staff " highlight="Directory" subtitle="Search our faculty and staff by name, title, department, or room number." />

      <section className="section-padding">
        <div className="container">
          <div className="dash-card" style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="search">Search</label>
                <input id="search" className="form-control" placeholder="Search by name, title, or room..." value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="dept">Department</label>
                <select id="dept" className="form-control" value={department} onChange={e => setDepartment(e.target.value)}>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="db-table">
              <thead>
                <tr><th>Name</th><th>Title</th><th>Department</th><th>Email</th><th>Room</th></tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.title}</td>
                    <td>{s.department}</td>
                    <td><a href={`mailto:${s.email}`} className="gold-text">{s.email}</a></td>
                    <td>{s.room}</td>
                  </tr>
                ))}
                {staff.length === 0 && <tr><td colSpan="5" className="empty-state">No staff found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
