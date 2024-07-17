const agreeAllCheckbox = document.getElementById("agreeAll");
const checkboxes = document.querySelectorAll(
  '.agreement-option input[type="checkbox"]:not(#agreeAll)'
);

agreeAllCheckbox.addEventListener("change", function () {
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = agreeAllCheckbox.checked;
  });
});

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (!checkbox.checked) {
      agreeAllCheckbox.checked = false;
    } else {
      const allChecked = Array.from(checkboxes).every(function (checkbox) {
        return checkbox.checked;
      });
      agreeAllCheckbox.checked = allChecked;
    }
  });
});

export default agreeAllCheckbox;
