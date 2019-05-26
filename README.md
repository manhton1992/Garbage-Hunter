# Garbage Hunter App

Application that allows you to create a report of garbage on the street that might be useful for others

## Project pitch

See this [presentation](https://docs.google.com/presentation/d/1I6PNRz_twv2VCshzv1o-vXBFN6c71CpDrIfRMc17KL8/edit?usp=sharing) for our project pitch

## Installation

1. Clone the project
2. Run your `MongoDB` (default is port 27017)
3. In `/backend` run:

    ```bash
    > npm install
    > npm run dev
    ```

4. In `/frontend/garbage-hunter-frontend` run:

    ```bash
    > npm install
    > ng serve
    ```

## Project structure

### Backend

- `config`: Configuration setting of the app
- `src/controllers`: Include all routers and controllers of the app
- `src/middlewares`: Include all middleware functions of the app
- `src/models`: Include the models of all objects that are used
- `src/tests`: Include all tests of the app

### Frontend

- `src/app/core`: Include all pages and components of the app
- `src/app/core/components`: All components being used
- `src/app/core/pages`: All pages being used
- `src/app/models`: Include all models & interfaces of the app
- `src/app/services`: Include all services of the app, to fetch data from the backend API
