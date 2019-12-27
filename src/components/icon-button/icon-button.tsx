import React from "react";
import "./icon-button.css";
import { Icon, Button } from "antd";

const IconButton: React.FC<{
  icon: string;
  color?: string;
  hoverColor?: string;
  onClick?: Function;
  loading?: boolean;
}> = ({ icon, color, onClick, loading }) => {
  return (
    <Button
      className="icon-button"
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : () => {}
      }
      loading={loading}
    >
      {!loading ? <Icon
        type={icon}
        style={{
          color
        }}
      />: null}
    </Button>
  );
};

export default IconButton;
