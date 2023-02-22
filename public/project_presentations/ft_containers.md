[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]
 
<img class="banner-image" src="./../images/ft_containers.gif" alt="a gif of the project building.."/>

# 1. Getting started 
The goal of this project is to code 3 already existing C++ containers: `Vector`, `Stack` and `Map`.<br/>

This project is entirely dependant on C++ documentation (https://cplusplus.com/) compliant to C++98 standard.<br/><br/>

All of these containers are fully implemented (except for type specialization). <br/>
They offer iterators and methods that work exactly like standard.

## 1.1 Vector
`Vector` is what's closest to an array of the three. <br/>
It has an underlying array and offers a lot of methods to access or modify the array.<br/><br/>

`Vector` is dynamic: if adding an element to it would overflow its array, it reallocates enough memory into a new array then copies the contents of the old one into the new.

## 1.2 Stack
`Stack` is, well, a stack.<br/>
You can push or remove things on top of it but can only access the top element.

## 1.3 Map
`Map` is a container of `key-value` pairs.<br/>
The keys are sorted according to a `Compare` object passed in its template.<br/><br/>

Under the hood, `Map` is an `AVL tree` or a `self-balancing binary tree` meaning that the difference between all of the lengths of its branches never exceeds `1`.<br/><br/>

Everytime a node is added to the tree, `Map` will perform rotations in the tree to keep it balanced while making sure that every node is still sorted by its key.

## 1.4 Installation 
```bash
$ git clone https://github.com/lpellier/ft_containers.git && cd ft_containers
```

# 2. Usage
Tests are provided to make sure the containers are working.<br/>
You can use the script `test.sh` to compile and run each of these tests.<br/>
The tester checks for leaks, difference between the tested container and the actual standard container, time differences as well.

```bash
$ cd test
# Run tests
# all : test every container
# path/to/container : test a specific container ->  bash test.sh vector
# path/to/category : test a specific category of a specific container ->  bash test vector/constructor
# path/to/test : test a specific test of a specific category of a specific container ->  bash test vector/modifiers/insert
$ ./test.sh <path_to_test>
```

# 3. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [ft_containers](https://github.com/lpellier/ft_containers)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/ft_containers

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/ft_containers
[last-commit]: https://img.shields.io/github/last-commit/lpellier/ft_containers?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/ft_containers.svg?style=flat
[stars-url]: https://github.com/lpellier/ft_containers/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 