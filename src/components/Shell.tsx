import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  Header,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export function Shell(props: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <Container>
            <Group position="apart" mt="md" mb="xs">
              <Link href="/">
                <Text c="blue" sx={{ userSelect: "none", cursor: "pointer" }}>
                  Blog
                </Text>
              </Link>
              <Link href="/posts/new">
                <Tooltip label="Add Post" withArrow>
                  <ActionIcon variant="light">
                    <IconPlus size="1rem" />
                  </ActionIcon>
                </Tooltip>
              </Link>
            </Group>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      {props.children}
    </AppShell>
  );
}
