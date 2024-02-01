import {React, useState} from 'react';

export default function messageModal() {
  const [showModal, setShowModal] = useState(false);

  const setShowModalHandler = () => {
    setShowModal(true);
  };

  const setShowModalHandlerClose = () => {
    setShowModal(false);
  };

  return (
    <>
      showModal && (
        <div className="bg-white w-50 h-50">
          <form method="post" action="...">
            <label for="message">
              <textarea id="message" name="message" placeholder="Enter Message Here ..."></textarea>
              Send A Message
            </label>
            <button onClick={() => setShowModalHandlerClose()}>Cancel</button>
            <input type="submit" value="Send"></input>
          </form>
        </div>
      )
    </>
  );
}
