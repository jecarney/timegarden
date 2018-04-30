import React from "react";

import pageStyle from "./PageStyles.js";

const Page = props => {
  return (
    <div style={{ ...pageStyle.holder, ...props.extraStyles }}>
      {props.children}
    </div>
  );
};

export default Page;
