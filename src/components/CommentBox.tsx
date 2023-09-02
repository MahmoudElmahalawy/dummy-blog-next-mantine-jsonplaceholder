import { Comment } from "@/types/general";
import {
  Avatar,
  Group,
  Paper,
  Text,
  TypographyStylesProvider,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentBoxProps {
  comment: Comment;
}

export function CommentBox({ comment }: CommentBoxProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar alt={comment.name} radius="xl" />
        <div>
          <Text fz="sm" c="blue" sx={{ cursor: "pointer" }}>
            {comment.name}
          </Text>
          <Text fz="xs" c="dimmed">
            {comment.email}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: comment.body }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}
