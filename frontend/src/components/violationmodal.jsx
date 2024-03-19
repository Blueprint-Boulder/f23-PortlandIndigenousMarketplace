import React, {useState} from 'react';
import PropTypes from 'prop-types';

function ViolationModal({closeModal, vendorId, vendorName, handleSubmit}) { // added vendor object so we can send message to vendor
  const [activeButtons, setButtons] = useState([]);
  const [violationData, setViolationData] = useState({type: '', description: '', vendor_id: vendorId});

  // ask if theres a way to disable the header button when the modal opens

  // const handleSubmit = () => {
  //   console.log(`Posting message(${message}) to ${vendor.name}`);
  //   console.log('... As long as someone finishes my code');
  //   if (activeButtons.length == 0) {
  //     alert('Must select a violated policy to submit!');
  //     return;
  //   }
  //   setViolations();
  //   closeModal(false);
  // };

  const handleButtonClick = (content) => {
    // idea:
    // search through active button list
    // if button already present, set the buttons to be all those except that button
    // otherwise, add button to list
    if (activeButtons.includes(content)) { // to remove button that was added
      setButtons(activeButtons.filter((value) => value !== content));
      return;
    } else if (activeButtons.length == 1) { // only add one button at a time
      return;
    }
    setButtons([...activeButtons, content]); // add button
    setViolationData({...violationData, type: content});
  };
  // changed the code a little bit, easier to use react state and functions than form
  return (
    <div className="fixed inset-x-14 inset-y-32 bg-white drop-shadow-xl rounded-md w-9/12 overflow-y-auto">
      <h2 className="w-full text-center bg-blue rounded-md h-8 mb-4 text-white">Add Violations To: {vendorName}</h2>
      <textarea className="w-11/12 h-1/5 px-2 pt-1 ml-3 mb-0 rounded-lg border border-2 border-blue placeholder:text-blue placeholder:italic" onChange={(e) => setViolationData({...violationData, description: e.target.value})} placeholder="Enter Message Here ..."></textarea>
      <h2 className="text-center text-white">Select Violated Policies</h2>
      <div className="grid grid-cols-3 gap-x-0 gap-y-1 mb-1">
        <PolicyButton onClick={() => handleButtonClick(1)} content={1} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(2)} content={2} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(3)} content={3} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(4)} content={4} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(5)} content={5} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(6)} content={6} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(7)} content={7} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(8)} content={8} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(9)} content={9} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(10)} content={10} activebuttons={activeButtons}/>
        <PolicyButton onClick={() => handleButtonClick(11)} content={11} activebuttons={activeButtons}/>
      </div>
      <footer className='flex flex-row justify-center mt-6 pb-2'>
        <button className={`py-2 px-3 mb-1 mr-2 text-white drop-shadow-xl rounded-lg ${activeButtons.length == 0 ? 'bg-grey-1' : 'bg-blue'}`} onClick={() => {
          activeButtons && handleSubmit(violationData);
        }}>Submit</button>
        <button className="bg-red py-2 px-3 mb-1 text-white drop-shadow-xl rounded-lg" onClick={() => closeModal(false)}>Cancel</button>
      </footer>
    </div>
  );
}

function PolicyButton({activebuttons, content, onClick}) {
  return (
    <button className={`${activebuttons.includes(content) ? 'bg-red' : 'bg-blue'} text-white m-1 p-2 rounded-lg drop-shadow_xl`} onClick={onClick}> {content}</button> // used Harley's VendorButtons as inspo
  );
}

export default ViolationModal;

ViolationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  vendorId: PropTypes.number.isRequired,
  vendorName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PolicyButton.propTypes = {
  content: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  activebuttons: PropTypes.array.isRequired,
};
