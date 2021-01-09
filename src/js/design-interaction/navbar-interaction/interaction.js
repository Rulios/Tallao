


module.exports = function(){
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  if(!isUndefined(toggleButton) && !isUndefined(navbarLinks)){
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
  }

};


function isUndefined(element){
  return typeof element === "undefined";
}
