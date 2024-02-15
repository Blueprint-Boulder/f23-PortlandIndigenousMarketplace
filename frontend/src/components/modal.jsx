import React, {useState} from 'react';

export default function Modal() {
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <>
      {show && <h1>Modal</h1>}
      <button onClick={toggleModal}>Show Modal</button>
    </>
  );
}
