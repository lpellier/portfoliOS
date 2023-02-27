[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]

<br/>

<img class="banner-image" src="https://lpellier.frimages/cub3d-map.gif" alt="a gif of the executable launch"/>

# 1. Getting started 
This project is about recoding a raycasting algorithm, the same one used in older games like Doom or Wolfenstein 3D.<br/><br/>

This algorithm allows to simulate 3d in a 2d environment by sending out rays from the player's position and drawing a vertical line for each when they hit a wall.<br/><br/>

The length of the drawn line will depend on how far the wall hit is.<br/><br/>

You can find another version of this project on my website, programmed in Typescript with the help of canvases.

## 1.1 Features
* Movement : `z`, `q`, `s`, `d` keys.
* Rotation : `left`, `right` arrows.
* Sprite drawing : in the sprites folder, any `.xpm` file will be drawn depending on map configuration.
* Map configuration : more info in the subject.
* Basic minimap.

## 1.2 Installation 
```bash
$ git clone https://github.com/lpellier/cub3d.git && cd cub3d
# Generate the default executable
$ make
# Generate the bonus executable -> minimap and sprite handling
$ make bonus 
```

# 2. Usage
You're free to configure your own map, following the syntax given in the subject.

A few maps are already made available for testing.
```bash
# Available map : maps/shortmap_1sprt.cub
$ ./cub3d <path_to_map>
# Available map : maps/shortmap_3sprt.cub
$ ./cub3d_bonus <path_to_map>
```

<img class="usage-image" src="https://lpellier.frimages/cub3d-game.gif" alt="a gif of the game running"/>

# 3. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [cub3d](https://github.com/lpellier/cub3d)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/cub3d

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/cub3d
[last-commit]: https://img.shields.io/github/last-commit/lpellier/cub3d?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/cub3d.svg?style=flat
[stars-url]: https://github.com/lpellier/cub3d/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 