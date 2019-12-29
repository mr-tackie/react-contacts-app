import React from "react";
import "./fab.css";
import { Icon, Tooltip } from "antd";

const Fab: React.FC<{
  onClick?: Function;
  icon: string;
  tooltipText?: string;
}> = ({ onClick, icon, tooltipText }) => {
  return (
    <Tooltip placement="top" title={tooltipText}>
    <div
      className="fab-container"
      onClick={onClick ? () => onClick() : () => null}
    >
      <Icon type={icon}/>
    </div>
    </Tooltip>
  );
};

export default Fab;
