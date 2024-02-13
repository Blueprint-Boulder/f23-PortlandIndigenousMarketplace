import React from 'react';

function MessageModal({closeModal}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white w-50 h-50">
      <form method="post" action="...">
        <label htmlFor="message">
          <textarea id="message" name="message" placeholder="Enter Message Here ..."></textarea>
          Send A Message
        </label>
        <button onClick={() => closeModal(false)}>Cancel</button>
        <input type="submit" value="Send"></input>
      </form>
    </div>
  );
}

export default MessageModal;
