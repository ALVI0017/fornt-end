import {
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  message,
  InputNumber,
  Upload,
  Divider,
} from "antd";

import React, { useState } from "react";

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;

interface Props {
  label: string;
  value: string | number;
}

const LabelValue: React.FC<Props> = ({ label, value }) => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        <Col>
          <b>{label}:</b>
        </Col>
        <Col>{value}</Col>
      </Row>
      <Divider />
    </>
  );
};

export default LabelValue;
