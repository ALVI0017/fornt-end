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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { GENDER } from "../../../constants/constants";
import { CITY_COUNTRY } from "../../../constants/constants";
import { COUNTRY } from "../../../constants/constants";
import { FormValue } from "../DTO/FromValueDTO";

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

interface Props {
  onFinish: (value: FormValue) => any;
}

const InputForm: React.FC<Props> = ({ onFinish }) => {
  const [inputForm] = Form.useForm();
  const [csvFile, setCsvFile] = useState();
  const [csvFileContent, setCsvFileContent] = useState<
    null | string | ArrayBuffer
  >();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = (file: any) => {
    const fileList = file.fileList;
    if (fileList.length) {
      fileList[0].error = "";
      fileList[0].status = "done";
    }
    setCsvFile(fileList);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvVal = e.target.result;
      inputForm.setFieldsValue({ manualCSV: csvVal });
      setCsvFileContent(csvVal);
    };
    reader.readAsText(fileList[0].originFileObj);
    setCsvFile(fileList);
  };

  const handleAttachmentBeforeUpload = (file: any, fieldName: any) => {
    const acceptedFormats = ["csv"];
    if (acceptedFormats.includes(file.name.split(".")[1])) {
      inputForm.setFields([{ name: fieldName, errors: [] }]);
      return true;
    } else {
      // message.error(`You can only upload ${acceptedFormats.join(" or ")}  file!`);
      const errorMessage = `You can only upload ${acceptedFormats.join(
        " or "
      )}  file!`;
      inputForm.setFields([{ name: fieldName, errors: [errorMessage] }]); //add error message in "otherInfoForm" antd
      return Upload.LIST_IGNORE;
    }
  };
  return (
    <Form
      labelWrap
      layout="vertical"
      form={inputForm}
      name="inputForm"
      onFinish={onFinish}
    >
      <Title level={4}>User</Title>
      <Row gutter={[16, 16]} wrap>
        <Col span={16}>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input type={"text"} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder={"Please Select Gender"}>
              {GENDER.map((item, key) => (
                <Option key={key} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { type: "number", min: 0, max: 120 },
              { required: true, message: "Please input your name!" },
            ]}
          >
            <InputNumber width={"100%"} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]} wrap>
        <Col span={16}>
          <Form.Item
            label="Email"
            required
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Country" name="country">
            <Select placeholder={"Please Select Country"}>
              {COUNTRY.map((item, key) => (
                <Option key={key} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="City" name="city">
            <Select placeholder={"Please Select City"}>
              {CITY_COUNTRY.map((item, key) => (
                <Option key={key} value={item.city}>
                  {item.city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Title level={4}>Import CSV Data</Title>
      <Form.Item
        name="csvFile"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="#"
          accept=".csv"
          maxCount={1}
          onChange={handleChange}
          beforeUpload={(file) => handleAttachmentBeforeUpload(file, "csvFile")}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item name={"manualCSV"} label="Manual CSV Data input">
        <Input.TextArea rows={10} />
      </Form.Item>
      <Form.Item>
        <Row justify="center">
          <Button type="primary" htmlType="submit" size="large">
            Continue
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default InputForm;
