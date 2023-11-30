import { displayError } from "./components/error.js";

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts?_embed=wp:term,wp:featuredmedia&per_page=100";

const bookReviews = document.querySelector(".book-reviews");

// fetches all posts from wordpress
// async function fetchAPI() {
//   try {
//     const response = await fetch(url);
//     const posts = await response.json();

//     console.log(posts);

//     for (let i = 0; i < posts.length; i++) {
//       bookReviews.innerHTML += `<div class="blog-list-post"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="Book cover for ${posts[i]._embedded["wp:term"][1][0].name}">
//                             <h3>"${posts[i].title.rendered}"</h3>
//                             <p class="title-author">${posts[i]._embedded["wp:term"][1][0].name} by ${posts[i]._embedded["wp:term"][0][0].name}</p></div>`;

//       // hides posts after 9
//       if (i > 8) {
//         const hiddenPosts = document.querySelectorAll(".blog-list-post:nth-child(n+10)");
//         hiddenPosts.forEach((element, index) => {
//           element.style.display = "none";
//         });
//       }

//       //function that shows more results underneath when button is clicked
//       const loadMore = document.querySelector(".more-reviews-btn");
//       const allPosts = document.querySelectorAll(".blog-list-post");
//       let currentItems = 9;

//       loadMore.addEventListener("click", (e) => {
//         for (let i = currentItems; i < currentItems + 9; i++) {
//           if (allPosts[i]) {
//             allPosts[i].style.display = "block";
//           }
//         }
//         currentItems += 9;
//       });
//     }
//   } catch {
//     {
//       bookReviews.innerHTML = displayError("An error occurred when calling the API");
//     }
//   }
// }

// fetchAPI();

// fetches all posts from wordpress
async function fetchAPI() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      bookReviews.innerHTML += `<div class="blog-list-post"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="Book cover for ${posts[i]._embedded["wp:term"][1][0].name}">
                            <h3>"${posts[i].title.rendered}"</h3>
                            <p class="title-author">${posts[i]._embedded["wp:term"][1][0].name} by ${posts[i]._embedded["wp:term"][0][0].name}</p></div>`;
    }

    // function that shows more results underneath when button is clicked
    const loadMore = document.querySelector(".more-reviews-btn");
    const allPosts = document.querySelectorAll(".blog-list-post");
    const screenWidth = window.innerWidth;
    let currentItems = 9;

    loadMore.addEventListener("click", (e) => {
      // checks if screen is bigger than 800 pixels
      if (screenWidth > 800) {
        // checks if there are more posts and makes 9 posts visible at a time
        for (let i = currentItems; i < currentItems + 9; i++) {
          if (allPosts[i]) {
            allPosts[i].style.display = "block";
          }
        }

        // hides button when all posts are shown
        if (currentItems + 9 >= allPosts.length) {
          loadMore.style.display = "none";
        }

        currentItems += 9;
      } else {
        for (let i = currentItems; i < currentItems + 10; i++) {
          if (allPosts[i]) {
            allPosts[i].style.display = "block";
          }
        }

        if (currentItems + 10 >= allPosts.length) {
          loadMore.style.display = "none";
        }

        currentItems += 10;
      }
    });

    // hides all posts after the 9th in the API for big screens, and after the 10th for small screens
    const hiddenPosts = document.querySelectorAll(".blog-list-post:nth-child(n+10)");
    const hiddenPostsSmall = document.querySelectorAll(".blog-list-post:nth-child(n+11)");

    if (screenWidth > 800) {
      hiddenPosts.forEach((element) => {
        element.style.display = "none";
      });
    } else {
      hiddenPostsSmall.forEach((element) => {
        element.style.display = "none";
      });
    }
  } catch {
    bookReviews.innerHTML = displayError("An error occurred when calling the API");
  }
}

fetchAPI();
