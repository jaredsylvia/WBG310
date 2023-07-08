## Week 2 Project
This is my first attempt at a node.js MVC project.

## Installation

```bash
npm install
```

## Usage
Make a directory named "data" that'll store a sqlite database.
```bash
node app.js
```

## Changes
Refactored everything, actually have models now. May need to reconsider them a bit, but I don't know really.

## Todo
Make everything look the same, add nice nav bars, actually spend some time on the css to make it pretty.
Use env stuff to store things like site name, maybe some seo metadata or something?
Switch to MySQL for structured data.
Figure out a way to programmatically take unstructured data and make a page. Like a MongoDB collection, objects could be like
{title : "CIS101",
description : "Basic Arduino scripting and IoT concepts.",
link: "https://someurl.to/something/",
image: "https://someurl.to/someImage"}
And then just iterate over whatever objects and arrays there are - figure out some way that could organize them into different div elements.
Something like maybe splitting the content area into a 3 wide grid, counting the items in the object and dividing by 3
Then just iterate over every item, sort the ones that are the same and then figure out math to evently space everything out.
If an object has three images, two text boxes, and one link then it would end up:
image, text, image,
link, image, text
User creation and role based authentication and authorization.
Refactor script.js

## License
I took bootstrap out of my repo and just linked to it directly, I had to change the image in righCol.ejs to be a thumbnail due to newer version.

All my code do whatever with I guess.

