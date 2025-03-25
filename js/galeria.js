
document.querySelectorAll('.carousel-block').forEach(block => {
  const mainImageContainer = block.querySelector('.main-image-container');
  const modal = block.querySelector('.modal');
  const closeModal = block.querySelector('.close-modal');
  const modalTrack = block.querySelector('.modal-track');
  const modalPrev = block.querySelector('.modal-prev');
  const modalNext = block.querySelector('.modal-next');
  let modalCurrent = 0;
  
  function updateModalCarousel() {
    modalTrack.style.transform = `translateX(-${modalCurrent * 100}%)`;
  }
  
  mainImageContainer.addEventListener('click', () => {
    modalCurrent = 0;
    updateModalCarousel();
    modal.classList.add('active');
  });
  
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    modalCurrent = (modalCurrent - 1 + 3) % 3;
    updateModalCarousel();
  });
  
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    modalCurrent = (modalCurrent + 1) % 3;
    updateModalCarousel();
  });
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('active');
    }
  });
});






