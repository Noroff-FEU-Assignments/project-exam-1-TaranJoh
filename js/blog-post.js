import { displayError } from "./components/error.js";

const container = document.querySelector(".book-review");
const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts/";
const productUrl = url + id;

// fetches book review details
export async function getDetails() {
  try {
    const response = await fetch(productUrl);
    const review = await response.json();
    console.log(review);

    title.innerHTML += ` ${review.title.rendered}`;

    createHtml(review);
  } catch (error) {
    container.innerHTML = displayError("An error occurred when calling the API");
  }
}

function createHtml(review) {
  container.innerHTML = `<h2>${review.title.rendered}</h2>
                        <div class="blog-subheader"><h3> by </h3>
                        <p class="date">${review.date}</p></div>
                        <hr class="line" />
                        ${review.content.rendered}`;
}

getDetails();
