# ThePanoply.se
Websidan för The Panoply steelband

Eftersom vi är en grupp människor har vi valt att placera koden här för att underlätta samarbete.

# Karusell-bilderna
Det finns en lista över bilder i js/carousel.js som behöver uppdateras om bilder läggs till. Sidan laddar de stora bilderna på skärmar som är över 1000px och små för mindre skärmar. Bilderna har proportionen 1:2.1, inte exakt men det verkar inte vara ett så stort problem. Jag gissar att best practice är att ta en stor bild, klippa till 1:2.1 och spara som webp. Den måste vara under 1MB men jag föredrar runt 500kB. Skala sen till 1000px och se till att den inte är mer än 100kB stor.

# TODO
Backloggen finns representerad i repositoryt
