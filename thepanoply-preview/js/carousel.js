const imgs = [
  {url:"images/dividers/aboutdivider.small.webp", type: 0},
  {url:"images/dividers/contactdivider.small.webp", type: 1},
  {url:"images/dividers/socnetdivider.small.webp", type: 2},
  {url:"images/the_panoply_header.svg", type: 3},
  {url:"images/loggor/email.png", type: 4},
];

document.addEventListener("DOMContentLoaded", function() {
// TODO: loopa genom images-listan, skapa radio-element, label-element

  let rds = [];
  let lbls = [];

  imgs.forEach(i, id => {
    let rd = document.createElement('input');
    rd = {
      ...rd,
      type: 'radio',
      name: 'carousel',
      id
    }

    let lbl = document.createElement('label');
    lbl = {
      ...lbl,
      for: id,
      id: `lbl-${id}`
    }

  })
})