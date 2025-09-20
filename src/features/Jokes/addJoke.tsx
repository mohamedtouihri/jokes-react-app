import { App, Button, Form, Input, Modal } from "antd";
import { axiosInstance } from "../../lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_JOKES_API } from "../../constants/JokesApi/jokesApi";

interface addJokeProps {
  openAddJoke: boolean;
  handleCloseAddJoke: () => void;
}
export default function AddJoke({
  openAddJoke,
  handleCloseAddJoke,
}: addJokeProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (newJoke) => {
      const response = await axiosInstance.post(ALL_JOKES_API, newJoke);
      return response.data; // API call to add a new joke
    },
    onSuccess: () => {
      message.success("Joke added successfully");
      handleCloseAddJoke();
      queryClient.invalidateQueries({ queryKey: ["jokes"] });

      form.resetFields();
    },
    onError: () => {
      message.error("Failed to add joke");
    },
  });
  return (
    <>
      <Modal
        open={openAddJoke}
        onCancel={handleCloseAddJoke}
        footer={null}
        title="Add New Joke"
      >
        <Form
          form={form}
          name="addJoke"
          layout="vertical"
          onFinish={(values) => mutate(values)}
        >
          <Form.Item
            label="Joke Content"
            name="content"
            rules={[
              { required: true, message: "Please enter the joke content" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Add Joke
          </Button>
        </Form>
      </Modal>
    </>
  );
}
