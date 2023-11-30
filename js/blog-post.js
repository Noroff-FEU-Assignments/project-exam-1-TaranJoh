import { displayError } from "./components/error.js";

const container = document.querySelector(".book-review");
const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts/";
const postUrl = url + id + "?_embed";
const embedUrl = url + "?_embed";

export async function getDetails() {
  try {
    const response = await fetch(postUrl);
    const review = await response.json();
    console.log(review);

    title.innerHTML += ` ${review.title.rendered}`;

    const newDate = new Date(review.date);
    const date = newDate.toLocaleDateString("en-GB");

    const parser = new DOMParser();
    const contentDOM = parser.parseFromString(review.content.rendered, "text/html");

    // Accessing images in the parsed content
    const imagesInContent = contentDOM.querySelectorAll("img");

    // Adding a class to each image found in the content
    imagesInContent.forEach((image) => {
      image.classList.add("modal-trigger");
    });

    // Convert the modified content back to HTML string
    const modifiedContent = contentDOM.body.innerHTML;

    container.innerHTML = `<h2>${review.title.rendered}</h2>
                        <div class="blog-subheader"><h3>${review._embedded["wp:term"][1][0].name} by ${review._embedded["wp:term"][0][0].name} </h3>
                        <p id="date">${date}</p></div>
                        <hr class="line" />
                        ${modifiedContent}`;

    // Makes modal of images appear on click
    const popupImages = container.querySelectorAll(".modal-trigger");

    popupImages.forEach((image) => {
      image.addEventListener("click", function () {
        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("popup-image");

        modal.style.display = "block";
        modalImg.src = this.src;

        const closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.addEventListener("click", function () {
          modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
      });
    });
  } catch (error) {
    container.innerHTML = displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
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
      sidebar.innerHTML = displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    }
  }
}

createSidebar();
