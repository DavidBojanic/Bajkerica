const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' 
  });
}

function applyFilters() {
  const sortBy = document.getElementById('sort').value;
  const type = document.getElementById('type').value;
  const height = document.getElementById('height').value;
  const minPrice = document.querySelector('.input-min').value;
  const maxPrice = document.querySelector('.input-max').value;
  console.log(sortBy, type, height, minPrice, maxPrice);

  const filteredBikes = bikes.filter(bike => {
    return (
      (sortBy === '' || sortBy === 'none' || sortBy === 'alphabetically_asc' || sortBy === 'alphabetically_desc' || sortBy === 'price_asc' || sortBy === 'price_desc' || sortBy === 'height_asc' || sortBy === 'height_desc') &&
      (type === 'all' || bike.type.toLowerCase() === type.toLowerCase()) &&
      (height === 'all' || bike.size.toLowerCase().includes(height.toLowerCase())) &&
      (parseInt(minPrice) <= bike.price && bike.price <= parseInt(maxPrice))
    );
  });

  ponudaContainer.innerHTML = '';

  filteredBikes.forEach(bike => {
    const bikeContainer = document.createElement('div');
    bikeContainer.classList.add('bike-container');

    const bikeImage = document.createElement('img');
    bikeImage.src = bike.imageSrc;
    bikeImage.alt = bike.name;

    const bikeDetails = document.createElement('div');
    bikeDetails.classList.add('bike-details');

    const bikeName = document.createElement('h3');
    bikeName.textContent = bike.name;

    const bikeType = document.createElement('p');
    bikeType.textContent = `Type: ${bike.type}`;

    const bikeSize = document.createElement('p');
    bikeSize.textContent = `Size: ${bike.size}`;

    const bikePrice = document.createElement('p');
    bikePrice.textContent = `Price: ${bike.price}€`;

    const addToBasketButton = document.createElement('button');
    addToBasketButton.classList.add('add-to-basket-button');
    addToBasketButton.textContent = 'Add to Basket';

    addToBasketButton.addEventListener('click', function() {
      addToCart(bike);
    });

    bikeDetails.appendChild(bikeName);
    bikeDetails.appendChild(bikeType);
    bikeDetails.appendChild(bikeSize);
    bikeDetails.appendChild(bikePrice);
    bikeDetails.appendChild(addToBasketButton);

    bikeContainer.appendChild(bikeImage);
    bikeContainer.appendChild(bikeDetails);

    ponudaContainer.appendChild(bikeContainer);
  });
}


function resetFilters() {
  document.getElementById('sort').value = 'none';
  document.getElementById('type').value = 'all';
  document.getElementById('height').value = 'all';
  document.querySelector('.input-min').value = '25';
  document.querySelector('.input-max').value = '75';
  updateSliderHandles(25, 75);
  applyFilters(); 
  window.location.href = 'index.html';
}

function updateSliderHandles(minVal, maxVal) {
  const rangeInputMin = parseInt(rangeInput[0].min);
  const rangeInputMax = parseInt(rangeInput[1].max);
  rangeInput[0].value = minVal;
  rangeInput[1].value = maxVal;
  range.style.left = ((minVal - rangeInputMin) / (rangeInputMax - rangeInputMin)) * 100 + "%";
  
  range.style.right = ((rangeInputMax - maxVal) / (rangeInputMax - rangeInputMin)) * 100 + "%";
}

// Event listener for apply button
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("index.html")) {
    document.querySelector('.submit-apply').addEventListener('click', applyFilters);
  }
});

// Event listener for reset button
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("index.html")) {
    document.querySelector('.submit-reset').addEventListener('click', resetFilters);
  }
});




class Bike {
  constructor(name, price, height, type, imageSrc) {
      this.name = name;
      this.price = price;
      this.height = height;
      this.type = type;
      this.imageSrc = imageSrc;
    }
}

document.querySelectorAll('.add-item').forEach(button => {
  button.addEventListener('click', function() {
      const quantityElement = this.parentNode.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
  });
});


const ponudaContainer = document.querySelector('.ponuda');

