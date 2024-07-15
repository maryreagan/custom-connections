# Project Title

Fun project inspired by NYT Connections. I love playing connections every morning and wanted to share a custom made board with friends!
If you'd like to see my current plans for this project check [here!](https://docs.google.com/document/d/1C8kalviR67BXKeRDRLSyyKdGYiF2HUjc92TXtbJWiio/edit?usp=sharing)


## Installation
Instructions for how to install and set up this project:
```bash
git clone https://github.com/maryreagan/custom-connections.git
cd custom-connections
npm install
```
## Environment Configuration

### Why You Need It
The .env file is used to store environment variables that are needed for your application to run. This includes things like database credentials, API keys, and other configuration settings that should not be hardcoded in your source code.

### Setting Up the .env File
Create a .env file in the root directory of your project.
Add the necessary environment variables. Here’s an example of what your .env file might look like:
```env
PORT = yourportnumber
MONGO_URL = yourmongourl
SALT = yoursaltnumber
JWT_SECRET_KEY = yoursecretkey
```

Ensure that your .env file is included in your .gitignore file to prevent it from being committed to your repository.
## Example .env File
Here’s an example .env file for a typical project:

```env
# Server configuration
PORT=3000

# Database configuration
MONGO_URL=mongodb://localhost:27017/yourdatabase

# Security configuration
SALT=10
JWT_SECRET_KEY=yourverysecretkey
```

## Usage

In your terminal, navigate to `server` and use `npm run dev`

In your terminal, navigate to `client` and use `npm start` 

Navigate to `http://localhost:3000` in your web browser
