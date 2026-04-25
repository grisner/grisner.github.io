# ThePanoply.se
Websidan för The Panoply steelband

Eftersom vi är en grupp människor har vi valt att placera koden här för att underlätta samarbete.

# Karusell-bilderna

## Konfigurering
Det finns en lista över bilder i `js/carousel.js` som behöver uppdateras om bilder läggs till i `images/`. Motsvarande ID behöver också läggas till i `css/carousel.css` (t.ex. `#slide_container #imageNumber1` för bild `images/1.*`) med en procent-angivelse som motsvarar bildens vertikala centrum, så att skalningen blir korrekt i breda fönster.

Exempel:
- `object-position: 50% 0%` förankrar bilden så att dess övre kant alltid syns.
- `object-position: 50% 30%` gör att skalningen centreras ca en tredjedel ner i bilden.
- `object-position: 50% 50%` fokuserar mitt på bilden
- `object-position: 50% 75%` fokuserar på nedre delen av bilden.

## Bildformat
Sidan laddar de stora bilderna på skärmar som är över 1000px och små för mindre skärmar. Bilderna har proportionen 16:9. Best practice är att ta en stor bild, klippa till 16:9 och spara som webp. Den måste vara under 1MB men bäst är runt 500kB. Skala sen till 1000px och se till att den inte är mer än 100kB stor.

# Att göra
För att se vad som behöver fixas, gå till [Issues](https://github.com/ThePanoply/ThePanoply.github.io/issues).
