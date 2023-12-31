// Define a variable to keep track of the currently active button
let currentActiveButton = null;

const handleCategory = async () => {
  //fetch data from server
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  //trim data
  const trimeData = data.data;
  //console.log(trimeData);
  //get the category container element
  const categoryContainer = document.getElementById("category-container");
  //using forEach loop to accessing the all category
  trimeData.forEach((category) => {
    // console.log(category);
    //create a div
    const div = document.createElement("div");
    div.classList = `flex flex-row justify-center md:justify-between`;
    // Add a unique identifier to each button
    const buttonId = `category-btn-${category.category_id}`;
    div.innerHTML = `
    <button
    id = "category-btn"
    onclick="handleCategoryDetails('${category.category_id}')"
    class="capitalize rounded font-semibold  pt-[7px] pb-[7px] lg:pr-[20px] lg:pl-[20px] md:pr-[20px] md:pl-[20px] pr-[7px] pl-[7px] mr-4 md:mr-8 bg-[#25252533]"
  >
    ${category.category}
  </button>   
    `;
    categoryContainer.appendChild(div);

    // Add a click event listener to each button
    const button = div.querySelector("button");
    button.addEventListener("click", function () {
      // Remove "active" class from the previously active button
      if (currentActiveButton) {
        currentActiveButton.classList.remove("bg-red-500", "text-white");
      }

      // Add "active" class to the clicked button
      this.classList.add("bg-red-500", "text-white");

      // Update the currently active button
      currentActiveButton = this;

      // Update the content based on the selected category
      handleCategoryDetails(category.category_id);
    });
  });
};

///////////////////////////////////////////////////
//load category details info
let globalData;
const handleCategoryDetails = async (id) => {
  console.log(id);
  //fetch category details
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const dataa = data.data;
  globalData = data.data;
  // console.log(dataa);

  //get card-container element
  const cardContainer = document.getElementById("card-container");
  const notFouundContainer = document.getElementById("notFouund-container");
  notFouundContainer.textContent = "";
  cardContainer.textContent = "";

  if (dataa.length > 0) {
    //use forEach loop to accessing all categories values
    dataa.forEach((items) => {
      let second = items.others.posted_date;
      let hours = Math.floor(second / 3600);
      let mins = Math.floor((second % 3600) / 60);

      //create div
      const div = document.createElement("div");
      div.innerHTML = `  
        <div class="card bg-base-100 mt-7 ">
        <figure>
          <img class=" w-[420px] h-[250px] rounded-lg relative" src="${
            items.thumbnail
          }" alt="Shoes" />
        </figure>
        <div>
        <h2 class="bg-black text-white w-[200px] md:w-[200px] md:ml-[240px] absolute top-[220px] lg:top-[220px] md:top-[220px] right-3 lg:right-3 md:right-[150px] text-center rounded text-l md:text-sm">${
          items.others.posted_date
            ? hours + " hrs " + mins + " min " + " ago "
            : ""
        }</h2>
        </div>
        <div class="card-body md:ml-[100px] lg:ml-0">
          <div class="flex lg:justify-start gap-3 mt-0 md:mt-4">
            <img
              class="w-[40px] h-[40px] rounded-full"
              src="${items.authors[0].profile_picture}"
              alt="Shoes"
            />
            <h2 class="card-title text-lg font-bold">
              ${items.title}
            </h2>
          </div>
          <div class="flex  w-[185px] gap-1">
            <p class="ml-[47px] flex-grow-0">${
              items.authors[0].profile_name
            }</p>
            <div>
            ${
              items.authors[0].verified
                ? '<img class="mt-1" src="/images/ticc.svg"}"/>'
                : ""
            }
            </div>          
          </div>
          <h3 class="ml-[47px]">${items.others.views} views</h3>
        </div>
      </div>       
        `;
      //append child
      cardContainer.appendChild(div);
    });
  } else {
    //create div
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex flex-col items-center justify-center mt-[120px]">
    <img class="w-[120px] h-[120px]" src="/images/Icon.png" alt="" />
    <h2 class="text-5xl font-bold text-center mt-8">
      Oops!! Sorry, There is no <br />
      content here
    </h2>
  </div>
    `;
    notFouundContainer.appendChild(div);
  }
};

/////////////////////////////////////////
//short bu view function
const shortByView = () => {
  // console.log(globalData);
  //sorting by views
  globalData.sort(
    (a, b) => parseInt(b.others.views) - parseInt(a.others.views)
  );

  // rendering the sorted items
  const cardContainer = document.getElementById("card-container");
  // Clear the card container
  cardContainer.textContent = "";

  globalData.forEach((items) => {
    let second = items.others.posted_date;
    let hours = Math.floor(second / 3600);
    let mins = Math.floor((second % 3600) / 60);

    // Create div
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 mt-7 ">
    <figure>
      <img class=" w-[420px] h-[250px] rounded-lg relative" src="${
        items.thumbnail
      }" alt="Shoes" />
    </figure>
    <div>
    <h2 class="bg-black text-white w-[200px] md:w-[200px] md:ml-[240px] absolute top-[220px] lg:top-[220px] md:top-[220px] right-3 lg:right-3 md:right-[150px]  text-center rounded text-l md:text-sm">${
      items.others.posted_date ? hours + " hrs " + mins + " min " + " ago " : ""
    }</h2>
    </div>
    <div class="card-body md:ml-[100px] lg:ml-0">
      <div class="flex lg:justify-start gap-3 mt-0 md:mt-4">
        <img
          class="w-[40px] h-[40px] rounded-full"
          src="${items.authors[0].profile_picture}"
          alt="Shoes"
        />
        <h2 class="card-title text-lg font-bold">
          ${items.title}
        </h2>
      </div>
      <div class="flex  w-[185px] gap-1">
        <p class="ml-[47px] flex-grow-0">${items.authors[0].profile_name}</p>
        <div>
        ${
          items.authors[0].verified
            ? '<img class="mt-1" src="/images/ticc.svg"}"/>'
            : ""
        }
        </div>          
      </div>
      <h3 class="ml-[47px]">${items.others.views} views</h3>
    </div>
  </div>       
    `;
    //append child
    cardContainer.appendChild(div);
  });
};

handleCategory();
handleCategoryDetails(1000);

/////////////////////////////////////////
// connect the blog file
const blog = () => {
  window.open("blog.html", "_blank");
};
