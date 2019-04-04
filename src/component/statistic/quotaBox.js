import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./style.module.scss";

export default (props) => {
  const {
    cardTitle,
    content
  } = props;
  const count = content.length;
  return (
    <Card
      className={styles.card}
      title={cardTitle}
    >
      <Row type="flex" justify="center" style={{ textAlign: "center" }}>
        {
          content.map((item, index) => (
            <Col key={Math.random()} span={Math.floor(24 / count)} className={index > 0 && index < count - 1 ? styles.yesterday : ""}>
              <Col>
                <h3>{item.title}</h3>
              </Col>
              <Col>
                <h1>{item.value}</h1>
              </Col>
            </Col>
          ))
        }
      </Row>
    </Card>
  );
};
