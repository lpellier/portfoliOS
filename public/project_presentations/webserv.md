[![Last Commit][last-commit]][project-url]
[![Total Lines][total-lines]][project-url]
[![Stargazers][stars-shield]][stars-url]

[![Built With][built-with-C++]][project-url]
 
# 1. Getting started 
The goal of this project is to code a webserver in C++.

Done in collaboration with two mates.

I was in charge of parsing requests and sending appropriate responses.

## 1.1 Installation 
```bash
$ git clone https://github.com/lpellier/webserv.git && cd webserv
```

# 2. Classes
## 2.1 Config
* Parse the provided (or not) config file
* A Config object will be created by host:ip

## 2.2 Server
* Create a listening socket on a specific port
* Listen for a connection
* Accept clients
* Store their messages in the client's object
* Determine if it's a correct message
* Call its own GET/POST/DELETE (parsing + preparing the response)
* The abnf provided in the rfc2616 is a good base
* Respond with the right header + file or error
* Execute CGI

## 2.3 Client
* Store input message
* Store response message

# 3. Usage
The server can be configured through a .conf file.

The syntax of .conf files is explained below.

Once your configuration is ready, you can execute the server like so:

```bash
$ ./webserv <conf_file_path>
```

## 3.1 Features
* Server is non-blocking
* Multi-threaded polling
* File uploading
* GET, POST & DELETE methods
* Able to listen on multiple ports, and serve multiple ip addresses at the same time

## 3.2 Configuration example
```bash
# Comments on empty lines must not have tabs before '#' symbol.
# Tab characters signify that the following parameter is part of the parameter above.
# ':' Separates parameters from their value.
# ',' Separates different values within a parameter.
```
```bash
server_name: webthing # (necessary)
hosts: 127.0.0.1:12345, 127.0.0.2:9999 # At least one necessary.
client_body_size: 60000 # Bytes
methods: GET, POST # default methods (not necessary)
directory_listing: on # default directory_listing (not necessary)
uploads: ./uploads # default upload path (not necessary)
error_pages:
	404: ./site/error_pages/html/404.html # must be inside a location.
	403: ./site/error_pages/html/403.html
# This is a middle of file comment.
cgis:
	.php: /usr/lib/cgi-bin/php # default cgi (not necessary)
	.bla: ./tst/cgi/executables/ubuntu_cgi_tester
#  .html: /mnt/nfs/homes/dait-atm/Git/webserv/tst/cgi/executables/ubuntu_cgi_tester
```
```bash
routes:
	/:
		location: ./  # (necessary)
		redirection: # (not necessary)
			301: /home/ # code must be between 300 and 308 (not necessary).
		methods: GET, POST, DELETE # overides default methods (necessary if default is not defined).
#		uploads: ./other_uploads # overrides default upload path (necessary if default is not defined).
#		cgi: other_php_script.php # overrides default upload path (necessary if default is not defined).
	/home:
		location: ./site
		default_file: index.html # (not necessary)
		directory_listing: on # overrides default directory_listing (necessary if default is not defined).
		client_body_size: 5000000000
# Any default parameters defined after a route definition will not affect the routes above.
```
```bash
server_name: koala # Next server block is defined after parsing encouters an empty line.
hosts: 127.0.0.1:9999
client_body_size: 10
routes:
	/:
		location: ./site/sub2
		methods: GET, POST
		uploads: ./uploads
		directory_listing: on
		cgis:
			.php: /usr/bin/php-cgi
```

# 4. Documentation

- [course on I/O Multiplexing](https://notes.shichao.io/unp/ch6/)
- [how to end a telnet session](https://store.chipkin.com/articles/telnet-how-do-i-end-a-telnet-session-windows-linux-mac)
- [how to use epoll ~~and why~~ (because of the subject, we can not use errno after a read/write)](https://www.suchprogramming.com/epoll-in-3-easy-steps/)
- [ibm's poll course](https://www.ibm.com/docs/en/i/7.1?topic=designs-using-poll-instead-select)
- [in6addr\_any](https://stackoverflow.com/questions/16508685/understanding-inaddr-any-for-socket-programming)
- [à l'aide](http://www.kegel.com/c10k.html#strategies)
- [what is a CGI](https://www.geeksforgeeks.org/common-gateway-interface-cgi/)
- [Web CGI with Bash scripts](http://www.yolinux.com/TUTORIALS/BashShellCgi.html)
- [CGI environement](https://www.commentcamarche.net/contents/142-cgi-les-variables-d-environnement)
- [rfc3875 for CGI/1.1](https://datatracker.ietf.org/doc/html/rfc3875)

# 5. Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Lucas PELLIER - - pellierlucas@gmail.com

Project Link: [webserv](https://github.com/lpellier/webserv)

[built-with-C++]: https://img.shields.io/badge/built%20with-C++-green

[project-url]: https://github.com/lpellier/webserv

[total-lines]: https://img.shields.io/tokei/lines/github/lpellier/webserv
[last-commit]: https://img.shields.io/github/last-commit/lpellier/webserv?style=flat

[stars-shield]: https://img.shields.io/github/stars/lpellier/webserv.svg?style=flat
[stars-url]: https://github.com/lpellier/webserv/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?flat&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 