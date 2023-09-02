import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/services/general";
import { Post } from "@/types/general";
import { Center, Container, Space, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

export default function HomePage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: posts,
  });

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container size="50rem">
          {!posts?.length ? (
            <Center>
              <Text>No posts</Text>
            </Center>
          ) : (
            <>
              <Title order={2} mb={20}>
                Blog Posts
              </Title>
              {data?.map((post: Post) => (
                <React.Fragment key={post.id}>
                  <PostCard post={post} />
                  <Space h="sm" />
                </React.Fragment>
              ))}
            </>
          )}
        </Container>
      </main>
    </>
  );
}
