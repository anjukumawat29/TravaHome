  function toggleGST() {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (let info of taxInfo) {
      info.style.display = (info.style.display !== "inline") ? "inline" : "none";
    }
  }

  // Desktop toggle
  const taxSwitchDesktop = document.getElementById("flexSwitchCheckDefault");
  if (taxSwitchDesktop) {
    taxSwitchDesktop.addEventListener("click", toggleGST);
  }

  // Mobile toggle
  const taxSwitchMobile = document.getElementById("flexSwitchCheckMobile");
  if (taxSwitchMobile) {
    taxSwitchMobile.addEventListener("click", toggleGST);
  }

