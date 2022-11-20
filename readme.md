# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Change Name/Text on the Website
Find the following line and change the string value "Happy Patel" to whatever you like.

File script.js:
```
Line 51: const textGeometry = new TextGeometry("Happy Patel", {
```
