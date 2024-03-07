import React, {useState} from 'react';
import PropTypes from 'prop-types';

function ViolationModal({closeModal, vendor}) { // added vendor object so we can send message to vendor
  const [message, setMessage] = useState('');
  const [activeButtons, setButtons] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  function handleSubmit() {
    console.log(`Posting message(${message}) to ${vendor.name}`);
    console.log('... As long as someone finishes my code');
    closeModal(false);
  }

  const handleButtonClick = (content) => {
    setButtonClicked(!buttonClicked);
    setButtons([...activeButtons, content]);
  };
  // changed the code a little bit, easier to use react state and functions than form
  return (
    <div className="fixed inset-y-32 inset-x-14 rounded-lg drop-shadow-xl bg-white w-9/12 h-4/6">
      <header className="flex flex-row w-auto bg-blue shadow-xl rounded-md pt-1 h-8 mb-2 pl-1">
        <h2 className="text-white">Add Violations To {vendor.name}</h2>
      </header>
      <textarea className="ml-1 w-9/12 h-1/3 pl-2 pt-1 mb-1 rounded-lg drop-shadow-xl border border-2 border-blue placeholder:text-blue placeholder:italic shadow-inner" onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message Here ..."></textarea>
      <h2 className="text-center">Select Violated Policies</h2>
      <div className="grid grid-cols-4 gap-3">
        <PolicyButton onClick={() => handleButtonClick(content)} content={1} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={2} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={3} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={4} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={5} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={6} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={7} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={8} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={9} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={10} buttonclicked={buttonClicked}/>
        <PolicyButton onClick={() => handleButtonClick(content)} content={11} buttonclicked={buttonClicked}/>
      </div>
      <footer className='flex flex-row justify-center mt-6 ml-5 pb-2'>
        <button className="bg-blue py-1 px-3 mb-2 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => handleSubmit()}>Submit</button>
        <button className="bg-red py-1 px-2 mb-4 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => closeModal(false)}>Cancel</button>
      </footer>
    </div>
  );
}

function PolicyButton({content, onClick, buttonclicked}) {
  return (
    <button className={`${buttonclicked ? 'bg-red' : 'bg-blue'} text-white m-1 p-2 rounded-lg drop-shadow_xl`} onClick={onClick}> {content}</button> // used Harley's VendorButtons as inspo
  );
}

export default ViolationModal;

ViolationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired,
};

PolicyButton.propTypes ={
  content: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonclicked: PropTypes.bool.isRequired,
};
