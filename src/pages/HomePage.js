import React from "react";
import { Container, Card, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import UserImages from "../components/UserImages";
import "../App.css";

class HomePage extends React.Component {
  render() {
    const { users } = this.props;
    return (
      <>
        {users.map((user, index) => (
          <Container key={index}>
            <Card>
              <Row noGutters form>
                <Col xs="2">
                  <img
                    className="w-50 rounded-circle mx-auto d-block"
                    src={user.profileImage}
                    alt={user.username}
                  />
                  <Link
                    className="each-user-name"
                    name={user.id}
                    to={`/users/${user.id}`}
                  >
                    {user.username}{" "}
                  </Link>
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
