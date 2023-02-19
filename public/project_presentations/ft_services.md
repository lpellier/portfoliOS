[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-kubernetes]][project-url]

# Getting Started
The goal of this project is to setup an infrastructure composed of different services (WordPress, phpMyADming, FTPS, Grafana, InfluxDB) with Kubernetes.

Each service runs in its own container and restarts in case of a crash or stop of one of its component parts.

If one of the databases containers (MySQL or InfluxDB) crashes or stops, the data persists.

## Prerequisites
  * This project is supposed to run on the school computers, which is why we're using minikube.
  * To run it yourself, you would need to install minikube, kubectl and docker. 

## Installation
Simply execute the setup.sh script.

# Usage
A Load Balancer (MetalLB) manages redirections between services.
* Grafana is available on port 3000
* WordPress on 5050
* Nginx on 80 (http) and 443 (https)
* FTPS on 21
* phpMyAdmin on 5000

# Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [ft_services](https://github.com/lpellier/ft_services)

[built-with-kubernetes]: https://img.shields.io/badge/built%20with-Kubernetes-yellow

[project-url]: https://github.com/lpellier/ft_services

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/ft_services
[last-commit]: https://img.shields.io/github/last-commit/lpellier/ft_services?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/ft_services.svg?style=flat
[stars-url]: https://github.com/lpellier/ft_services/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 