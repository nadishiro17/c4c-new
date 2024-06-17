import { useState } from 'react';
import { PartnerDetails } from './types';
import './EditPartnerForm.css'


interface EditPartnerFormProps {
  partnerData: PartnerDetails; // Data of the partner to be edited
  onEdit: (updatedPartner: PartnerDetails) => void; // Callback to handle editing a partner
  onCancel: () => void; // Callback to handle form cancellation
}

// Component for the edit partner form
function EditPartnerForm({ partnerData, onEdit, onCancel }: EditPartnerFormProps) {
  const [name, setName] = useState(partnerData.name);
  const [thumbnailUrl, setThumbnailUrl] = useState(partnerData.thumbnailUrl);
  const [description, setDescription] = useState(partnerData.description);
  const [isActive, setIsActive] = useState(partnerData.isActive);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPartner = { ...partnerData, name, thumbnailUrl, description, isActive };
    fetch(`http://localhost:4000/${partnerData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPartner),
    })
      .then((res) => res.json())
      .then(() => {
        onEdit(updatedPartner);
        onCancel();
      })
      .catch((error) => console.error('Error updating partner:', error));
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
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditPartnerForm;
