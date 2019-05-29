$(document).ready( () => {
  

  const showModal = () => {
      $('.overlay').fadeIn(300);
      $('.modal').slideDown("slow");
  },
      closeModal = () => {
        $('.modal').slideUp(300);
        $('.overlay').fadeOut("slow");
      };


  $('body').on('click', (event) => {
    let target = $(event.target);

    if (target.hasClass('main_btna')) {
      showModal();
    }
    if (target.hasClass('main_btn')) {
      showModal();
    }
    if (target.attr("href") === "#sheldure") { 
      //что-бы только получить этот атрибут, а не присвоить его любому
      //target
      showModal();
    }
  });


  $('.close').on('click',  () => {
    closeModal();
    //Почему-то в общем обработчике на всюстраницу
    // если event-target == $('.close') то закрытие не работало..
  });


});