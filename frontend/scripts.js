let productList =[];
let carrito = [];
let total = 0 ;
let order = {
    items:[]
}

function add(productId, price){

    const product = productList.find(p => p.id === productId);
    product.stock--;

    order.items.push(productList.find(p => p.id === productId))
    

    console.log(productId, price);
    carrito.push(productId);
    total = total+price;

    document.getElementById("checkout").innerHTML= `carrito $${total}` ;
    displayProducts();
}
async function showOrder(){
    document.getElementById("product-cards").style.display = "none";
    document.getElementById("order").style.display = "block";
    document.getElementById("order-total").innerHTML= `$${total}` ;

    let productsHTML = `
         <tr>
         <th>Cantidad</th>
         <th>detalle</th>
         <th>subtotal</th>
        </tr>`
    ;
    order.items.forEach(p => {
       
        productsHTML +=
    ` 
     <tr>
        <td>1</td>
        <td>${p.name}</td>
        <td>$${p.price}</td>
     </tr>`
   
    });
    
    document.getElementById('order-table').innerHTML = productsHTML;
}
    



async function pay(){
    const productList = await (await fetch("/api/pay",{
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
    //window.alert(products.join(",\n"));


carrito = [];
total = 0 ;
order = {
    items:[]
};
document.getElementById("checkout").innerHTML= `Carrito$${total}` ;
}
function displayProducts(){

    document.getElementById("product-cards").style.display = "flex";
    document.getElementById("order").style.display = "none";

    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML= ` <button class="button-add" onclick="add(${p.id}, ${p.price})">AGREGAR</button>`;

        if(p.stock <= 0){
            buttonHTML= ` <button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">sin stock</button>`;

        }

        productsHTML +=
    ` <div class="product-container">
       <h3>${p.name}</h3>
       <img src="${p.image}"/>
       <h2>$${p.price}</h2>
       ${buttonHTML}
  </div>`
   
    });
    document.getElementById('product-cards').innerHTML = productsHTML;
}

window.onload = async() =>{
    
    productList = await (await fetch("/api/products")).json();
    console.log(productList);
    displayProducts();
}