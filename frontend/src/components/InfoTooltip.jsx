import React from "react";
import ok from "../images/ok.svg";
import err from "../images/err.svg";

function InfoTooltip({ isOpen, onClose, isSuccessReq, text }) {
  return (
    <div className={`popup popup__tooltip ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__box">
          <img
            alt="imgStatus"
            src={isSuccessReq ? ok : err}
            className="popup__notice-pic"
          />
          <h2 className="popup__content-title popup__content-title_type_tooltip">
            {text}
          </h2>
        </div>
        <button
          className="popup__button-close link"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
