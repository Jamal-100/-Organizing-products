// get total
// create product
// save localstorage
//clear data
//read
//count
//delete
//update
// search
//clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let conut = document.getElementById("conut");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searchin = document.getElementById("search");
let searchTitle = document.getElementById("serchTitle");
let searchCategory = document.getElementById("searchCategory");
let mood = "create";
let tmp;

// تعديل التوتل
function gettotal() {
  if (price.value != "") {
    var sub = +price.value + +texes.value + +ads.value - +discount.value;
    total.innerHTML = sub;
    total.style.background = "rgb(14, 94, 47)";
  } else {
    total.innerHTML = "";
    total.style.background = "#550000";
  }
}
// انهاء تعديل
let datastorge;
if (localStorage.product != null) {
  datastorge = JSON.parse(localStorage.product);
} else {
  datastorge = [];
}
let nmber = 0;

function create() {
  gettotal();
  let data = {
    title: title.value.toLowerCase(),
    price: price.value,
    texes: texes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    conut: conut.value,
    category: category.value.toLowerCase(),
  };


  if (mood == "create") {
    if (data.conut > 1) {
      for (i = 0; i < data.conut; i++) {
        datastorge.push(data);
      }
    } else {
      datastorge.push(data);
    }


  } else {
    datastorge[tmp] = data;
    conut.style.display = "block";
    submit.innerHTML = "create";
    mood = "create";
  }

  localStorage.setItem("product", JSON.stringify(datastorge));

  showdata();
  cleardata();
}

function showdata() {
  gettotal();
  document.getElementById("table").innerHTML = "";
  for (i = 1; i < datastorge.length; i++) {


    let body = `
        <tr>
        <td>${i}</td>
        <td>${datastorge[i].title}</td>
        <td>${datastorge[i].price}</td>
        <td>${datastorge[i].texes}</td>
        <td>${datastorge[i].ads}</td>
        <td>${datastorge[i].discount}</td>
        <td>${datastorge[i].total}</td>
        <td>${datastorge[i].category}</td>
        <td><button  onclick=update(${i}) id="update">update</button></td>
        <td><button onclick=deletedata(${i}) id="delate">delate</button></td>
      </tr>
         `;

         
    document.getElementById("table").innerHTML += body;
    // nmber = nmber+1
  }
  let divdelete = document.getElementById("deleteall");

  if (datastorge.length > 0) {
    divdelete.innerHTML = `
         
         <button onclick=deleteall() >delate all (${datastorge.length})</button>
         `;
  } else {
    divdelete.innerHTML = "";
  }
}

function cleardata() {
  (title.value = ""),
    (price.value = ""),
    (texes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (category.value = ""),
    (conut.value = "");
}

showdata();

function deletedata(i) {
  datastorge.splice(i, 1);
  localStorage.product = JSON.stringify(datastorge);
  showdata();
}

function deleteall() {
  localStorage.clear();
  datastorge.splice(0);
  showdata();
}

function update(i) {
  title.value = datastorge[i].title;
  price.value = datastorge[i].price;
  texes.value = datastorge[i].texes;
  ads.value = datastorge[i].ads;
  discount.value = datastorge[i].discount;
  category.value = datastorge[i].category;
  conut.style.display = "none";
  submit.innerHTML = "update";
  gettotal();
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let moodsarch = "serchTitle";
function search(id) {
  if (id == "serchTitle") {
    moodsarch = "serchTitle";
    searchin.placeholder = "search By Title";
  } else {
    moodsarch = "searchCategory";
    searchin.placeholder = "search By category";
  }
  searchin.focus();
  console.log(moodsarch);
  searchin.value = "";
  showdata();
}

function searchwhit(value) {
  let boo = "";
  if (moodsarch == "serchTitle") {
    for (i = 0; i < datastorge.length; i++) {
      if (datastorge[i].title.toLowerCase().includes(value.toLowerCase())) {
        let body = `
                  <tr>
                  <td>${i}</td>
                  <td>${datastorge[i].title.toLowerCase()}</td>
                  <td>${datastorge[i].price}</td>
                  <td>${datastorge[i].texes}</td>
                  <td>${datastorge[i].ads}</td>
                  <td>${datastorge[i].discount}</td>
                  <td>${datastorge[i].total}</td>
                  <td>${datastorge[i].category}</td>
                  <td><button  onclick=update(${i}) id="update">update</button></td>
                  <td><button onclick=deletedata(${i}) id="delate">delate</button></td>
                </tr>
                   `;
        boo += body;
      }
    }
  } else {
    for (i = 0; i < datastorge.length; i++) {
      if (datastorge[i].category.includes(value.toLowerCase())) {
        let body = `
            <tr>
            <td>${i}</td>
            <td>${datastorge[i].title}</td>
            <td>${datastorge[i].price}</td>
            <td>${datastorge[i].texes}</td>
            <td>${datastorge[i].ads}</td>
            <td>${datastorge[i].discount}</td>
            <td>${datastorge[i].total}</td>
            <td>${datastorge[i].category}</td>
            <td><button  onclick=update(${i}) id="update">update</button></td>
            <td><button onclick=deletedata(${i}) id="delate">delate</button></td>
          </tr>
             `;
        boo += body;
      }
    }
  }

  document.getElementById("table").innerHTML = boo;
}
