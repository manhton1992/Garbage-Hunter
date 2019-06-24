# Garbage Hunter

Application that allows you to create a report of garbage on the street that might be useful for others.

This repository is the `Garbage Hunter` project that is made during the course "Advanced Web Development" in Hochschule Darmstadt in SS19.

## Documents

### First discussion

See this [document](https://docs.google.com/document/d/1pZcK6nOgmYxSbN2b9MdQSOWLhik8D2KYSkoZ8O7XWAs/edit?usp=sharing) for our first discussion on 26.05.2019.

### Project pitch

See this [presentation](https://docs.google.com/presentation/d/1I6PNRz_twv2VCshzv1o-vXBFN6c71CpDrIfRMc17KL8/edit?usp=sharing) for our project pitch.

### Backend (`README.md`)

See this [file](backend/README.md) for a complete backend documentation. This covers:

- API references
- Database schemas

### Frontend

...

---

## Project structure

### backend/

- `config`: Configuration setting of the app
- `src/controllers`: Include all routers and controllers of the app
- `src/helpers`: Include the extern function to solve some problem (sending email, uploading image, response and request form)
- `src/models`: Include the models of all objects that are used
- `src/middlewares`: Include all middleware functions of the app
- `src/tests`: Include all tests of the app

### frontend/

- `src/app/core`: Include all pages and components of the app
- `src/app/core/components`: All components being used
- `src/app/core/pages`: All pages being used
- `src/app/models`: Include all models & interfaces of the app
- `src/app/services`: Include all services of the app, to fetch data from the backend API or to put data in the backend API
- `src/middlewares`: Include all middleware functions of the app

### docker/

- `docker-backend/Dockerfile`: Build docker image for backend.
- `docker-frontend/`: Build docker image for frontend (includes also nginx.conf).

### deploy/

- Includes scripts and key for auto deployment.
