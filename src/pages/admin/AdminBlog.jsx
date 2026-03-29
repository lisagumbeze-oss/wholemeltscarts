import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { blogPosts } from '../../data/products';

export default function AdminBlog() {
  // Using the initial posts to seed our local view
  const [posts, setPosts] = useState(blogPosts || []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Daily Info Management</h1>
          <div style={{ color: 'var(--text-secondary)' }}>Publish and manage blog posts and announcements.</div>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td style={{ fontWeight: 600 }}>{post.title}</td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.excerpt}
                </td>
                <td>
                  <span style={{ color: 'var(--text-muted)' }}>{post.date}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                    <Edit2 size={18} style={{ cursor: 'pointer' }} className="hover-primary" />
                    <Trash2 size={18} style={{ cursor: 'pointer', color: '#ff4d4f' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
