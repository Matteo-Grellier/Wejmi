# Wejmi

Wejmi est une application Mobile qui a pour but de renseigner où sont rangés nos objets. 

Elle permet d'ajouter des objets ainsi que l'emplacement où ils sont rangés, de les modifier, de les supprimer, de faire une recherche dans l'annuaire des objets entrés en fonction de : leur catégorie, la pièce dans laquelle ils sont rangés, ou tout simplement en fonction de leur nom.
L'application permet aussi à tout moment de modifier l'état d'un objet entre "rangé", "perdu" et "déplacé".
De plus, Wejmi dispose d'une page "Ma Maison" permettant de rajouter ses propres pièces, meubles, et catégories en fonction de votre organisation.

Avec Wejmi, il vous sera désormais impossible de perdre quoi que ce soit !

## Visuels :

Ajouter une catégorie :


https://user-images.githubusercontent.com/73283488/164987732-272dd773-c13c-48b8-9231-5842387f687b.mp4



Ajouter un objet :

https://user-images.githubusercontent.com/73283488/164987717-ed2db7d9-d152-4844-98b9-bfce26de3676.mp4


Modifier un objet :



https://user-images.githubusercontent.com/73283488/164987768-35cddd66-8b06-44df-bb0a-b4ea9240619b.mp4




Rechercher :



https://user-images.githubusercontent.com/73283488/164987766-beaeb65d-4af2-4d28-a108-a5763e61633c.mp4





## Description technique

L'application comporte 4 pages :
- La page "Affichage" qui présente tous les objets, une barre de recherche et un système de filtre pour trier les objets.
- La page "Ma Maison" qui permet l'ajout de catégories, de pièces et de meubles.
- La page "Ajouter" qui permet d'entrer un nouvel objet, ainsi que l'endroit où il se trouve.
- La page "Modifier" qui permet de modifier les informations d'un objet.

Wejmi est disponible au test sur les smartphones Apple et Android. 

Toutes les données sont stockées sur une base de données en local sur le téléphone et ne peuvent donc pas être transférées entre plusieurs appareils.

## Lancer l'application

### Lancer avec Expo Go :

Pour tester l'application avec Expo Go, il va falloir vous munir d'un ordinateur et d'un smartphone de votre choix (Android ou Apple).

**Sur le téléphone :**

Il faut simplement télécharger l'application *Expo Go*

**Sur l'ordinateur :**

Il faut télécharger le code contenu dans ce repo, et installer *expo-cli* sur votre ordinateur grâce à la commande :

```
npm install -g expo-cli
```

Puis il faut lancer la commande :

```
npm install
```

Et lancer le projet avec la commande :

```
expo start
```


**Pour lancer l'application :**

Une fois que le projet est lancé, un QR code apparaît dans le terminal, il suffit d'ouvrir *Expo Go* et de le scanner, après cela, l'application s'exécute sur votre téléphone.

### Télécharger l'APK :
 
Pour lancer l’application via le fichier APK, il faut : 
1. Récupérer le fichier APK depuis teams ou depuis ce [lien WeTransfer](https://we.tl/t-eSr0JORtLW)
2. Le transférer vers son téléphone
3. Installer l’application en allant chercher le fichier .apk  
-----------------!!! ATTENTION !!!-----------------  
L'application ne marche pas au lancement, il faut d'abord aller dans les options et revenir sur l'écran d'accueil  
-----------------!!! ATTENTION !!!-----------------  
5. L’installation est finie ! Il ne reste plus qu'à l'application !


## Technologies

L'application Wejmi a été developpée avec du Javascript en utilisant React-Native. La base et le traitement des données sont faits avec SQLite.

![technos](https://user-images.githubusercontent.com/73283488/164979738-3b34d56a-5f78-4880-b539-90868046ea00.png)



## Crédits

Cette application a été developpé par la team Purpl'Studio👊 dans le cadre d'un projet scolaire.

L'équipe est composée de : 
- Mathéo LEGER
- Mattéo GRELLIER 
- Olivia MOREAU
- Louis BROCHARD

Intervenant à l'initiative du projet :

- Julien Sosthene <3


