import { displayError } from "./components/error.js";

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts?_embed";

const bookReviews = document.querySelector(".book-reviews");

// fetches posts from wordpress
async function fetchAPI() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      if (i === 12) {
        break;
      } else {
        bookReviews.innerHTML += `<div class="blog-list-post"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="Book cover for ${posts[i]._embedded["wp:term"][1][0].name}">
                            <h3>"${posts[i].title.rendered}"</h3>
                            <p class="title-author">${posts[i]._embedded["wp:term"][1][0].name} by ${posts[i]._embedded["wp:term"][0][0].name}</p></div>`;
      }
    }
  } catch {
    {
      bookReviews.innerHTML = displayError("An error occurred when calling the API");
    }
  }
}

fetchAPI();
