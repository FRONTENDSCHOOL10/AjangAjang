document.addEventListener("DOMContentLoaded", function() {
  const counterDisplay = document.getElementById('counter');
  const totalPriceDisplay = document.getElementById('total-price');
  const increaseButton = document.getElementById('increase');
  const decreaseButton = document.getElementById('decrease');
  const pricePerItem = 5000;
  let counter = 0;

  function updateTotalPrice() {
      const totalPrice = counter * pricePerItem;
      totalPriceDisplay.textContent = totalPrice;
  }

  increaseButton.addEventListener('click', function() {
      counter++;
      counterDisplay.textContent = counter;
      updateTotalPrice();
  });

  decreaseButton.addEventListener('click', function() {
      if (counter > 0) {
          counter--;
          counterDisplay.textContent = counter;
          updateTotalPrice();
      }
  });
});
