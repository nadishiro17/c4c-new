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

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  // Function to fetch all partners
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

  // Handle adding a new partner
  const handleAddPartner = (newPartner: PartnerDetails) => {
    setPartners((prevPartners) => [...prevPartners, newPartner]);
    setIsFormVisible(false);
  };

  // Handle deleting a partner
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

  // Handle editing a partner
  const handleEditPartner = (updatedPartner: PartnerDetails) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  // Handle search results
  const handleSearchResults = (results: PartnerDetails[]) => {
    setPartners(results);
  };

  // Handle clearing search filters
  const handleClearFilters = () => {
    fetchPartners();
  };

  // Toggle the visibility of the add partner form
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

