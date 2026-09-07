import { useState } from 'react';
import { icons } from '../assets/icons/icons';

function generatePassword() {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = lower + upper + digits + special;
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => all[b % all.length]).join('');
}

export default function VaultModal({ folders, onClose }) {
  const [form, setForm] = useState({
    title: '',
    login: '',
    password: '',
    url: '',
    note: '',
    folder_id: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const IconClose = icons.close;
  const IconEye = icons.eye;
  const IconEyeOff = icons.eyeOff;
  const IconGenerate = icons.generate;

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const handleGenerate = () => {
    set('password', generatePassword());
    setShowPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: appeler api.js pour créer le mot de passe
    console.log('Nouveau mot de passe :', form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Nouveau mot de passe</h2>
          <button className="vault-detail-close" onClick={onClose}>
            <IconClose className="icon-btn" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="detail-field">
            <label className="detail-label">Titre *</label>
            <input
              className="modal-input"
              placeholder="ex: GitHub"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              required
            />
          </div>

          <div className="detail-field">
            <label className="detail-label">Identifiant *</label>
            <input
              className="modal-input"
              placeholder="email ou nom d'utilisateur"
              value={form.login}
              onChange={e => set('login', e.target.value)}
              required
            />
          </div>

          <div className="detail-field">
            <label className="detail-label">Mot de passe *</label>
            <div className="modal-password-row">
              <input
                className="modal-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                required
              />
              <button type="button" className="detail-eye" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <IconEyeOff className="icon-sm" /> : <IconEye className="icon-sm" />}
              </button>
              <button type="button" className="btn-generate" onClick={handleGenerate}>
                <IconGenerate className="icon-sm" />
                Générer
              </button>
            </div>
          </div>

          <div className="detail-field">
            <label className="detail-label">Site web</label>
            <input
              className="modal-input"
              placeholder="https://..."
              value={form.url}
              onChange={e => set('url', e.target.value)}
            />
          </div>

          <div className="detail-field">
            <label className="detail-label">Dossier</label>
            <select
              className="modal-input"
              value={form.folder_id}
              onChange={e => set('folder_id', e.target.value)}
            >
              <option value="">Aucun dossier</option>
              {folders.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="detail-field">
            <label className="detail-label">Note</label>
            <textarea
              className="modal-input modal-textarea"
              placeholder="Note optionnelle..."
              value={form.note}
              onChange={e => set('note', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-delete" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-edit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
