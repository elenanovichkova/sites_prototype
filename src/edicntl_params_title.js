import React from "react";

const EDICntlParamsTitle = props => {
  return (
    <div>
      <h3>Configuration Parameters</h3>
      <div className="row">
        <div className="col-md-9" />
        <div className="col-md-3 text-right">
          <span onClick={props.onShowAdminViewClick}>
            {!props.showAdminView
              ? <a href="#edicntl-params-admin-view">Admin View</a>
              : "Admin View"}
          </span>
          &nbsp;/&nbsp;
          <span onClick={props.onShowSemanticViewClick}>
            {props.showAdminView
              ? <a href="#edicntl-params-semantic-view">Semantic View</a>
              : "Semantic View"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EDICntlParamsTitle;
