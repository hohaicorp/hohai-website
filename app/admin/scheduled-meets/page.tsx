'use client'
import { useEffect, useState } from 'react';
import { Calendar, Link2, Send, Loader2 } from 'lucide-react';

export default function ScheduledMeetsAdmin() {
  const [meets, setMeets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [linkEdit, setLinkEdit] = useState<{ [id: number]: string }>({});
  const [sending, setSending] = useState<{ [id: number]: boolean }>({});
  const [statusMsg, setStatusMsg] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    fetch('/api/admin/scheduled-meets')
      .then(res => res.json())
      .then(data => {
        setMeets(data.meets || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load scheduled meetings.');
        setLoading(false);
      });
  }, []);

  const handleLinkChange = (id: number, value: string) => {
    setLinkEdit({ ...linkEdit, [id]: value });
  };

  const handleSendLink = async (meet: any) => {
    setSending({ ...sending, [meet.id]: true });
    setStatusMsg({ ...statusMsg, [meet.id]: '' });
    try {
      const res = await fetch('/api/admin/scheduled-meets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: meet.id, meetingLink: linkEdit[meet.id] })
      });
      const result = await res.json();
      if (result.success) {
        setStatusMsg({ ...statusMsg, [meet.id]: 'Meeting link sent!' });
        setMeets(meets.map(m => m.id === meet.id ? { ...m, meetingLink: linkEdit[meet.id], status: 'link-sent' } : m));
      } else {
        setStatusMsg({ ...statusMsg, [meet.id]: result.error || 'Failed to send link.' });
      }
    } catch {
      setStatusMsg({ ...statusMsg, [meet.id]: 'Failed to send link.' });
    } finally {
      setSending({ ...sending, [meet.id]: false });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Calendar className="w-6 h-6" /> Scheduled Meetings</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="animate-spin" /> Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : meets.length === 0 ? (
        <div className="text-gray-500">No scheduled meetings yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Date/Time</th>
                <th className="p-2 border">Mode</th>
                <th className="p-2 border">Notes</th>
                <th className="p-2 border">Meeting Link</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {meets.map(meet => (
                <tr key={meet.id} className="border-b">
                  <td className="p-2 border">{meet.name}</td>
                  <td className="p-2 border">{meet.email}</td>
                  <td className="p-2 border">{meet.phone || '-'}</td>
                  <td className="p-2 border">{new Date(meet.date).toLocaleString()}</td>
                  <td className="p-2 border">{meet.mode}</td>
                  <td className="p-2 border">{meet.notes || '-'}</td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-40"
                      value={linkEdit[meet.id] ?? meet.meetingLink ?? ''}
                      onChange={e => handleLinkChange(meet.id, e.target.value)}
                      placeholder="Paste meeting link"
                    />
                  </td>
                  <td className="p-2 border">{meet.status}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 disabled:opacity-50"
                      onClick={() => handleSendLink(meet)}
                      disabled={sending[meet.id] || !linkEdit[meet.id]}
                    >
                      {sending[meet.id] ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />} Send Link
                    </button>
                    {statusMsg[meet.id] && <div className="text-xs mt-1 text-green-600">{statusMsg[meet.id]}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 