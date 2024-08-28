import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Violation from '../objects/Violation';

export default function ViolationModal({ closeModal, vendorId, vendorName, handleSubmit }) { // added vendor object so we can send message to vendor
  const [violationData, setViolationData] = useState(new Violation(-1, -1, '', vendorId));

  // changed the code a little bit, easier to use react state and functions than form
  return <Modal blurOnClick={() => closeModal(false)} backgroundColor={`bg-greywhite w-4/5 h-[65vh] overflow-x-clip`}>
    <form action="" className="flex flex-col gap-4 h-full w-full items-center" onSubmit={() => handleSubmit(violationData)}>
      <h2 className="text-2xl text-center text-black font-bold">{vendorName}</h2>
      <h2 className="text-center text-sm text-slate-400">Fill out the form once for each violation - do not try to submit multiple violations in one form.</h2>
      <p>Policy Number</p>
      <input id='policynum' className={`drop-shadow-xl rounded-lg border-2 border-blue text-center`} placeholder={1} type='number' max={11} min={1} onChange={e => setViolationData({...violationData, type: e.target.value})}/>
      <p>Violation Description</p>
      <textarea type='text' id="description" name="description" value={violationData.description} className="w-5/6 h-40 px-2 py-2 pt-1 rounded-lg border-2 border-blue placeholder:italic" onChange={(e) => setViolationData({ ...violationData, description: e.target.value })} placeholder="Violation description..."></textarea>
      <footer className='flex flex-row justify-center mt-6 pb-2'>
        <button type="submit" className={`py-2 px-3 mb-1 mr-2 text-white drop-shadow-xl rounded-lg bg-blue`}>Submit</button>
        <button className="bg-red py-2 px-3 mb-1 text-white drop-shadow-xl rounded-lg" onClick={() => closeModal(false)}>Cancel</button>
      </footer>
    </form>
  </Modal>
}