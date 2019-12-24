import React from 'react';
import './letter-avatar.css';
import { Avatar } from 'antd';

const LetterAvatar : React.FC<{
    name: string,
    size: any,
    color: string
}> = ({name, size, color}) => {
    
    const colors: string[] = ['#03A9F4', '#E91E63', '#F44336', '#9C27B0', '#673AB7', '#3F51B5'];
    const selected_color = color == null ? colors[Math.floor(Math.random() * colors.length)] : color;

    return (
        <Avatar style={{
            backgroundColor: selected_color,
            verticalAlign: 'middle',
        }} size={size}>
            {name}
        </Avatar>
    );
}

export default LetterAvatar;