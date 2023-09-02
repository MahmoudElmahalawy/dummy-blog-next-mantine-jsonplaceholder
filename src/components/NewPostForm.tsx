import { createPost } from "@/services/general";
import { NewPost } from "@/types/general";
import {
  Button,
  Loader,
  Paper,
  TextInput,
  Textarea,
  createStyles,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconEditCircle,
  IconExclamationMark,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Router from "next/router";
import * as Yup from "yup";

const useStyles = createStyles((theme) => ({
  invalid: { backgroundColor: theme.colors.red[0] },
  icon: { color: theme.colors.red[6] },
}));

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Post must have a title")
    .max(100, "Title is too long"),
  author: Yup.string().required("Author name required"),
  content: Yup.string()
    .required("Post cannot be empty")
    .min(50, "Post cannot be less than 50 characters long"),
});

export function NewPostForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content: "",
    },
    validationSchema,
    onSubmit: ({ title, author, content }) => {
      mutation.mutate({ title, author, content });
    },
  });
  const { classes } = useStyles();

  const mutation = useMutation({
    mutationFn: (newPost: NewPost) =>
      createPost(newPost.title, newPost.author, newPost.content),
    onSuccess,
    onError,
  });

  function onSuccess() {
    notifications.show({
      title: "Success",
      message: "Your post has been published!",
      color: "teal",
      icon: <IconCheck size="1.1rem" />,
    });
    Router.push("/");
  }

  function onError() {
    notifications.show({
      title: "Error",
      message: "Error publishing your post!",
      color: "red",
      icon: <IconExclamationMark size="1.1rem" />,
    });
  }

  return (
    <Paper shadow="xs" p="lg">
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id="title"
          name="title"
          label="Title"
          error={formik.touched.title && formik.errors.title}
          value={formik.values.title}
          onChange={formik.handleChange}
          classNames={{
            input:
              formik.touched.title && formik.errors.title
                ? classes.invalid
                : "",
          }}
          {...(formik.touched.title && formik.errors.title
            ? {
                rightSection: (
                  <IconAlertTriangle
                    stroke={1.5}
                    size="1.1rem"
                    className={classes.icon}
                  />
                ),
              }
            : null)}
        />
        <TextInput
          id="author"
          name="author"
          label="Author"
          error={formik.touched.author && formik.errors.author}
          value={formik.values.author}
          onChange={formik.handleChange}
          classNames={{
            input:
              formik.touched.author && formik.errors.author
                ? classes.invalid
                : "",
          }}
          {...(formik.touched.author && formik.errors.author
            ? {
                rightSection: (
                  <IconAlertTriangle
                    stroke={1.5}
                    size="1.1rem"
                    className={classes.icon}
                  />
                ),
              }
            : null)}
        />
        <Textarea
          id="content"
          name="content"
          label="Content"
          error={formik.touched.content && formik.errors.content}
          value={formik.values.content}
          onChange={formik.handleChange}
          autosize
          minRows={4}
          maxRows={4}
          classNames={{
            input:
              formik.touched.content && formik.errors.content
                ? classes.invalid
                : "",
          }}
          {...(formik.touched.content && formik.errors.content
            ? {
                rightSection: (
                  <IconAlertTriangle
                    stroke={1.5}
                    size="1.1rem"
                    className={classes.icon}
                  />
                ),
              }
            : null)}
        />
        <Button
          type="submit"
          leftIcon={
            mutation.isLoading ? (
              <Loader color="white" size="1rem" />
            ) : (
              <IconEditCircle size="1rem" />
            )
          }
          mt="sm"
        >
          Publish
        </Button>
      </form>
    </Paper>
  );
}
