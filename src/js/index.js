const filtro50 = document.getElementById('preco-1');
const filtro150 = document.getElementById('preco-2');
const filtro300 = document.getElementById('preco-3');
const filtro500 = document.getElementById('preco-4');
const filtro01 = document.getElementById('preco-5');
const filtrosCor = document.querySelectorAll('.filtro-cor');
const filtrosTamanho = document.querySelectorAll('.filtro-tamanho button');
const filtrosPreco = document.querySelectorAll('.filtro-Preco');

let filtroCor = '';
let filtroTamanho = '';
let filtroPreco = '';

filtrosCor.forEach(filtro => {
  filtro.addEventListener('change', e => {
    if (e.target.checked === true) {
      filtroCor = e.target.value;
      filtrar(filtroCor, filtroTamanho, filtroPreco);
    } else {
      if (filtroCor === e.target.value) {
        filtroCor = '';
        filtrar(filtroCor, filtroTamanho, filtroPreco);
      }
    }
  });
});

const filtrosDoCor = [];
const filtrosDeTamanho = [];

filtrosCor.forEach(filtro => {
  filtro.addEventListener('change', function (e) {
    if (e.target.checked === true) {
      filtrosDoCor.push(e.target.value);
      filtrar(filtrosDoCor, filtrosDeTamanho);
    } else {
      filtrosDoCor.forEach((filtro, index) => {
        filtrosDoCor.splice(index, 1);
      });
      filtrar(filtrosDoCor, filtrosDeTamanho);
    }
  });
});

filtrosTamanho.forEach(filtro => {
  filtro.addEventListener('click', function (e) {
    filtrosDeTamanho.push(e.target.innerText);
    filtrar(filtrosDoCor, filtrosDeTamanho);
  });
});





// fetch('http://localhost:5000/products').then(res => res.json()).then(json => {
//   let resultadoFiltrado = [];
//   resultadoFiltrado = json.filter(item => filtroCor ? item.color === filtroCor : null);

//   const shopContent = document.querySelector('.shop-content');
//   shopContent.innerHTML = '';

//   resultadoFiltrado.forEach((item, index) => {
//     const htmlDoItem = `
//               <div class="product-box" id="product-box-` + index + `">
//                   <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
//                   <div class="product-box__info">
//                   <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
//                   <div class="product-box__price">
//                       <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
//                       <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
//                   </div>
//                   <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product >COMPRAR</button>
//                   </div>
//               </div>
//           `;

//     console.log('item COR', item.color);

//     shopContent.innerHTML += htmlDoItem;
//   });
// });;





function filtrar(cor, tamanho) {
  fetch('http://localhost:5000/products').then(res => res.json()).then(json => {
    let resultadoFiltrado = [];
    // resultadoFiltrado = json.filter(item => filtroCor ? item.color === filtroCor : null);
    json.forEach(item => {
      if (cor.includes(item.color)) {
        resultadoFiltrado.push(item);
      }
      item.size.forEach(size => {
        if (tamanho.includes(size)) {
          resultadoFiltrado.push(item);
        }
      });
    });

    const shopContent = document.querySelector('.shop-content');
    shopContent.innerHTML = '';

    resultadoFiltrado.forEach((item, index) => {
      const htmlDoItem = `
                <div class="product-box" id="product-box-` + index + `">
                  <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                  <div class="product-box__info">
                  <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                  <div class="product-box__price">
                    <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                    <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                  </div>
                  <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product >COMPRAR</button>
                  </div>
                </div>
            `;

      console.log('item COR', item.color);

      shopContent.innerHTML += htmlDoItem;
    });


    const botoesComprar = document.querySelectorAll('.botao-comprar');
    const cartContentItem = document.querySelector('.cart-content');
    botoesComprar.forEach(botao => {
      botao.addEventListener('click', function (e) {
        const produto = document.getElementById(botao.dataset.productId);
        const itemHtml = document.createElement('div');
        itemHtml.innerHTML = `
          <div class="item-sacola">
            <img src="` + produto.querySelector('img').src + `" />
            <div class="item-sacola-info">
              <p class="titulo-produto">` + produto.querySelector('.product-title').innerText + `</p>
              <p class="preco-produto">` + produto.querySelector('span.price').innerText + `</p>
              <input type="number" value="1" />
            </div>
            <button id = "ExcluideProduto">x</button>
          </div>
        `;

        itemHtml.querySelector('button').addEventListener('click', function () {
          itemHtml.remove();
          Updatetotal();
        });
        itemHtml.querySelector('input').addEventListener('change', function () {
          Updatetotal();
        });
        cartContentItem.appendChild(itemHtml);
        Updatetotal();
      });
    });
  });

}

fetch('http://localhost:5000/products').then(res => res.json()).then(json => {
  const shopContent = document.querySelector('.shop-content');

  json.forEach((item, index) => {
    const htmlDoItem = `
            <div class="product-box" id="product-box-` + index + `">
                <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                <div class="product-box__info">
                <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                <div class="product-box__price">
                    <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                    <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                </div>
                <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product>COMPRAR</button>
                </div>
            </div>
        `;

    shopContent.innerHTML += htmlDoItem;
  });

  const botoesComprar = document.querySelectorAll('.botao-comprar');
  const cartContentItem = document.querySelector('.cart-content');
  botoesComprar.forEach((botao, index) => {
    botao.addEventListener('click', function (e) {
      const produto = document.getElementById(botao.dataset.productId);
      const itemHtml = document.createElement('div');
      itemHtml.innerHTML = `
        <div class="item-sacola" id="item-sacola-` + index + `">
          <img src="` + produto.querySelector('img').src + `" />
          <div class="item-sacola-info">
            <p class="titulo-produto">` + produto.querySelector('.product-title').innerText + `</p>
            <p class="preco-produto">` + produto.querySelector('span.price').innerText + `</p>
            <input  class = "quantidade" type="number" value="1" />
          </div>
          <button id = "ExcluideProduto">x</button>
        </div>
      `;

      itemHtml.querySelector('button').addEventListener('click', function () {
        itemHtml.remove();
        Updatetotal();
      });
      itemHtml.querySelector('input').addEventListener('change', function () {
        Updatetotal();
      });
      cartContentItem.appendChild(itemHtml);
      Updatetotal();
    });
  });
});


function Updatetotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartContentFilhos = cartContent.children;
  var total = 0;

  for (var i = 0; i < cartContentFilhos.length; i++) {
    var cartBox = cartContentFilhos[i];
    var priceElement = cartBox.querySelector('p.preco-produto');
    var quantityElement = cartBox.querySelector('input');
    var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }

  document.getElementsByClassName('totalPrice')[0].innerText = ('R$ ' + total.toFixed(2)).replace(".", ",");
}


//cart
let cartIcon = document.querySelector("#sacola");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close_cart");
//Open Cart
cartIcon.onclick = () => {
  cart.style.display = 'block';
};
// Close Crt
closeCart.onclick = () => {
  cart.style.display = 'none';
};