import React from 'react';


export default function oneEvent() {
  return (
    <div id="Event container">
      <div id="Event-content flex flex-col">
        <div id="Event-title text-2xl font-bold tracking-wide">
        </div>
        <img id="Event-img break-before"></img>
        <div className='Event-info flex flex-col'>
          <div id='About flex flex-row'>
            <p></p>
            <button></button>
          </div>

          <button id="text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Register</button>
        </div>
      </div>

    </div>
  );
  /* Format
          Event Title
        I  M   A   G   E
        About v (dropdown) // maybe make a button w no outline, clicking anywhere in area creates the dropdown effect
          - add a hover to change text color maybe
      Location | Date+time
         Register button
  */
}
