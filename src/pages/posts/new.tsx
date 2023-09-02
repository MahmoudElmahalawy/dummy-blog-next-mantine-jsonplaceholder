import { NewPostForm } from "@/components/NewPostForm";
import { Container, Title } from "@mantine/core";
import Head from "next/head";

export default function NewPostPage() {
  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>
      <Container size="50rem">
        <Title order={2} mb={20}>
          New Post
        </Title>
        <NewPostForm />
      </Container>
    </>
  );
}
