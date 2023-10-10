//catch input
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");

//to set btn update 1
let mode = "create";

//to use [i] in different function 1
let temp;

//get total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.background = "gray";
  } else {
    total.innerHTML = "";
    total.style.background = "";
  }
}

//product       storage
let products;
if (localStorage != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}
function create() {
  let cartona = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //to set btn update 3 important
  if (mode === "create") {
    //to set count of products
    if (cartona.count > 1) {
      for (let i = 0; i < cartona.count; i++) {
        products.push(cartona);
      }
    } else {
      products.push(cartona);
    }
  } else {
    products[temp] = cartona; //important
    mode = "create";
    submit.innerHTML = "CREATE";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(products));
  clearInputs();
  showData();
}

//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
function showData() {
  //to set total advanced
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `<tr class="p-5">
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</th>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button type="button" id="update"
                onClick ="updateProduct(${i})"
                style=" background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                class="bg-gradient-to-r p-0 from-gray-600 to-gray-400 rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                update
            </button>
        </th>
        <td>
            <button type="button" id="delete" onClick = "deletePRoduct(${i})"
                style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                class="p-0 bg-gradient-to-r from-red-600 to-red-400 rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                delete </button>
        </th>
    </tr>`;
  }
  document.querySelector("#tbody").innerHTML = table;
  //to show btn to delete all
  let btnDelete = document.querySelector("#deleteAll");
  if (products.length > 0) {
    btnDelete.innerHTML = ` <button onClick="deleteAll()" type="button"
        style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
        class="h-12 mt-6 w-full bg-gradient-to-r from-gray-600 to-gray-400 ml-2 rounded  px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
        Delete All (${products.length})
    </button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete
function deletePRoduct(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

//delete All
function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

//update
function updateProduct(i) {
  console.log(i);
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  getTotal();
  category.value = products[i].category;
  count.style = "none";
  submit.innerHTML = "Update";
  //to set btn update 2
  mode = "update";

  //to use [i] in different function 1
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search create mode: search by name & search by category
let searchMode = "title";
function getSearchMode(id) {
  //id to cath btn
  let search = document.querySelector("#Search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = '';
  showData();
}

//search
function searchProduct(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `<tr class="p-5">
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</th>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button type="button" id="update"
                onClick ="updateProduct(${i})"
                style=" background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                class="bg-gradient-to-r p-0 from-gray-600 to-gray-400 rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                update
            </button>
          </th>
          <td>
              <button type="button" id="delete" onClick = "deletePRoduct(${i})"
                  style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                  class="p-0 bg-gradient-to-r  from-gray-600 to-gray-400  rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                  delete </button>
          </th>
        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `<tr class="p-5">
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</th>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button type="button" id="update"
                onClick ="updateProduct(${i})"
                style=" background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                class="bg-gradient-to-r p-0 from-gray-600 to-gray-400 rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                update
            </button>
          </th>
          <td>
              <button type="button" id="delete" onClick = "deletePRoduct(${i})"
                  style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;"
                  class="p-0 bg-gradient-to-r from-red-600 to-red-400 rounded px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  ">
                  delete </button>
          </th>
        </tr>`;
      }
    }
  }
  document.querySelector("#tbody").innerHTML = table;
}
