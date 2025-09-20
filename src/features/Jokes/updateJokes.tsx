import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ALL_JOKES_API } from "../../constants/JokesApi/jokesApi";
import { axiosInstance } from "../../lib/axios";
import { App, Input, Modal, Form, Button } from "antd";

interface jokeProps {
  jokeId: string | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}
export default function UpdateJokes({
  jokeId,
  isModalOpen,
  handleCloseModal,
}: jokeProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data, isLoading: isLoadingJoke } = useQuery({
    queryKey: ["jokes", jokeId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${ALL_JOKES_API}/${jokeId}`);
      form.setFieldsValue({ content: response.data.content });
      return response.data;
    },
    enabled: !!jokeId,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (updateJoke) => {
      const response = await axiosInstance.put(
        `${ALL_JOKES_API}/${jokeId}`,
        updateJoke
      );
      return response.data; // API call to add a new joke
    },
    onSuccess: () => {
      message.success("Joke update successfully");
      queryClient.invalidateQueries({ queryKey: ["jokes"] });
      handleCloseModal();
      form.resetFields();
    },
    onError: () => {
      message.error("Failed to update joke");
    },
  });

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCloseModal}
      loading={isLoadingJoke}
      footer={null}
      title="Update Joke"
    >
      <Form
        form={form}
        name="updateJoke"
        layout="vertical"
        onFinish={(values) => mutate(values)}
      >
        <Form.Item
          label="Joke Content"
          name="content"
          rules={[{ required: true, message: "Please enter the joke content" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Update Joke
        </Button>
      </Form>
    </Modal>
  );
}
