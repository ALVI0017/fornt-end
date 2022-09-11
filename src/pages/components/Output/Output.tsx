import { Space, Row, Col, Typography, Table } from "antd";
import React from "react";
import { FormValue } from "../DTO/FromValueDTO";
import { TableDataType } from "../DTO/TableDTO";
import type { ColumnsType } from "antd/es/table";
import { Column } from "@ant-design/plots";
import LabelValue from "../../../components/LabelValue";
import { checkNgetCsv } from "../../../utils/helperFunctions";

const { Title } = Typography;

interface Props {
  formValue: FormValue;
}

const columns: ColumnsType<TableDataType> = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];

const Output: React.FC<Props> = ({ formValue }) => {
  // table and graph data prep
  const productList: any[] = checkNgetCsv(formValue.manualCSV).productList;

  //  garph config
  const config: any = {
    data: productList,
    xField: "product",
    yField: "price",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    autoFit: true,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
  };
  return (
    <>
      <Title level={5}>Personal Information</Title>
      <br />
      <Row gutter={100} justify="space-between">
        <Col span={12}>
          <LabelValue label={"Name"} value={formValue.name} />
          <LabelValue label={"Gender"} value={formValue.gender} />
          <LabelValue label={"Age"} value={formValue.age} />
        </Col>
        <Col span={12}>
          <LabelValue label={"Email"} value={formValue.email} />
          <LabelValue label={"Country"} value={formValue.country} />
          <LabelValue label={"City"} value={formValue.city} />
        </Col>
      </Row>
      <Row gutter={100} justify="space-between">
        <Col span={12}>
          <Row justify="space-between">
            <Col>
              <Title level={5}>Data</Title>
            </Col>
            <Col>
              <Space direction="horizontal"></Space>
            </Col>
          </Row>
          <Table columns={columns} dataSource={productList} />;
        </Col>
        <Col span={12}>
          <Title level={5}>Graph</Title>
          <br />
          <Column {...config} />
        </Col>
      </Row>
    </>
  );
};

export default Output;
