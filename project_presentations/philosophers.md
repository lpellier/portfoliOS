[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]

<img class="banner-image" src="https://lpellier.github.io/portfoliOS/images/philos.gif" alt="an image depicting 6 philosophers wondering how to eat"/>

# 1. Getting started 
A table of 5 philosophers are seated at a round table.<br/>

They all have a fork in front of them and a huge plate of pasta in the middle of the table.<br/>

They must eat or they will die. They must sleep or they will die.<br/>

To eat, one needs two forks - which means he'll have to borrow a neighbour's fork.<br/>

He will instantly starts sleeping after having eaten.<br/>

They are bound to this round table.<br/><br/>

How to keep them all alive ?


## 1.1 The code
Each philosopher is a thread in a multi-thread program. <br/>
Every fork is protected by a mutex (which prevents the same fork from being held by two threads) <br/><br/>
The program outputs the actions of every thread as they perform these actions.<br/>
If a philosopher dies, the program stops.<br/>

## 1.2 Installation 
```bash
$ git clone https://github.com/lpellier/philosophers.git && cd philosophers/philo
$ make
```

# 2. Usage
```bash
# Execute philosophers
$ ./philoshopers <nbr_of_philos> <time_to_die> <time_to_eat> <time_to_sleep>
```

<img class="usage-image" src="https://lpellier.github.io/portfoliOS/images/philosophers.gif" alt="a gif of the project running"/>

# 3. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [philosophers](https://github.com/lpellier/philosophers)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/philosophers

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/philosophers
[last-commit]: https://img.shields.io/github/last-commit/lpellier/philosophers?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/philosophers.svg?style=flat
[stars-url]: https://github.com/lpellier/philosophers/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 