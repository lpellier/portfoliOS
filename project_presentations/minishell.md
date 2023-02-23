[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]
 
<img class="banner-image" src="https://lpellier.github.io/portfoliOS/images/minishell.gif" alt="a gif of the project building.."/>

# 1. Getting started 
This project is about recreating a shell.

## 1.1 Features
* Working history (`up` and `down` arrows)
* Can execute any binary located in one of the folders of `$PATH`
* Signal handling (`CTRL+C`, `CTRL+\`, `CTRL+D`)
* `\`, `;`, `'`, `"`, `<`, `>`, `>>`, `|`, `$?` implementations
* Environment variables handling
* The following builtins : `echo -[n]`, `cd`, `pwd`, `export`, `unset`, `env`, `exit`

## 1.2 Installation 
```bash
$ git clone https://github.com/lpellier/minishell.git && cd minishell
$ make
```

# 2. Usage
```bash
# Run the executable
# The -d option serves for debugging purposes only
$ ./minishell -[d]
```
# 3. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [minishell](https://github.com/lpellier/minishell)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/minishell

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/minishell
[last-commit]: https://img.shields.io/github/last-commit/lpellier/minishell?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/minishell.svg?style=flat
[stars-url]: https://github.com/lpellier/minishell/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 