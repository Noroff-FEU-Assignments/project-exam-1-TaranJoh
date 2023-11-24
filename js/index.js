import { displayError } from "./components/error.js";

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts?_embed";

const latestPosts = document.querySelector(".latest-posts");

// fetches posts from wordpress
async function fetchAPI() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      latestPosts.innerHTML += `<div class="post-thumbnail"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}">
                            <h3>"${posts[i].title.rendered}"</h3>
                            <p>Name of book</p></div>`;
    }
  } catch {
    {
      latestPosts.innerHTML = displayError("An error occurred when calling the API");
    }
  }
}

fetchAPI();
