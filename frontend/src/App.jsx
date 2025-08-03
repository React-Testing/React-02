// frontend/src/App.jsx
// import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/users/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(`${API}/users`, form);
    }
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management Testing</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
