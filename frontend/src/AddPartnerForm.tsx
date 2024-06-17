import { useState } from 'react';
import { PartnerDetails } from './types';
import './AddPartnerForm.css';

interface AddPartnerFormProps {
  onAddPartner: (partner: PartnerDetails) => void; // Callback to add a new partner
  onClose: () => void; // Callback to close the form
}

// Component for the add partner form
function AddPartnerForm({ onAddPartner, onClose }: AddPartnerFormProps) {
  // State variables to manage form inputs
  const [name, setName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send POST request to add a new partner
    const newPartner = { name, thumbnailUrl, description, isActive } as PartnerDetails;
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartner),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddPartner({ ...newPartner, id: data.id });
        onClose();
      })
      .catch((error) => console.error('Error adding partner:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Partner name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Partner description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="thumbnailUrl">Partner Logo Source</label>
        <input
          type="text"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="isActive">Active?</label>
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPartnerForm;


