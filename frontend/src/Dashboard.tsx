import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddPartnerForm from './AddPartnerForm';
import SearchBar from './SearchBar';
import { PartnerDetails } from './types';
import './Dashboard.css';

interface DashboardProps {}

// eslint-disable-next-line no-empty-pattern
function Dashboard({}: DashboardProps) {
  const [partners, setPartners] = useState<PartnerDetails[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = () => {
    fetch('http://localhost:4000/', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setPartners(data);
      })
      .catch((error) => console.error('Error fetching partners:', error));
  };

  const handleAddPartner = (newPartner: PartnerDetails) => {
    setPartners((prevPartners) => [...prevPartners, newPartner]);
    setIsFormVisible(false);
  };

  const handleDeletePartner = (id: number) => {
    fetch(`http://localhost:4000/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPartners((prevPartners) => prevPartners.filter((partner) => partner.id !== id));
        }
      })
      .catch((error) => console.error('Error deleting partner:', error));
  };

  const handleEditPartner = (updatedPartner: PartnerDetails) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  const handleSearchResults = (results: PartnerDetails[]) => {
    setPartners(results);
  };

  const handleClearFilters = () => {
    fetchPartners();
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div id="main-content">
      <button className="toggle-form-btn" onClick={toggleFormVisibility}>
        {isFormVisible ? '- Hide Partner Info' : '+ Add a new Partner'}
      </button>
      {isFormVisible && (
        <AddPartnerForm onAddPartner={handleAddPartner} onClose={() => setIsFormVisible(false)} />
      )}
      <SearchBar onSearchResults={handleSearchResults} onClearFilters={handleClearFilters} />
      <div id="main-partners-grid">
        {partners.map((partner) => (
          <PartnerTile
            key={partner.id}
            partnerData={partner}
            onDelete={handleDeletePartner}
            onEdit={handleEditPartner}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

