import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  message,
  Modal,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { GENDER } from "../../../constants/constants";
import { CITY_COUNTRY } from "../../../constants/constants";
import { COUNTRY } from "../../../constants/constants";
import { FormValue } from "../DTO/FromValueDTO";
import { checkNgetCsv } from "../../../utils/helperFunctions";

const { confirm } = Modal;
const { Option } = Select;
const { Title } = Typography;

interface Props {
  onFinish: (value: FormValue) => any;
}

const InputForm: React.FC<Props> = ({ onFinish }) => {
  const [inputForm] = Form.useForm();
  const [csvFile, setCsvFile] = useState<any>();
  const [csvFileContent, setCsvFileContent] = useState<
    null | string | ArrayBuffer
  >();
  const [hideCsvFileName, setHideCsvFileName] = useState(false);
  const [country, setCountry] = useState<string>();

  const filteredCities = useMemo<any>(() => {
    if (country) {
      const cities = CITY_COUNTRY.filter((item) => item.country === country);
      return cities;
    }
    return CITY_COUNTRY;
  }, [country]);

  const onChangeCountry = (value: any) => {
    setCountry(value);
  };

  const handleChange = (file: any) => {
    const fileList = file.fileList;
    if (fileList.length) {
      fileList[0].error = "";
      fileList[0].status = "done";
    }
    setHideCsvFileName(false);
    setCsvFile(fileList);
  };

  const readSetCSVContent = () => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvVal = e.target.result;
      if (checkNgetCsv(csvVal).flag) {
        message.error("Wrong Format upload again");
        return;
      }
      inputForm.setFieldsValue({ manualCSV: csvVal });
      setCsvFileContent(csvVal);
    };
    reader.readAsText(csvFile[0].originFileObj);
    inputForm.setFieldsValue({ csvFile: undefined });
    setCsvFile(null);
    setHideCsvFileName(true);
  };
  function uploadCSVWithConfirm() {
    confirm({
      title: "Are you sure to change the CSV file?",
      onOk() {
        readSetCSVContent();
      },
      onCancel() {
        return;
      },
    });
  }
  const handleUpload = () => {
    if (!csvFile) {
      message.error("No file is uploaded");
      return;
    }
    if (csvFileContent) {
      uploadCSVWithConfirm();
    } else {
      readSetCSVContent();
    }
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
            <InputNumber style={{ width: "100%" }} />
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
            <Select
              placeholder={"Please Select Country"}
              onChange={onChangeCountry}
            >
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
              {filteredCities?.map((item: any, key: any) => (
                <Option key={key} value={item.city}>
                  {item.city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Title level={4}>Import CSV Data</Title>
      <Form.Item name="csvFile">
        <Row gutter={16}>
          <Col span={20}>
            <Upload
              action="#"
              accept=".csv"
              maxCount={1}
              showUploadList={!hideCsvFileName}
              onChange={handleChange}
              beforeUpload={(file) =>
                handleAttachmentBeforeUpload(file, "csvFile")
              }
            >
              <Button style={{ width: "100%", textAlign: "left" }}>
                Upload ....
              </Button>
            </Upload>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              icon={<UploadOutlined />}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Col>
        </Row>
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
