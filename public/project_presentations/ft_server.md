[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-docker]][project-url]

## Getting Started
The goal of this project is to setup a server running Wordpress aswell as a MySQL database with phpMyAdmin, secured with a SSL certificate.

The whole thing being contained in a docker container.
### Prerequisites
  * Having Docker installed.
  * That's it!

### Installation
`git clone https://github.com/lpellier/ft_server.git && cd ft_server`

You can build a Docker image with the following command :

`docker build -t server .`

## Usage

Now to actually run this image in a container, use the command :

`docker run --name ft_server -it -p 80:80 -p 443:443 server`

The following addresses are now available :
https://localhost/wordpress
https://localhost -> redirects to wordpress
https://localhost/phpmyadmin

If you'd like to test everything, you should create a Wordpress account (directly on localhost/wordpress) to setup the website.

phpmyadmin will require a username ('user') and a password ('password').

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [ft_server](https://github.com/lpellier/ft_server)



[built-with-docker]: https://img.shields.io/badge/built%20with-Docker-blue

[project-url]: https://github.com/lpellier/ft_server

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/ft_server
[last-commit]: https://img.shields.io/github/last-commit/lpellier/ft_server?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/ft_server.svg?style=flat
[stars-url]: https://github.com/lpellier/ft_server/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 