const bikes = [
  { name: "Giant Contend SL1", type: "Road", size: "195cm", price: 70, imageSrc: "bicikla/road/GiantContendSL1.jpg" },
  { name: "Scott Genius ST", type: "MTB", size: "200cm", price: 80, imageSrc: "bicikla/mtb/SCOTTGeniusST900.jpg" },
  { name: "Cube Stereo One", type: "MTB", size: "185cm", price: 90, imageSrc: "bicikla/mtb/2023-cube-stereo-one55-c-62-slt-29-mountain-bike1.jpg" },
  { name: "Jeffsy Core 5", type: "MTB", size: "170cm", price: 100, imageSrc: "bicikla/mtb/YTJEFFSYCORE5CF.jpg" },
  { name: "Propella 9S", type: "Electric", size: "195cm", price: 100, imageSrc: "bicikla/electric/Propella9SProV2.jpg" },
  { name: "Cannondale CAAD13", type: "MTB", size: "195cm", price: 60, imageSrc: "bicikla/road/CannondaleCAAD13Disc.png" },
  { name: "Cannondale Habit LT", type: "MTB", size: "195cm", price: 65, imageSrc: "bicikla/mtb/CannondaleHabitLT1.jpg" },
  { name: "Riprock 24", type: "MTB", size: "165cm", price: 30, imageSrc: "bicikla/others/Riprock24kids.jpg" },
  { name: "Brompton Explore Folding", type: "Other", size: "175cm", price: 40, imageSrc: "bicikla/others/BromptonCLineExploreFoldingBike.png" },
  { name: "Specialized Allez", type: "Road", size: "195cm", price: 50, imageSrc: "bicikla/road/SpecializedAllez.jpg" },
  { name: "Giant Propel Advanced SL", type: "Road", size: "185cm", price: 80, imageSrc: "bicikla/road/GiantPropelAdvancedSL.jpg" },
  { name: "Trek FX+2", type: "Electric", size: "175cm", price: 80, imageSrc: "bicikla/electric/FXPlus2_23_35842_A_Primary.jpg" },
  { name: "Steelhead Tandem duo", type: "Other", size: "195cm", price: 100, imageSrc: "bicikla/others/Steelhead_1600_db974cbe-e4f9-4a30-8907-0f03cb323ca7_2048x.webp" },
  { name: "Jett 16 Single Speed Kids", type: "Other", size: "145cm", price: 10, imageSrc: "bicikla/others/Jett16SingleSpeedKids.jpg" },
  { name: "Specialized Jett 24 kids", type: "Other", size: "165cm", price: 15, imageSrc: "bicikla/others/SpecializedJett24kids.jpg" },
  { name: "Specialized Globe Haul ST", type: "Electric", size: "185cm", price: 70, imageSrc: "bicikla/electric/SpecializedGlobeHaulST.webp" },
];
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("index.html")) {
    bikes.forEach((bike, index) => {
      const bikeContainer = document.createElement('div');
      bikeContainer.classList.add('bike-container');
      bikeContainer.draggable = true;

      bikeContainer.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'bike');
      });

      const bikeImage = document.createElement('img');
      bikeImage.src = bike.imageSrc;
      bikeImage.alt = `Bike ${index + 1}`;
      bikeImage.draggable = true;

      const bikeDetails = document.createElement('div');
      bikeDetails.classList.add('bike-details');

      const bikeName = document.createElement('h3');
      bikeName.textContent = bike.name;

      const bikeType = document.createElement('p');
      bikeType.textContent = `Type: ${bike.type}`;

      const bikeSize = document.createElement('p');
      bikeSize.textContent = `Size: ${bike.size}`;

      const bikePrice = document.createElement('p');
      bikePrice.textContent = `Price: ${bike.price}€`;

      const addToBasketButton = document.createElement('button');
      addToBasketButton.classList.add('add-to-basket-button');
      addToBasketButton.textContent = 'Add to Basket';

      bikeDetails.appendChild(bikeName);
      bikeDetails.appendChild(bikeType);
      bikeDetails.appendChild(bikeSize);
      bikeDetails.appendChild(bikePrice);
      bikeDetails.appendChild(addToBasketButton);

      bikeContainer.appendChild(bikeImage);
      bikeContainer.appendChild(bikeDetails);

      ponudaContainer.appendChild(bikeContainer);
    });
  }
});


let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];


