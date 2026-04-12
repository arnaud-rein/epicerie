# Claude Notes

## Ce que fait le projet

Le projet est un site vitrine statique pour `Reptilerie`, une epicerie artisanale orientee autour de madeleines, biscuits et autres gourmandises.

Le site contient principalement :

- une section `Accueil` avec hero plein ecran
- une section `Nos Creations`
- une section `Produits Disponibles`
- une section `Evenements`
- une section `Galerie` avec carousel horizontal
- une section `A propos`
- une section `Contact`
- plusieurs easter eggs dans le footer et le logo

## Structure technique

Le projet repose surtout sur trois fichiers :

- `index.html`
- `styleMinify.css`
- `script.js`

Le site est en HTML / CSS / JavaScript vanilla, sans framework ni build visible dans le repo.

## Comportements deja presents

- menu hamburger mobile
- smooth scroll sur les ancres
- animations `reveal` au scroll
- carousel horizontal dans la galerie
- easter egg sur le logo
- easter egg sur le footer avec mot de passe

## Section travaillee

J'ai travaille principalement sur la section `A propos` du site, identifiee par `#about` dans `index.html`.

## Ce qui a ete fait

- ajout d'un ticker horizontal inspire d'un bandeau de cotations
- refonte visuelle de la zone `A propos` pour lui donner une hierarchie plus claire
- integration d'un bloc texte plus editorial
- ajout de cartes de highlights statiques
- ajout d'une carte superposee sur l'image de la section pour renforcer le point focal
- simplification du JavaScript pour n'utiliser que des donnees en dur dans le ticker

## Ce qui a ete tente

- j'ai d'abord essaye de brancher le ticker sur une API de marche reel pour afficher des cours comme `LVMH`, `NVDA` et `AAPL`
- un support avait ete prepare pour `Alpha Vantage` puis `Twelve Data`
- cette piste a ensuite ete abandonnee pour revenir a des donnees statiques

## Resultat actuel

- la section `A propos` utilise maintenant un ticker statique
- le travail est concentre sur l'UI de cette section, sans dependance a une API externe

## Point utile pour un autre agent

Le fichier `index.html` contient parfois des caracteres accentues mal encodes selon l'outil de lecture. Si un agent doit modifier un gros bloc HTML, il vaut mieux relire la zone cible avant patch, ou remplacer le bloc complet avec prudence.
