export async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
}

export async function getPostById(id: string | string[] | undefined) {
  const postsRes = await fetch(
    "https://jsonplaceholder.typicode.com/posts?id=" + id
  );
  const commentsRes = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=" + id
  );
  const posts = await postsRes.json();
  const comments = await commentsRes.json();

  return { post: posts[0], comments };
}

export async function createPost(
  title: string,
  author: string,
  content: string
) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body: content,
      userId: author,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