document.addEventListener('DOMContentLoaded', function() {
  const addToBasketButtons = document.querySelectorAll('.add-to-basket-button');
  addToBasketButtons.forEach(button => {
      button.addEventListener('click', function() {
        const bikeContainer = this.closest('.bike-container');
        const bikeDetails = bikeContainer.querySelector('.bike-details');
        
        if (bikeDetails) {
            const name = bikeDetails.querySelector('h3').textContent;
            const price = parseInt(bikeDetails.querySelector('p:nth-child(4)').textContent.split(':')[1].trim());
            const height = bikeDetails.querySelector('p:nth-child(3)').textContent.split(':')[1].trim();
            const type = bikeDetails.querySelector('p:nth-child(2)').textContent.split(':')[1].trim();
            const imageSrc = bikeContainer.querySelector('img').src; 
            console.log("Image source:", imageSrc);
            const bike = new Bike(name, price, height, type, imageSrc);
            
            addToCart(bike);
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
    
            const message = document.createElement('div');
            message.classList.add('message');
            message.textContent = `${name} added to cart successfully!`;
    
            overlay.appendChild(message);
            document.body.appendChild(overlay);
    
            setTimeout(() => {
              overlay.remove();
            }, 1000);
        } else {
            console.error("Bike details not found.");
        }
      });
  });
});


function sortBikes(sortCriteria) {
  const ponudaContainer = document.querySelector('.ponuda');
  const bikeContainers = Array.from(ponudaContainer.querySelectorAll('.bike-container'));

  bikeContainers.sort((a, b) => {
      const bikeDetailsA = a.querySelector('.bike-details');
      const bikeDetailsB = b.querySelector('.bike-details');
      
      let valueA, valueB;

      switch (sortCriteria) {
          case 'alphabetically_asc':
              valueA = bikeDetailsA.querySelector('h3').textContent.toLowerCase();
              valueB = bikeDetailsB.querySelector('h3').textContent.toLowerCase();
              return valueA.localeCompare(valueB);
          case 'alphabetically_desc':
              valueA = bikeDetailsA.querySelector('h3').textContent.toLowerCase();
              valueB = bikeDetailsB.querySelector('h3').textContent.toLowerCase();
              return valueB.localeCompare(valueA);
          case 'price_asc':
              valueA = parseInt(bikeDetailsA.querySelector('p:nth-child(4)').textContent.split(':')[1].trim());
              valueB = parseInt(bikeDetailsB.querySelector('p:nth-child(4)').textContent.split(':')[1].trim());
              return valueA - valueB;
          case 'price_desc':
              valueA = parseInt(bikeDetailsA.querySelector('p:nth-child(4)').textContent.split(':')[1].trim());
              valueB = parseInt(bikeDetailsB.querySelector('p:nth-child(4)').textContent.split(':')[1].trim());
              return valueB - valueA;
          case 'height_asc':
              valueA = parseInt(bikeDetailsA.querySelector('p:nth-child(3)').textContent.split(':')[1].trim().split('cm')[0]);
              valueB = parseInt(bikeDetailsB.querySelector('p:nth-child(3)').textContent.split(':')[1].trim().split('cm')[0]);
              return valueA - valueB;
          case 'height_desc':
              valueA = parseInt(bikeDetailsA.querySelector('p:nth-child(3)').textContent.split(':')[1].trim().split('cm')[0]);
              valueB = parseInt(bikeDetailsB.querySelector('p:nth-child(3)').textContent.split(':')[1].trim().split('cm')[0]);
              return valueB - valueA;
          default:
              return 0;
      }
  });

  ponudaContainer.innerHTML = '';

  bikeContainers.forEach(bikeContainer => {
      ponudaContainer.appendChild(bikeContainer);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("index.html")) {
    document.getElementById('sort').addEventListener('change', function() {
      const sortCriteria = this.value;
      sortBikes(sortCriteria);
    });
  }
});



