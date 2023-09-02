import { Post } from "@/types/general";
import { Button, Card, Center, Group, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Group position="apart" mb="xs">
        <Text weight={500}>{post.title}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {post.body.slice(0, 60)}...
      </Text>
      <Center>
        <Link href={`/posts/${post.id}`}>
          <Button
            rightIcon={<IconExternalLink />}
            variant="light"
            color="blue"
            mt="md"
            radius="md"
          >
            Visit Post
          </Button>
        </Link>
      </Center>
    </Card>
  );
}
