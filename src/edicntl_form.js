import React from "react";

const EDICntlForm = () => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="edicntl-name">Name *</label>
        <input
          name="edicntl-name"
          id="edicntl-name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="edicntl-purpose">Purpose *</label>
        <select
          name="edicntl-purpose"
          id="edicntl-purpose"
          className="form-control"
        >
          <option value="">SELECT</option>
          <option value="ebill">EBIL</option>
          <option value="ebrv">EBRV</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="edicntl-usage">Usage *</label>
        <select
          name="edicntl-usage"
          id="edicntl-usage"
          className="form-control"
        >
          <option value="">SELECT</option>
          <option value="T">TEST</option>
          <option value="P">PRODUCTION</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="edicntl-fldsep">
          Which delimiter will be used with X12 transaction?
        </label>
        <select
          name="edicntl-fldsep"
          id="edicntl-fldsep"
          className="form-control"
        >
          <option value="">SELECT</option>
          <option value="*">ASTERISK, *</option>
          <option value="~">TILDE, ~</option>
          <option value=":">COLON, :</option>
          <option value="|">VERTICAL BAR, |</option>
          <option value="OTHER">OTHER</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="edicntl-descr">Description</label>
        <input
          name="edicntl-descr"
          id="edicntl-descr"
          type="text"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default EDICntlForm;
