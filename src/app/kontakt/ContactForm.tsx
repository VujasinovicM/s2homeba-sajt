'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback – zamijeni s pravim API-jem po potrebi
    const subject = encodeURIComponent(`Upit od ${form.name}`);
    const body = encodeURIComponent(
      `Ime: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\nPoruka:\n${form.message}`
    );
    window.location.href = `mailto:info@s2home.ba?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✓</div>
        <p className="text-gray-700 font-semibold">Hvala! Vaš e-mail klijent je otvoren.</p>
        <p className="text-sm text-gray-500 mt-1">Pošaljite poruku da bismo je primili.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#36A8EF]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#36A8EF]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#36A8EF]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Poruka *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#36A8EF] resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Pošaljite poruku
      </button>
    </form>
  );
}
