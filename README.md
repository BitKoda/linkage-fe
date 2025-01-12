# LinkAge

## Table of contents

- [About <a name="about"></a>](#about-)
- [Tech Stack <a name="tech-stack"></a>](#tech-stack-)
- [Description <a name="Description"></a>](#Description-)
- [Setup <a name="Setup"></a>](#Setup-)
- [Installation <a name="Installation"></a>](#Installation-)


## About <a name="about"></a>

LinkAge is an app designed to help connect isolated elderly individuals with volunteers. Volunteers make appointments via the app to visit elderly people in their neighbourhood with the sole aim of providing companionship and combating loneliness.

## Tech Stack <a name="tech-stack"></a>

- React
- Material UI
- MongoDB
- JWT
- Jest
- Express.js

The back end for this project can be found here: https://github.com/BitKoda/nc-group-project

## Description  <a name="Description"></a>

`A hosted version` of this LinkAge app can be found at https://nc-project-age-ok.netlify.app/
<br>
LinkAge is responsive with a mobile first approach.
<br>

1. User first needs to sign up as a volunteer with an email, password and a postcode or directly login to their account. 
2. The home page loads all the people available for a visit (visitees) on an interactive map. The green colour of the card means the person has been seen within the last 24 hours, Amber colour - within the last 48 hours and red - 72 hours and is in need to socialise. 

3. User can click on any visitee card to see their profile info and submit a new visit <br> 
4. User can also see and modify their own profile info. <br> 

## Setup <a name="Setup"></a>

You will need Node.js version 17.8.0 or higher and npm version 8.1.2 installed before being able to run this project.

## Installation <a name="Installation"></a>

To run this project you will need to clone this repository onto your local machine.

```
$ git clone https://github.com/imevanc/nc-project-phase-fronted-ageuk.git
```

Navigate inside the folder and install all dependencies by entering the following commands on your terminal window:

```
$ cd nc-project-phase-fronted-ageuk
$ npm install
```

To run the application locally enter:

```
$ npm start
```

The application will run on http://localhost:3000.
