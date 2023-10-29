import { useEffect } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  Form,
  Pagination,
  Space,
  Table,
} from "antd";
import useAuth from "../store/auth";
import { LIMIT } from "../constants";
import useSkill from "../store/skill";
import Skill from "../types/skill";
import type { ColumnsType } from "antd/es/table";
import request from "../server";

const CRUDPage = () => {
  const user = useAuth((state) => state.user);
  const skills = useSkill((state) => state.skills);
  const loading = useSkill((state) => state.loading);
  const total = useSkill((state) => state.total);
  const page = useSkill((state) => state.page);
  const isModalOpen = useSkill((state) => state.isModalOpen);
  const getSkills = useSkill((state) => state.getSkills);
  const setPage = useSkill((state) => state.setPage);
  const showModal = useSkill((state) => state.showModal);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = form.validateFields();
    await request.post("skills", values);
    getSkills();
    form.resetFields();
  };

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const columns: ColumnsType<Skill> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>User Id: {user?._id}</h1>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Skills ({total})</h1>
            <Input
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={showModal} type="dashed">
              Add skill
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={skills}
        columns={columns}
      />

      <Pagination
        total={total}
        pageSize={LIMIT}
        current={page}
        onChange={(page) => setPage(page)}
      />
      <Modal
        title="Category data"
        maskClosable={false}
        // confirmLoading={isModalLoading}
        // okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        // onCancel={closeModal}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item<Skill>
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Skill>
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CRUDPage;
