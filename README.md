<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Nate-go/connect-helper-frontend">
    <img src="https://res.cloudinary.com/dsrtzowwc/image/upload/v1701067076/logo-web_rboojw.png" alt="Logo" width="300" height="150">
  </a>

  <h3 align="center">connect-helper-frontend</h3>

  <p align="center">
    This README find for the connect-helper-frontend project!!
    <br />
    <a href="https://github.com/Nate-go/connect-helper-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Nate-go/connect-helper-frontend">View Demo</a>
    ·
    <a href="https://github.com/Nate-go/connect-helper-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Nate-go/connect-helper-frontend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#architecture-diagram">Architecture Diagram</a></li>
        <li><a href="#database-diagram">Database Diagram</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![readme01](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/a55fd7aa-8cde-476e-bc63-4bc02299a57f)

Welcome to Connection Helper – the intelligent connection management platform for your business!

Connection Helper is an efficient tool designed to assist businesses in optimizing the management and interaction within their network of connections through Gmail. With a user-friendly interface and diverse features, we provide you with the essential tools to enhance the management of contacts and key relationships in today's business world.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![PostgreSQL][PostgreSQL.com]][PostgreSQL-url]
* [![Google API][Google API.com]][Google API-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]
* [![React][React.com]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project structure
```
.
├───app
│   ├───Console
│   │   └───Commands
│   ├───Constant
│   ├───Events
│   ├───Exceptions
│   ├───Http
│   │   ├───Controllers
│   │   ├───Requests
│   │   ├───Middleware
│   │   └───Resources
│   ├───Jobs
│   ├───Mail
│   ├───Models
│   ├───Providers
│   ├───Services
│   │   └───ModelServices
│   └───Traits
│       ├───Model
│       └───ServiceInjection
├───bootstrap
│   └───cache
├───config
├───database
│   ├───factories
│   ├───migrations
│   └───seeders
├───public
│   ├───build
│   │   └───assets
│   ├───css
│   ├───img
│   ├───js
│   └───storage
├───resources
├───routes
├───scripts
├───storage
├───tests
│   ├───Feature
│   └───Unit
│       └───Services
│           └───ModelServices
│               ├───ExamServiceTest
│               ├───GradeServiceTest
│               ├───InsistenceServiceTest
│               ├───RoomServiceTest
│               ├───SchoolYearServiceTest
│               ├───StudentServiceTest
│               ├───SubjectServiceTest
│               ├───TeacherServiceTest
│               └───UserServiceTest
└───xdebug
    ├───.azure
    │   ├───i386
    │   └───macos
    ├───.build.scripts
    ├───.circleci
    ├───.github
    │   └───workflows
    ├───.xdebugci
    ├───contrib
    ├───m4
    ├───src
    │   ├───base
    │   ├───coverage
    │   ├───debugger
    │   ├───develop
    │   ├───gcstats
    │   ├───lib
    │   ├───profiler
    │   └───tracing
    └───tests
        ├───base
        ├───coverage
        ├───debugger
        │   └───dbgp
        ├───develop
        ├───filter
        │   ├───foobar
        │   ├───stack
        │   └───xdebug
        │       └───trace
        ├───gcstats
        ├───library
        ├───profiler
        └───tracing
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Architecture diagram

![screenshot_1701221987](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/3da6df60-adee-4d8a-878c-e4dee9a71d41)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Database diagram

![Untitled diagram-2023-11-29-013624](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/ae289763-57a3-4810-a673-f7d12b9bd1ed)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to clone and run the Laravel project connect-helper-frontend on your local machine:

### Prerequisites

1. PHP: You'll need PHP version 10. or higher installed on your machine. You can check your PHP version by running php -v in the command line.

2. Composer: Composer is a PHP package manager that is required for Laravel. You can download and install it from the official website: https://getcomposer.org/download/

3. PostgressSQL: Ensure you have a PostgressSQL database server set up or any other database supported by Laravel.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repository:
   ```sh
   git clone https://github.com/Nate-go/connect-helper-frontend.git
   git clone https://github.com/Nate-go/connect-helper.git
   ```
2. Navigate to the project directory:
   ```sh
   cd connect-helper-frontend
   cd connect-helper
   ```
3. Install project dependencies:
   ```sh
   npm install
   composer install
   ```
4. Create a copy of the `.env.example` file and rename it to `.env`:
   ```sh
   cp .env.example .env
   ```
5. Generate the application key:
   ```sh
   php artisan key:generate
   ```
6. Configure the database:
    * Open the `.env` file in a text editor.
    * Set the database connection details like `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` according to your PostgressSQL setup.
8. Run the database migrations and seed:
   ```sh
   php artisan migrate
   ```
9. Serve the application and active queue:
   ```sh
   npm run dev
   php artisan queue:work
   php artisan serve
   ```
10. Open your web browser and navigate to http://localhost:5317 to see the application running.
   
Congratulations! You have successfully cloned, installed, and run the Laravel project on your local machine. Now you can start exploring and customizing it for your needs. If you encounter any issues, feel free to open an issue on the project's repository or seek help from the Laravel community. Goodluck!
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This website will help you to manage the connection issue
![ch-12-login](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/e1077f36-3141-4c7d-85ff-0449a86e5a6c)

![ch-12-select-gmail](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/19aa9d07-4fb5-47e8-b3f9-f130b77d1c1a)

![ch-12-sign-up](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/5e30d6d8-cbe1-43eb-8a3f-1999f5b089f1)

![ch-13-connection-table](https://github.com/Nate-go/connect-helper-frontend/assets/140036945/2cf0578d-dab9-4efe-8fc2-706a01c07eb3)

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/Nate-go/connect-helper-frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nate - nate.ha.goldenowl@egmail.com

Project Link: [https://github.com/Nate-go/connect-helper-frontend](https://github.com/Nate-go/connect-helper-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Nate-go/connect-helper-frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/Nate-go/connect-helper-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Nate-go/connect-helper-frontend.svg?style=for-the-badge
[forks-url]: https://github.com/Nate-go/connect-helper-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/Nate-go/connect-helper-frontend.svg?style=for-the-badge
[stars-url]: https://github.com/Nate-go/connect-helper-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Nate-go/connect-helper-frontend.svg?style=for-the-badge
[issues-url]: https://github.com/Nate-go/connect-helper-frontend/issues
[license-shield]: https://img.shields.io/github/license/Nate-go/connect-helper-frontend.svg?style=for-the-badge
[license-url]: https://github.com/Nate-go/connect-helper-frontend/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[PostgreSQL.com]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Google API.com]: https://img.shields.io/badge/Google%20API-4285F4?style=for-the-badge&logo=google&logoColor=white
[Google API-url]: https://cloud.google.com/docs/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[React.com]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
