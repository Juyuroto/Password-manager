import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VaultList from '../components/VaultList';
import VaultDetail from '../components/VaultDetail';
import VaultModal from '../components/VaultModal';
import { icons } from '../assets/icons/icons';
import '../assets/css/Dashboard.css';

const MOCK_FOLDERS = [
  { id: 1, name: 'Réseaux sociaux' },
  { id: 2, name: 'Travail' },
  { id: 3, name: 'Finance' },
  { id: 4, name: 'Perso' },
];

const MOCK_PASSWORDS = [
  { id: 1, title: 'GitHub', type: 'website', login: 'alain@gmail.com', password: 'Gh!x9Kp2mN', url: 'https://github.com', note: '', folder_id: 2 },
  { id: 2, title: 'Instagram', type: 'website', login: 'alain_c', password: 'Ig@7Yz3qRt', url: 'https://instagram.com', note: '', folder_id: 1 },
  { id: 3, title: 'Netflix', type: 'website', login: 'alain@gmail.com', password: 'Nf#5Wv8jLs', url: 'https://netflix.com', note: 'Compte famille', folder_id: 4 },
  { id: 4, title: 'Banque CIC', type: 'website', login: '04829301', password: 'Bk$2Xc6nMp', url: 'https://cic.fr', note: 'Code client : 04829301', folder_id: 3 },
  { id: 5, title: 'Twitter', type: 'website', login: 'alain_corazzini', password: 'Tw&1Qa4kFv', url: 'https://x.com', note: '', folder_id: 1 },
  { id: 6, title: 'Gmail Pro', type: 'email', login: 'alain.pro@gmail.com', password: 'Gm!8Ub3hJw', url: 'https://mail.google.com', note: '', folder_id: 2 },
];

export default function Dashboard() {
  const [folders] = useState(MOCK_FOLDERS);
  const [passwords] = useState(MOCK_PASSWORDS);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const IconSearch = icons.search;
  const IconAdd = icons.add;

  const filtered = passwords.filter(p => {
    const matchFolder = selectedFolder ? p.folder_id === selectedFolder : true;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.login.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('lockbox_token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <Sidebar
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onLogout={handleLogout}
        passwordCount={passwords.length}
      />

      <div className="dashboard-main">
        <div className="dashboard-toolbar">
          <div className="search-wrapper">
            <IconSearch className="search-icon-svg" />
            <input
              className="search-input"
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            <IconAdd className="icon-btn" />
            Ajouter
          </button>
        </div>

        <div className="dashboard-content">
          <VaultList
            items={filtered}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            folders={folders}
          />
          {selectedItem && (
            <VaultDetail
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              folders={folders}
            />
          )}
        </div>
      </div>

      {showModal && (
        <VaultModal
          folders={folders}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
