import { useState } from 'react';
import { icons } from '../assets/icons/icons';

export default function VaultDetail({ item, onClose, folders }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState('');

  const IconClose = icons.close;
  const IconFolder = icons.folder;
  const IconCopy = icons.copy;
  const IconEye = icons.eye;
  const IconEyeOff = icons.eyeOff;
  const IconLink = icons.link;
  const IconEdit = icons.edit;
  const IconTrash = icons.trash;

  const folder = folders.find(f => f.id === item.folder_id);

  const copy = (value, label) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="vault-detail">
      <div className="vault-detail-header">
        <h2 className="vault-detail-title">{item.title}</h2>
        <button className="vault-detail-close" onClick={onClose}>
          <IconClose className="icon-btn" />
        </button>
      </div>

      {folder && (
        <div className="detail-badge">
          <IconFolder className="icon-xs" />
          {folder.name}
        </div>
      )}

      <div className="detail-fields">
        <div className="detail-field">
          <label className="detail-label">Identifiant</label>
          <div className="detail-value-row">
            <span className="detail-value">{item.login}</span>
            <button
              className={`detail-copy ${copied === 'login' ? 'copied' : ''}`}
              onClick={() => copy(item.login, 'login')}
            >
              <IconCopy className="icon-sm" />
              {copied === 'login' ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>

        <div className="detail-field">
          <label className="detail-label">Mot de passe</label>
          <div className="detail-value-row">
            <span className="detail-value detail-password">
              {showPassword ? item.password : '••••••••••••'}
            </span>
            <button className="detail-eye" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? <IconEyeOff className="icon-sm" /> : <IconEye className="icon-sm" />}
            </button>
            <button
              className={`detail-copy ${copied === 'password' ? 'copied' : ''}`}
              onClick={() => copy(item.password, 'password')}
            >
              <IconCopy className="icon-sm" />
              {copied === 'password' ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>

        {item.url && (
          <div className="detail-field">
            <label className="detail-label">Site web</label>
            <div className="detail-value-row">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="detail-link">
                {item.url}
              </a>
              <IconLink className="icon-sm icon-muted" />
            </div>
          </div>
        )}

        {item.note && (
          <div className="detail-field">
            <label className="detail-label">Note</label>
            <p className="detail-note">{item.note}</p>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <button className="btn-edit">
          <IconEdit className="icon-btn" />
          Modifier
        </button>
        <button className="btn-delete">
          <IconTrash className="icon-btn" />
          Supprimer
        </button>
      </div>
    </div>
  );
}
