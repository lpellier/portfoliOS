[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-docker]][project-url]

<img class="banner-image" src="https://lpellier.fr/images/ft_server.gif" alt="a gif of the project building.."/>

# 1. Getting started
The goal of this project is to setup a server running Wordpress aswell as a MySQL database with phpMyAdmin, secured with an SSL certificate.

The whole thing being contained in a Docker container.

## 1.1 Prerequisites
  * Having Docker installed.
  * That's it!

## 1.2 Installation
```bash
$ git clone https://github.com/lpellier/ft_server.git && cd ft_server
# Build Docker image
$ docker build -t server .
```
# 2. Usage
```bash
# Run the server image in a container
$ docker run --name ft_server -it -p 80:80 -p 443:443 server
```

The following addresses are now available :

```bash
https://localhost/wordpress
https://localhost
https://localhost/phpmyadmin
```

If you'd like to test everything, you should create a Wordpress account (directly on localhost/wordpress) to setup the website.

phpmyadmin will require a username (`user`) and a password (`password`).
<br/>

<img class="usage-image" src="https://lpellier.fr/images/ft_server_wp.gif" alt="a gif showing the wordpress website"/>

<img class="usage-image" src="https://lpellier.fr/images/ft_server_php.gif" alt="a gif showing the php database"/>

# 3. Contact
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