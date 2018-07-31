
document.addEventListener("DOMContentLoaded", () => {
  let block = document.getElementsByClassName('b-blockImg');

  fetch('https://api.tessin.se/1/projects/no-cors')
    .then(res => res.json())
    .then(res => {
      for(let i=0; i < 3; i++){
        block[0].children[i].children[0].children[0].setAttribute('style',
          `background-image: url('https://${res.payload.projects[i].teaserImage}')`
        );
        block[0].children[i].children[1].innerHTML=`${res.payload.projects[i].publicTeaser}`;
        block[0].children[i].children[0].setAttribute('href',`https://tessin.se/projekt/${res.payload.projects[i].hId}/`)
      }
    });
});
