import { icons } from '../assets/icons/icons';

export default function Sidebar({ folders, selectedFolder, onSelectFolder, onLogout, passwordCount }) {
  const IconGrid = icons.grid;
  const IconFolder = icons.folder;
  const IconLogout = icons.logout;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Lockbox</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Coffre-fort</p>
        <button
          className={`sidebar-item ${selectedFolder === null ? 'active' : ''}`}
          onClick={() => onSelectFolder(null)}
        >
          <IconGrid className="sidebar-item-icon" />
          Tous les mots de passe
          <span className="sidebar-count">{passwordCount}</span>
        </button>

        <p className="sidebar-section-label">Dossiers</p>
        {folders.map(folder => (
          <button
            key={folder.id}
            className={`sidebar-item ${selectedFolder === folder.id ? 'active' : ''}`}
            onClick={() => onSelectFolder(folder.id)}
          >
            <IconFolder className="sidebar-item-icon" />
            {folder.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item sidebar-logout" onClick={onLogout}>
          <IconLogout className="sidebar-item-icon" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
