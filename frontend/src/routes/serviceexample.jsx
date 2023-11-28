import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';

export default function ServiceExample({VendorService}) {
  const [vendors] = useState(VendorService.getVendors());

  // Simple html object to neatly display a vendor
  const vendorDisplay = (vendor) => (
    <div className="vendor-display" style={{backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column'}}>
      <div className="vendor-display-header" style={{display: 'flex', flexDirection: 'row'}}>
        <p>{vendor.id}</p>
        <h2>{vendor.name}</h2>
      </div>
      <div className="vendor-display-body" style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Contact info</h3>
        <p>{vendor.email}</p>
        <p>{vendor.phone}</p>
        <p>{vendor.website}</p>
      </div>
    </div>
  );

  return (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px'}}>
      {
        vendors.map((vendor) => (
          vendorDisplay(vendor)
        ))
      }
    </div>
  );
}

ServiceExample.propTypes = {
  VendorService: PropTypes.func.isRequired,
};
