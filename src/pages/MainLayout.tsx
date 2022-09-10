import { Tabs } from "antd";
import InputForm from "./components/InputForm/InputForm";
import React, { useState } from "react";
import Output from "./components/Output/Output";
import { FormValue } from "./components/DTO/FromValueDTO";
const { TabPane } = Tabs;
const formValueTs: FormValue = {
  name: "",
  age: 1,
  country: "",
  city: "",
  email: "",
  manualCSV: "",
  gender: "",
};
const MainLayout: React.FC = () => {
  const [output, setOutput] = useState<FormValue>(formValueTs);
  const [activeKey, setActiveKey] = useState<string>("1");

  const changeTab = (Key: string) => setActiveKey(Key);

  const onFormSubmit = (values: FormValue) => {
    console.log(values);
    setOutput(values);
    changeTab("2");
  };
  const onChange = (key: string) => {
    changeTab(key);
  };

  return (
    <Tabs
      onChange={onChange}
      defaultActiveKey="1"
      activeKey={activeKey}
      centered
      type="card"
    >
      <TabPane tab="Input" key="1">
        {/* input form  */}
        <InputForm onFinish={onFormSubmit} />
      </TabPane>
      <TabPane tab="Output" key="2">
        {/* Output */}
        <Output formValue={output} />
      </TabPane>
    </Tabs>
  );
};

export default MainLayout;
