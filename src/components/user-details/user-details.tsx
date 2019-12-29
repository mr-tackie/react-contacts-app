import React from "react";
import { Row, Col, Typography, Avatar } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import IconButton from "../icon-button/icon-button";
import { useAuth0 } from "../../react-auth0-spa";
const { Title, Text } = Typography;

const  UserDetails : React.FC = () => {
  const { logout, user } = useAuth0();
  
    return (
      <Row>
        <Col span={24} className="user-details-container">
          <div className="user-details">
            {!user.picture ? <LetterAvatar name="John Doe" size="large" /> : <Avatar size="large" src={user.picture}/>}
            <div className="header-name">
              <Title className="header-name__name" level={3}>
                {user.name}
              </Title>
              <Text className="header-name__email">{user.nickname}</Text>
            </div>
          </div>
          <IconButton icon="logout" onClick = {() => logout()} color="#2196F3" />
        </Col>
      </Row>
    );
}

export default UserDetails;
