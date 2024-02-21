import React, {useState} from 'react';
import PropTypes from 'prop-types';

function ViolationModal({closeModal, vendor}) { // added vendor object so we can send message to vendor
  const [message, setMessage] = useState('');
  const [activeButtons, setButtons] = useState([]);

  function handleSubmit() {
    console.log(`Posting message(${message}) to ${vendor.name}`);
    console.log('... As long as someone finishes my code');
    closeModal(false);
  }

  const handleButtonClick = (content) => {
    if (activeButtons.includes(content)) {
      setButtons(activeButtons.filter((value) => value !== content));
      return;
    }
    setButtons([...activeButtons, content]);
  };
  // changed the code a little bit, easier to use react state and functions than form
  return (
    <div className="fixed inset-y-96 inset-x-14 rounded-lg drop-shadow-xl bg-white w-9/12 h-4/6">
      <header className="flex flex-row w-auto bg-blue shadow-xl rounded-md pt-1 h-8 mb-2 pl-1">
        <h2 className="text-white">Add Violations To {vendor.name}</h2>
      </header>
      <textarea className="ml-1 w-9/12 h-1/3 pl-2 pt-1 mb-1 rounded-lg drop-shadow-xl border border-2 border-blue placeholder:text-blue placeholder:italic shadow-inner" onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message Here ..."></textarea>
      <h2 className="text-center">Select Violated Policies</h2>
      <div className="grid grid-cols-4 gap-3">
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
      <footer className='flex flex-row justify-center mt-6 ml-5 pb-2'>
        <button className="bg-blue py-1 px-3 mb-2 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => handleSubmit()}>Submit</button>
        <button className="bg-red py-1 px-2 mb-4 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => closeModal(false)}>Cancel</button>
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
  vendor: PropTypes.object.isRequired,
};

PolicyButton.propTypes = {
  content: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  activebuttons: PropTypes.array.isRequired,
};
