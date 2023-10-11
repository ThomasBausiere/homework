"use strict"
document.addEventListener("DOMContentLoaded", function() {
    const loreDiv = document.getElementById("lore");
  
    const loreContents = [
      { h1: "Bonjour", p: ["Je suis le mage de ces lieux et j'ai besoin de votre aide. Une horde de monstre a envahi notre royaume", "Notre royaume est en péril ! Et je me dois de sauver les habitants. Vous, vous allez m'aider. Pour en savoir plus cliquez par de ce coté là de cette boîte de dialogue: ici"] },
      { h1: "", p: ["Grâce à vos talents et ma magie nous allons défaire cette horde des ténèbres qui est à nos portes.", "Je compte sur vous aventurier! Serez vous à la hauteur? En êtes vous capable? Ooouuaaahhouuuuooo ! Je fais des trucs bizarres parce que je suis magicien! N'y faites pas attention ! C'est mieux ainsi. Je comble certain vide, mais ça c'est pas vos affaires! Bon. cliquez à nouveau!"] },
      { h1: "Objectif:", p: ["Vous allez devoir deviner un nombre entre 1 et 100!", "Si vous y parvenez, je le saurais et nous entrerons dans une phase mystique de magie. Cela devrait me donner assez de puissance pour pouvoir enc... euh pardon, 'écraser' les monstres. "] },
      { h1: "Conditions", p: ["Vous n'avez que 7 essais. C'est un nombre magique. 7. Pas plus, pas moins! Vous vous en souviendrez? J'en doute... Bon je vous rapellerez à combien vous en êtes. Vous avez pas l'air futé vous hein..." , "Au delà de ce chiffre, le royaume sera perdu! C'est du sérieux là! donc pas de bétise! "] },
      { h1: "Je vous soutiendrais", p: ["Grâce à ma diviniation, je saurais vous aiguiller dans votre parcours.", "Je vous indiquerez si le nombre à deviner est plus grand, ou plus petit. Comme ça, on met les chances de notre coté! Je vous rappelle que moi, j'fais de la magie alors vous pouvez me faire confiance."] },
      { h1: "Prêt?", p: ["Alors, allons-y.", "Entrez un nombre pour commencer."] },
    ];
  
    let currentIndex = 0;
  
    function updateLoreContent() {
      const content = loreContents[currentIndex];
      loreDiv.innerHTML = `<h1>${content.h1}</h1><p>${content.p[0]}</p><p>${content.p[1]}</p>`;
    }
  
    loreDiv.addEventListener("click", function(event) {
      const rect = loreDiv.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
  
      if (clickX < rect.width / 2 && currentIndex > 0) {
        // Clic sur le côté gauche
        currentIndex--;
      } else if (clickX >= rect.width / 2 && currentIndex < loreContents.length - 1) {
        // Clic sur le côté droit
        currentIndex++;
      }
  
      updateLoreContent();
    });
  
   
    updateLoreContent();
  });
  