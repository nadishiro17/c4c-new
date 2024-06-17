import { useState } from 'react';
import { PartnerDetails } from './types';
import EditPartnerForm from './EditPartnerForm';
import './PartnerTile.css'

interface PartnerTileProps {
  partnerData: PartnerDetails;
  onDelete: (id: number) => void;
  onEdit: (updatedPartner: PartnerDetails) => void;
}

function PartnerTile({ partnerData, onDelete, onEdit }: PartnerTileProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="partner-tile">
      {isEditing ? (
        <EditPartnerForm
          partnerData={partnerData}
          onEdit={onEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button className="delete-btn" onClick={() => onDelete(partnerData.id)}>&times;</button>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          <img className="partner-thumbnail" src={partnerData.thumbnailUrl} alt={partnerData.name} />
          <hr />
          <div className="partner-info">
            <h3>{partnerData.name}</h3>
            <p>{partnerData.description}</p>
            <p className={partnerData.isActive ? 'active' : 'inactive'}>
              {partnerData.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default PartnerTile;






// import { PartnerDetails } from '../types';

// interface PartnerTileProps {
//   partnerData: PartnerDetails;
// }

// function PartnerTile({ partnerData }: PartnerTileProps) {
//   return (
//     <div className="partner-tile">
//       <img className="partner-thumbnail" src={partnerData.thumbnailUrl} alt={partnerData.name} />
//       <hr />
//       <div className="partner-info">
//         <h3>{partnerData.name}</h3>
//         <p>{partnerData.description}</p>
//         <p>{partnerData.isActive ? 'Active' : 'Inactive'}</p>
//       </div>
//     </div>
//   );
// }

// export default PartnerTile;
