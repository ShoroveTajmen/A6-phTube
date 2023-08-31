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
    console.log(category);
    //create a div
    const div = document.createElement("div");
    div.classList = `flex justify-between`
    div.innerHTML = `
    <button
    class="capitalize rounded font-semibold bg-[#25252533] pt-[7px] pb-[7px] pr-[20px] pl-[20px] mr-8"
  >
    ${category.category}
  </button>
    
    `;
    categoryContainer.appendChild(div);
  });
};
handleCategory();
