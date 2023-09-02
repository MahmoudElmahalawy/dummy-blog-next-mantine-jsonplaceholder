import { PostDetails } from "@/components/PostDetails";
import { getPostById, getPosts } from "@/services/general";
import { Comment, Post } from "@/types/general";
import { Center, Container, Loader, Title } from "@mantine/core";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  post: Post;
  comments: Comment[];
}> = async ({ params }) => {
  const data = await getPostById(params?.id);

  if (!data.post) return { notFound: true };
  return { props: { post: data.post, comments: data.comments } };
};

export default function PostPage({
  post,
  comments,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>{`Post ${post.id}`}</title>
      </Head>
      <Container size="50rem">
        <Title order={2} mb={20}>
          Post {post.id}
        </Title>
        <PostDetails post={post} comments={comments} />
      </Container>
    </>
  );
}
