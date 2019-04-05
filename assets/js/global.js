//Formaterer nummer med decimaler m.m.
function currencyToHuman(num) {
  return (
    num
      .toFixed(2) // Altid to decimaler
      .replace('.', ',') //Erstat decimal seperator med komma
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') //Brug punktum som tusind seperator
    )
}

//Formaterer nummer til database
function currencyToDb(num) {
  return (
    num
    .replace('.', '') //Erstat tusind seperator med ''
    .replace(',', '.') //Erstat decimal seperator med punktum
  )
}

/**
 * @param {*} url 
 * @param {*} title 
 * @param {*} id 
 */
function doButton(url, title, elmId = 'buttonpanel') {
  let btn = document.createElement('a');
  btn.setAttribute('class', 'btn btn-dark');
  btn.setAttribute('href', url);
  btn.innerHTML = title;
  document.getElementById(elmId).appendChild(btn);
}
