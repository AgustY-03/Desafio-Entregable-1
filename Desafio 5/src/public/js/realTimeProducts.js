const socket = io();
const srvResponse = document.getElementById("srvResponse");
const btnAddProduct = document.getElementById("btnAddProduct");
const btnDeleteProduct = document.getElementById("btnDeleteProduct");

socket.on("realTimeProducts", (data) => {
  let html = `<table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody id="products">`;

  data.forEach((prod) => {
    html += `<tr>
              <td>${prod._id}</td>
              <td>${prod.title}</td>
              <td><img src="${prod.thumbnails}" alt="" width="100px" /></td>
              <td>${prod.description}</td>
              <td>$ ${prod.price}</td>
            </tr>`;
  });
  html += `</tbody></table>`;
  srvResponse.innerHTML = html;
});

const addProduct = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const thumbnails = document.getElementById("thumbnails").value;
  const product = {
    title: title,
    description: description,
    price: price,
    code: code,
    thumbnails: [thumbnails],
  };
  socket.emit("newProduct", product);
  // Limpio los campos
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("code").value = "";
  document.getElementById("thumbnails").value = "";
};

btnAddProduct.onclick = addProduct;

const deleteProduct = () => {
  const idProduct = document.getElementById("inputDeleteId").value;
  socket.emit("deleteProduct", idProduct);
  document.getElementById("inputDeleteId").value = "";
};

btnDeleteProduct.onclick = deleteProduct;
