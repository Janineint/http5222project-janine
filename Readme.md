# What Should We Eat Today?

A simple web application that helps users decide what to eat by suggesting recipes based on their preferences, queried through a short quiz. It also provides a fun food trivia fact with each suggestion.

## Features

* **Recipe Suggestion Quiz**: Guides users through selecting cuisine, diet restrictions, and dish type to find a suitable recipe.
* **Edamam API Integration**: Fetches recipe suggestions (name, image, cuisine type) based on quiz answers from the Edamam v2 API.
* **Spoonacular API Integration**: Retrieves random food trivia facts from the Spoonacular API.
* **Simple Frontend**: Basic user interface created with HTML, CSS, and vanilla JavaScript.
* **Node.js Backend**: Built with Node.js and the Express framework to handle API requests and serve the frontend.

## Prerequisites

* [Node.js](https://nodejs.org/) (which includes npm) installed on your system.

## Setup and Installation

1.  **Clone the repository (or download the code folder):**
    ```bash
    # If using git
    git clone <repository-url>
    cd http5222project-janine
    ```
    (Or navigate to the downloaded `http5222project-janine` folder)

2.  **Install Dependencies:** Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```

3.  **Environment Variables:** Create a file named `.env` in the root directory of the project. Add the following lines, replacing the placeholders with your actual API keys and credentials:
    ```dotenv
    # Port for the server (optional, defaults to 3000 if not set)
    PORT=3000

    # Edamam API Credentials (Required)
    EDAMAM_APP_ID=YOUR_EDAMAM_APP_ID
    EDAMAM_APP_KEY=YOUR_EDAMAM_APP_KEY
    EDAMAM_USER_ID=YOUR_EDAMAM_USER_ID # Needed for specific Edamam API header

    # Spoonacular API Key (Required)
    SPOONACULAR_API_KEY=YOUR_SPOONACULAR_API_KEY
    ```
    *You need to sign up for accounts at [Edamam](https://www.edamam.com/) and [Spoonacular](https://spoonacular.com/food-api) to get these keys.*

## Running the Application

1.  **Start the Server:** From the project's root directory, run:
    ```bash
    node app.js
    ```
2.  **Access the Application:** Open your web browser and navigate to `http://localhost:3000` (or the port you specified in the `.env` file).

## Project Structure

* `app.js`: The main backend Express server file. Handles API routing and server logic.
* `package.json`: Defines project metadata, dependencies, and scripts.
* `package-lock.json`: Records exact versions of dependencies.
* `.env` (You need to create this): Stores environment variables like API keys and port number.
* `public/`: Contains the static frontend files.
    * `index.html`: The main landing page.
    * `question.html`: The quiz page.
    * `script.js`: Frontend JavaScript for quiz logic and API interaction.
    * `style.css` / `styles.css`: CSS files for styling the pages.
* `node_modules/`: Directory where npm installs project dependencies (automatically generated).

## API Endpoints (Backend)

* `POST /api/recipe`: Expects a JSON body with `cuisineType`, `diet`, and `dishType`. Queries the Edamam API and returns a random matching recipe's name, image, and cuisine type.
* `GET /api/trivia`: Queries the Spoonacular API for a random food trivia fact and returns it.