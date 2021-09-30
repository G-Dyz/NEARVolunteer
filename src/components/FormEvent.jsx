import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function FormEvent({ onSubmit, currentUser }) {
  const currentDay = new Date().toISOString().substring(0, 10);
  var curr = new Date();
  curr.setDate(curr.getDate() + 2);
  const expirationDay = curr.toISOString().substr(0, 10);

  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Generate your event, {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="message">Certificate:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p className="highlight">
          <label htmlFor="dateStart">Date Start:</label>
          <input
            type="date"
            autoComplete="off"
            autoFocus
            id="dateStart"
            defaultValue={currentDay}
            required
          />
        </p>
        <p className="highlight">
          <label htmlFor="dateEnd">Date End:</label>
          <input
            type="date"
            autoComplete="off"
            autoFocus
            id="dateEnd"
            defaultValue={expirationDay}
            required
          />
        </p>
        {/* <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p> */}
        <p className="form-action">
          <button type="submit">Generate your certificate</button>
        </p>
      </fieldset>
    </form>
  );
}

FormEvent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
