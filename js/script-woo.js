import { displayError } from "./components/error.js";

const url = "https://chapterandverse.taranj.no/wp-json/wc/store/products";

const latestPosts = document.querySelector(".latest-posts");

// fetches posts from wordpress
async function fetchAPI() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      latestPosts.innerHTML += `<div class="post-thumbnail"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i].images[0].src}">
                            <h3>"${posts[i].name}"</h3>
                            <p>${posts[i].attributes[1].terms[0].name}</p></div>`;
    }
  } catch {
    {
      latestPosts.innerHTML = displayError("An error occurred when calling the API");
    }
  }
}

fetchAPI();
