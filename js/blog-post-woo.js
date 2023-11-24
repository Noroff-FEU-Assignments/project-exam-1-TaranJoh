import { displayError } from "./components/error.js";

const container = document.querySelector(".book-review");
const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://chapterandverse.taranj.no/wp-json/wc/store/products/";
const productUrl = url + id;

// fetches book review details
export async function getDetails() {
  try {
    const response = await fetch(productUrl);
    const review = await response.json();
    console.log(review);

    title.innerHTML += ` ${review.name}`;

    createHtml(review);
  } catch (error) {
    container.innerHTML = displayError("An error occurred when calling the API");
  }
}

function createHtml(review) {
  container.innerHTML = `<h2>${review.name}</h2>
                        <div class="blog-subheader"><h3>${review.attributes[1].terms[0].name} by ${review.attributes[0].terms[0].name}</h3>
                        <p class="date">date</p></div>
                        <hr class="line" />
                        <img src="${review.images[2].src}">
                        <p>${review.description}</p>`;
}

getDetails();
