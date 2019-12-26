import React from 'react';
import './icon-button.css';
import {Icon} from 'antd';

const IconButton : React.FC<{
    icon: string,
    color?: string,
    hoverColor?: string,
    onClick?: Function
}> = ({icon, color, onClick}) => {
    return (
        <button className="icon-button" onClick={onClick ? () => {onClick()} : () => {}}>
            <Icon type={icon} style={{
                color
            }}/>
        </button>
    )
}

export default IconButton;