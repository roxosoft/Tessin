
document.addEventListener("DOMContentLoaded", () => {
  let block = document.getElementsByClassName('b-blockImg');
  let loadedImg = 0;

  fetch('https://api.tessin.se/1/projects/no-cors')
    .then(res => res.json())
    .then(res => {
      for(let i=0; i < 3; i++){
        let img = new Image();
        img.src = `https://${res.payload.projects[i].teaserImage}`;
        img.onload = () => {
            if (loadedImg === 2) {
                document.getElementById('loader').style.display = "none";
            } else {
                loadedImg++;
            }
        };
        block[0].children[i].children[0].children[0].setAttribute('style',
          `background-image: url('${img.src}')`
        );
        block[0].children[i].children[1].innerHTML=`${res.payload.projects[i].title}`;
        block[0].children[i].children[0].setAttribute('href',`https://tessin.se/projekt/${res.payload.projects[i].hId}/`)
      }
    });
});
