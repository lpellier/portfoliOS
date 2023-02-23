[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]

# 1. Getting started 
The goal of this project is to code and optimize a sorting algorithm.<br/><br/>

The algorithm must be constrained by a few rules:<br/>
* You have two stacks named `a` and `b`.
* The stack `a` contains a random amount of negative and/or positive numbers which cannot be duplicated.
* The stack `b` is empty.
* The goal is to sort in ascending order numbers into stack a. To do so you the following operations at your disposal: `sa`, `sb`, `ss`, `pa`, `pb`, `ra`, `rb`, `rr`, `rra`, `rrb`, `rrr`
<br/><br/>

The push_swap executable takes a list of integers as argument(s).<br/>
It outputs the list of operations required to sort the list.<br/>
The goal is to have as few operations as possible.<br/><br/>

The checker executable takes a list of integers and the operations required to sort the list. <br/>
It then applies each operation to the list and checks if the resulting list is sorted.<br/>

## 1.1 Algorithm
The algorithm I chose to implement is the radix sort amlgorithm. It is easy to implement and to understand - it works like this : <br/>
* Iterate over each number and look at `n`th bit.
* If the bit is 0, push to `b` stack.
* Once there are no more numbers to check, put all of the numbers from stack `b` to stack `a`.
* Repeat the process for each bit.
* List is sorted !

## 1.2 Installation 
```bash
$ git clone https://github.com/lpellier/push_swap.git && cd push_swap
$ make
```

# 2. Usage
```bash
# Execute push_swap
$ ARG="<list of numbers separated by spaces>"; ./push_swap $ARG
# Execute checker as well
$ ARG="<list of numbers separated by spaces>"; ./push_swap $ARG | ./checker $ARG
```
# 3. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [push_swap](https://github.com/lpellier/push_swap)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/push_swap

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/push_swap
[last-commit]: https://img.shields.io/github/last-commit/lpellier/push_swap?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/push_swap.svg?style=flat
[stars-url]: https://github.com/lpellier/push_swap/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 