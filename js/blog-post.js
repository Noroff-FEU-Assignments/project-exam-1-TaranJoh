import { displayError } from "./components/error.js";

const container = document.querySelector(".book-review");
const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts/";
const postUrl = url + id + "?_embed";
const embedUrl = url + "?_embed";

// fetches the API and creates new html for a single post
export async function getDetails() {
  try {
    const response = await fetch(postUrl);
    const review = await response.json();
    console.log(review);

    title.innerHTML += ` ${review.title.rendered}`;

    const newDate = new Date(review.date);
    const date = newDate.toLocaleDateString("en-GB");

    container.innerHTML = `<h2>${review.title.rendered}</h2>
                        <div class="blog-subheader"><h3>${review._embedded["wp:term"][1][0].name} by ${review._embedded["wp:term"][0][0].name} </h3>
                        <p id="date">${date}</p></div>
                        <hr class="line" />
                        ${review.content.rendered}`;
  } catch (error) {
    container.innerHTML = displayError("An error occurred when calling the API");
  }
}

getDetails();

const sidebar = document.querySelector(".sidebar-posts");

// fetches the API and creates thumbnails for the sidebar
async function createSidebar() {
  try {
    const response = await fetch(embedUrl);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      if (i === 4) {
        break;
      } else {
        sidebar.innerHTML += `<a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="Book cover for ${posts[i]._embedded["wp:term"][1][0].name}" id="sidebar-thumbnail">`;
      }
    }
  } catch {
    {
      sidebar.innerHTML = displayError("An error occurred when calling the API");
    }
  }
}

createSidebar();
