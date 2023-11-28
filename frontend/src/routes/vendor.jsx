import React from 'react';
import {useState} from 'react';
import {useParams} from 'react-router';
export default function Vendor() {
  const [vendorId] = useState(useParams().vendorId);
  return (
    <div className="color-red-300">  You are on the vendor {vendorId} route</div>

  );
}
