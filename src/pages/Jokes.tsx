/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Table } from "antd";
import { axiosInstance } from "../lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "antd/es/alert/Alert";
import { useState } from "react";
import { ALL_JOKES_API, MY_JOKE_API } from "../constants/JokesApi/jokesApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { App } from "antd";
import UpdateJokes from "../features/Jokes/updateJokes";
import AddJoke from "../features/Jokes/addJoke";
export default function Jokes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jokeId, setJokeId] = useState(null);
  const [openAddJoke, setOpenAddJoke] = useState(false);
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jokes"],
    queryFn: async () => {
      const response = await axiosInstance.get(MY_JOKE_API);
      return response.data;
    },
  });
  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load jokes."
        type="error"
        showIcon
      />
    );
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${ALL_JOKES_API}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Joke deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jokes"] });
    },
    onError() {
      message.error("Something went wrong");
    },
  });
  const dataSource = data;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: ( record: any) => (
        <Flex gap={4} align="center">
          <Button
            shape="circle"
            onClick={() => {
              setJokeId(record._id);
              handleOpenModal();
            }}
            icon={<EditOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => mutate(record._id)}
            loading={isPending}
            icon={<DeleteOutlined />}
          />
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setOpenAddJoke(true)}>
        Add New Joke
      </Button>
      <Table dataSource={dataSource} columns={columns} loading={isLoading} />;
      <UpdateJokes
        jokeId={jokeId}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <AddJoke
        openAddJoke={openAddJoke}
        handleCloseAddJoke={() => setOpenAddJoke(false)}
      />
    </div>
  );
}
