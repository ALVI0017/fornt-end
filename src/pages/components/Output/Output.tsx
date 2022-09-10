import { Tabs, Select, Space, Row, Col, Typography, Table } from "antd";
import React from "react";
import { FormValue } from "../DTO/FromValueDTO";
import { TableDataType } from "../DTO/TableDTO";
import type { ColumnsType } from "antd/es/table";
import { Column } from "@ant-design/plots";
import LabelValue from "../../../components/LabelValue";

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;
const onChange = (key: string) => {
  console.log(key);
};

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
  const productsWithPriceList = formValue.manualCSV.split("\r\n");
  const productList: any[] = productsWithPriceList
    .map((product, index) => {
      if (index != 0) {
        const productName = product.split(",")[0];
        const productPrice = parseFloat(product.split(",")[1]);
        return {
          key: index.toString(),
          product: productName,
          price: productPrice,
        };
      }
    })
    .filter((item) => item);

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
  //  garph config
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
