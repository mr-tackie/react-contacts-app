import React from 'react';
import './icon-button.css';
import {Icon} from 'antd';

const IconButton : React.FC<{
    icon: string,
    color?: string,
    hoverColor?: string,
}> = ({icon, color, hoverColor,}) => {
    return (
        <div className="icon-button">
            <Icon type={icon} style={{
                color
            }}/>
        </div>
    )
}

export default IconButton;