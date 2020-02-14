## Book Highlights

**Tech Stack**

 -  Angular v8
 -  RxJS
 -  CSS (Sass)
 -  Typescript
 -  NgRx/store 
 -  Jasmine (Unit Test)
 -  Cypress (Integration Test)
 
**Installation**
  

> First thing first

git clone https://github.com/ifont21/book-highlights.git

    cd book-highlights > npm install > npm start
**Node JS** v12.14.1

**Important Scripts**

 1. *npm run test* -> to run tests
 2. *npm run test:watch* -> to run tests and keep an eye on them
 3. *npm run open:coverage*-> to visualize code coverage after running tests
 4. *npm run lint* -> to validate rules code
 5. *npm run int:test* -> to run integration test
 5. *npm run int:test:browser* -> to run integration test showing the browser

 **Note**: I needed to run integration test using sudo. Cypress installation got some issues maybe related with permissions so if sudo doesn't work for just simple install dependencies please run like this

 `npm install --unsafe-perm`

**Usage**


There is only one screen to navigate where you can find 3 sections

 - Highlight color picker
 - TextArea to Highlight words or phrases.
 - a List of highlights that were added when you highlight on the TextArea
 - a Filter Feature to filter by colors you've highlighted with ( if you select one color you'll see one color, if you select two colors you'll see two colors and if you select all of three or none of them you will get the whole list )
 - a Reset button which clean up your textArea value to start again if you desire it.
 - a Constraint to avoid overlapping highlights, when this thing ocurres it shows an error message
 - Responsive UI -> you can resize the browser and see how this respond.
 
**Project Definition**

 ***Modules***

 Let's get started talking about modules, we're gonna find two main important modules on the project that are *SharedModule* and *HighlighterModule*. the shared one encapsulates the Main logical operation to highlight words in a Text Area element. I've Created one module that lives inside the Shared Module called *Input Text Area Module*. 
 But, why did I do that ? I think the first thing to go over before starting develop a component is to see if we can reuse it in the future or on that moment taking into account the design you're dealing with, so all the logic related to highlight using colors is pretty much done in this module.
 The other module Highlight is in charged to shape the layout for the main ( and Only One ) Screen you appreciate in the App.

***Components***

As I said before, about the main module which is the Input Text Area Module, we can find the huger logic here so I used a "State management" made by services whose main function is to keep updated the State, so what did i not use Redux? 
Because is made to solve problems where the application state is really huge that your code wind up a bit cluttered up if you're handling it with a simple service. But this is not the case i can easily drive the state using a single service for three components and the DOM events will be driven by Directives as i think should be. Must of them are using the *OnPush* change detection in order to speed up a little bit the application and off course this is achieve it creating *Containers* and *Stateless* Components.

***Services***
Services here have taken the Responsibility to handle the most of logic taking advantage of the *Dependency Injection* and that's how we achieve one the most important principles in the Software Engineering called **SOLID**.

***Store***
A store was included to handle the application state, so basically you can dispatch actions like select a color to highlight, set filters, set an error, update highlights, get all information about that state. At least but not last this fit perfect to use containers and components since the containers are those that are dealing with the application state.

 
