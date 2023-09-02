import { Comment, Post } from "@/types/general";
import {
  Avatar,
  Divider,
  Group,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { CommentBox } from "./CommentBox";

export function PostDetails({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) {
  return (
    <Paper shadow="xs" p="lg">
      <Title order={3}>{post.title}</Title>
      <Space h="sm" />
      <Text>{post.body}</Text>
      <Group spacing="xs" mt="md" noWrap sx={{ cursor: "pointer" }}>
        <Avatar size={20} />
        <Text size="xs">Author {post.userId}</Text>
      </Group>
      <Divider my="lg" />
      <Title order={4}>Comments</Title>
      <Space h="sm" />
      {comments?.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentBox comment={comment} />
          <Space h="sm" />
        </React.Fragment>
      ))}
    </Paper>
  );
}
