import React from "react";
import { Layout, Space } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 48,
  paddingInline: 50,
  lineHeight: "48px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "#fefefe",
};

const Layouts: React.FC = () => (
  <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        <Outlet></Outlet>
      </Content>
    </Layout>
  </Space>
);

export default Layouts;
