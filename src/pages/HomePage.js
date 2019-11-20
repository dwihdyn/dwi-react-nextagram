import React from "react";
import { Container, Card, Row, Col } from "reactstrap";
import UserImages from "../components/UserImages";
import "../App.css";

class HomePage extends React.Component {
  render() {
    const { childUsers } = this.props;
    // console.log(this);
    return (
      <>
        {childUsers.map((user, index) => (
          <Container key={index}>
            <Card>
              <Row noGutters form>
                <Col xs="2">
                  <img
                    className="w-50 rounded-circle mx-auto d-block"
                    src={user.profileImage}
                    alt={user.username}
                  />
                  <p className="each-user-name">{user.username} </p>
                </Col>
                <Col style={{ height: "300px" }}>
                  <UserImages userId={user.id} />
                </Col>
              </Row>
            </Card>
          </Container>
        ))}
      </>
    );
  }
}
export default HomePage;
