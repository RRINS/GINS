# GINS 
GUI Inertial Navigation System

## INSTRUCTIONS FOR USER INSTALLATION (Windows)
1. Download the GINS Setup.exe file from the [most recent release](https://github.com/RRINS/GINS/releases)'s installer package.

# Developers Only!

## EXTRA INSTALLATION INSTRUCTIONS (Windows)
2. Install [node.js/npm](https://nodejs.org/en/download/). Check the box that installs extra packages!!
3. Install [GitHub Desktop](https://desktop.github.com/) and link your account. Then, [clone this repository onto your system](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
4. Install [VSCode](https://code.visualstudio.com/) and open the folder you cloned the repository into.
5. Install packages by typing `npm install` into the terminal

## Available Commands
 - `npm start` - Start the application in "debug" mode. The console can be accessed by doing `CTRL+SHIFT+i`
 - `npm run build` - Run the electron-builder and create an installer on your system (can be found in the `dist` directory)
 - `npm run deploy` - Run the electron-builder, create an installer on your system, and push it as a release draft in the LE-Controls releases. Need to have a GitHub Access Token in `electron-builder.yml` first (DO NOT PUSH THIS TOKEN)
