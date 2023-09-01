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
    div.classList = `flex justify-between`;
    div.innerHTML = `
    <button
    onclick="handleCategoryDetails('${category.category_id}')"
    class="capitalize rounded font-semibold bg-[#25252533] active:bg-[#dc2626] active:text-white pt-[7px] pb-[7px] pr-[20px] pl-[20px] mr-8"
  >
    ${category.category}
  </button>
    
    `;
    categoryContainer.appendChild(div);
  });
};

///////////////////////////////////////////////////
//load category details info
let globalData;
const handleCategoryDetails = async (id) => {
  // console.log(id);
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
        <div class="card bg-base-100 shadow-xl mt-7">
        <figure>
          <img class="w-[340px] h-[200px] rounded-lg relative" src="${
            items.thumbnail
          }" alt="Shoes" />
        </figure>
        <div>
        <h2 class="bg-black text-white w-[200px] ml-[240px] absolute top-[170px] right-3 text-center rounded">${
          items.others.posted_date
            ? hours + " hrs " + mins + " min " + " ago "
            : ""
        }</h2>
        </div>
        <div class="card-body">
          <div class="flex justify-center gap-3 mt-4">
            <img
              class="w-[40px] h-[40px] rounded-full"
              src="${items.authors[0].profile_picture}"
              alt="Shoes"
            />
            <h2 class="card-title text-lg font-bold">
              ${items.title}
            </h2>
          </div>
          <div class="flex w-[180px]">
            <p class="ml-[47px]">${items.authors[0].profile_name}</p>
            <div>
            ${
              items.authors[0].verified
                ? '<img class="w-[20px] h-[20px] mt-1" src="/images/tic.svg"}"/>'
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
      <div class="card bg-base-100 shadow-xl mt-7">
        <figure>
          <img class="w-[340px] h-[200px] rounded-lg relative" src="${
            items.thumbnail
          }" alt="Shoes" />
        </figure>
        <div>
          <h2 class="bg-black text-white w-[200px] ml-[240px] absolute top-[170px] right-3 text-center rounded">${
            items.others.posted_date
              ? hours + " hrs " + mins + " min " + " ago "
              : ""
          }</h2>
        </div>
        <div class="card-body">
          <div class="flex justify-center gap-3 mt-4">
            <img
              class="w-[40px] h-[40px] rounded-full"
              src="${items.authors[0].profile_picture}"
              alt="Shoes"
            />
            <h2 class="card-title text-lg font-bold">
              ${items.title}
            </h2>
          </div>
          <div class="flex w-[180px]">
            <p class="ml-[47px]">${items.authors[0].profile_name}</p>
            <div>
              ${
                items.authors[0].verified
                  ? '<img class="w-[20px] h-[20px] mt-1" src="/images/tic.svg"/>'
                  : ""
              }
            </div>
          </div>
          <h3 class="ml-[47px]">${items.others.views} views</h3>
        </div>
      </div>
    `;
    // Append the div to the card container
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