// korpa logika

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("korpa.html")) {
    const cartItemsContainer = document.querySelector('.cart-items');

    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const bikeImage = document.createElement('img');
        bikeImage.src = item.imageSrc;
        bikeImage.alt = item.name;
        cartItemDiv.appendChild(bikeImage);

        const bikeName = document.createElement('h2');
        bikeName.textContent = item.name;

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${item.price}€`;

        const heightParagraph = document.createElement('p');
        heightParagraph.textContent = `Height: ${item.height}`;

        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Type: ${item.type}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add 1';
        addButton.classList.add('add-button');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');

        addButton.addEventListener('click', function() {
            addToCart(item);
        });

        removeButton.addEventListener('click', function() {
            removeFromCart(item);
        });

        cartItemDiv.appendChild(bikeName);
        cartItemDiv.appendChild(priceParagraph);
        cartItemDiv.appendChild(heightParagraph);
        cartItemDiv.appendChild(typeParagraph);
        cartItemDiv.appendChild(addButton);
        cartItemDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemDiv);
    });
  }
});

function addToCart(bike) {
  const item = {
    name: bike.name,
    price: bike.price,
    height: bike.height,
    type: bike.type,
    imageSrc: bike.imageSrc
  };
  shoppingCart.push(item);
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  console.log("Adding", bike.name, "to cart...");
  console.log("Shopping Cart:", shoppingCart);
  updateCartDisplay();
  displayCartTotalPrice();
}

function removeFromCart(bike) {
  const index = shoppingCart.findIndex(item => item.name === bike.name);
  if (index !== -1) {
    shoppingCart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    console.log("Removing", bike.name, "from cart...");
    console.log("Shopping Cart:", shoppingCart);
    updateCartDisplay();
    displayCartTotalPrice();
  } else {
    console.error("Item not found in cart:", bike.name);
  }
}


function updateCartDisplay() {
  if (window.location.pathname.endsWith("korpa.html")) {

    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; 
    shoppingCart.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const bikeImage = document.createElement('img');
      bikeImage.src = item.imageSrc;
      bikeImage.alt = item.name;
      cartItemDiv.appendChild(bikeImage);

      const bikeName = document.createElement('h2');
      bikeName.textContent = item.name;

      const priceParagraph = document.createElement('p');
      priceParagraph.textContent = `Price: ${item.price}€`;

      const heightParagraph = document.createElement('p');
      heightParagraph.textContent = `Height: ${item.height}`;

      const typeParagraph = document.createElement('p');
      typeParagraph.textContent = `Type: ${item.type}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add 1';
      addButton.classList.add('add-button');

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');

      addButton.addEventListener('click', function() {
        addToCart(item);
        updateCartDisplay(); 
        displayCartTotalPrice();
      });

      removeButton.addEventListener('click', function() {
        removeFromCart(item);
        updateCartDisplay(); 
        displayCartTotalPrice();
      });

      cartItemDiv.appendChild(bikeName);
      cartItemDiv.appendChild(priceParagraph);
      cartItemDiv.appendChild(heightParagraph);
      cartItemDiv.appendChild(typeParagraph);
      cartItemDiv.appendChild(addButton);
      cartItemDiv.appendChild(removeButton);

      cartItemsContainer.appendChild(cartItemDiv);
    });
    const cartHeader = document.querySelector('.cart-header');
    
  }
}

function displayCartTotalPrice() {
  if (window.location.pathname.endsWith("korpa.html")) {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    const cartHeader = document.querySelector('.cart-header');
    cartHeader.textContent = `Shopping Cart: ${totalPrice}€`;
  }
}

document.addEventListener('DOMContentLoaded', displayCartTotalPrice);

function filterBySearch() {
  const searchInput = document.querySelector('input[name="search"]').value.toLowerCase();

  const filteredBikes = bikes.filter(bike => {
    return bike.name.toLowerCase().includes(searchInput);
  });

  
  ponudaContainer.innerHTML = '';

  filteredBikes.forEach(bike => {
    const bikeContainer = document.createElement('div');
    bikeContainer.classList.add('bike-container');

    const bikeImage = document.createElement('img');
    bikeImage.src = bike.imageSrc;
    bikeImage.alt = bike.name;

    const bikeDetails = document.createElement('div');
    bikeDetails.classList.add('bike-details');

    const bikeName = document.createElement('h3');
    bikeName.textContent = bike.name;

    const bikeType = document.createElement('p');
    bikeType.textContent = `Type: ${bike.type}`;

    const bikeSize = document.createElement('p');
    bikeSize.textContent = `Size: ${bike.size}`;

    const bikePrice = document.createElement('p');
    bikePrice.textContent = `Price: ${bike.price}€`;

    const addToBasketButton = document.createElement('button');
    addToBasketButton.classList.add('add-to-basket-button');
    addToBasketButton.textContent = 'Add to Basket';

    addToBasketButton.addEventListener('click', function() {
      addToCart(bike);
    });

    bikeDetails.appendChild(bikeName);
    bikeDetails.appendChild(bikeType);
    bikeDetails.appendChild(bikeSize);
    bikeDetails.appendChild(bikePrice);
    bikeDetails.appendChild(addToBasketButton);

    bikeContainer.appendChild(bikeImage);
    bikeContainer.appendChild(bikeDetails);

    ponudaContainer.appendChild(bikeContainer);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("index.html")) {
    document.querySelector('.search-container form').addEventListener('submit', function(event) {
      event.preventDefault(); 
      filterBySearch(); 
    });
  }
});

