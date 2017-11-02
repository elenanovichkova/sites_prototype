import React from "react";

const EDICntlTitle = props => {
  let title;
  switch (props.configFormState) {
    case "new":
      title = "New Configuration";
      break;
    case "edit":
      title = "Edit Configuration";
      break;
    case "dupl":
      title = "Duplicate Configuration";
      break;
    default:
      title = "New Configuration";
      break;
  }

  return (
    <div>
      <h3>
        {title}
      </h3>
    </div>
  );
};
export default EDICntlTitle;
