# 1540 Stand Scouting Template 🏁

**Stand Scouting App Template for Team 1540 The Flaming Chickens 🏁**

## Instructions for Use:

1. ```git clone https://github.com/flamingchickens1540/companal-2017/tree/master/stand-scouting-app-template```
2. ```npm i``` or ```npm install``` (Both work)
3. ```npm start```

## Question Types:

* ### Multiple Choice:
  * Includes a title with 2-5 choices, [bootstrapped](http://getbootstrap.com/) buttons choices and button colors, and a JSON key of your choice
  * 2 Choices:
    * ```<div class="multiple-choice" id="demo-mc-1" data-title="Multiple Choice Demo 1" data-choice-1="Option 1" data-choice-2="Option 2" data-json="demo-mc-1"></div>```
  * 3 Choices:
    * ```<div class="multiple-choice" id="demo-mc-2" data-title="Multiple Choice Demo 2" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-json="demo-mc-2"></div>```
  * 4 Choices:
    * ```<div class="multiple-choice" id="demo-mc-3" data-title="Multiple Choice Demo 3" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-choice-4="Option 4" data-json="demo-mc-3"></div>```
  * 5 Choices:
    * ```<div class="multiple-choice" id="demo-mc-4" data-title="Multiple Choice Demo 4" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-choice-4="Option 4" data-choice-5="Option 5" data-json="demo-mc-4"></div>```
  * More on the syntax is explained under the "Syntax" header
* ### Select All That Apply (Checkboxes)
  * Includes a title with 2-4 choices, [bootstrapped](http://getbootstrap.com/) buttons choices and button colors, and a JSON key of your choice
  * 2 Checkboxes:
    * ```<div class="checkbox" id="demo-c-1" data-title="Checkbox Demo 1" data-choice-1="Option 1" data-choice-2="Option 2" data-json="demo-c-1"></div>```
  * 3 Checkboxes:
    * ```<div class="checkbox" id="demo-c-2" data-title="Checkbox Demo 2" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-json="demo-c-2"></div>```
  * 4 Checkboxes:
    * ```<div class="checkbox" id="demo-c-3" data-title="Checkbox Demo 3" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-choice-4="Option 4" data-json="demo-c-3"></div>```
  * More on the syntax is explained under the "Syntax" header
* ### Counter
  * Includes a title with a counter that increments by 1s, [bootstrapped](http://getbootstrap.com/) buttons and button colors, and a JSON key of your choice
  * ```<div class="increment-counter" id="demo-co" data-title="Counter Demo" data-json="demo-co"></div>```
  * More on the syntax is explained under the "Syntax" header
* ### Short Answer
  * Includes a title with a ```<textarea></textarea>```, [bootstrapped](http://getbootstrap.com/), adjustable size, and a JSON key of your choice
  * ```<div class="short-answer" id="demo-sa" data-title="Short Answer Demo" data-placeholder="Comments..." data-json="demo-sa"></div>```
  * More on the syntax is explained under the "Syntax" header
* ### Slider
  * Uses [noUiSlider](https://refreshless.com/nouislider/) library
  * Includes a title with up to 4 sliders, customizable colors, and a JSON key of your choice
  * 2 sliders
    * ```<div class="slider" id="demo-s-1" data-title="Slider Demo 1" data-sliders="2" data-json="demo-s-1"></div>```
  * 3 sliders
    * ```<div class="slider" id="demo-s-2" data-title="Slider Demo 2" data-sliders="3" data-json="demo-s-2"></div>```
  * 4 sliders
    * ```<div class="slider" id="demo-s-3" data-title="Slider Demo 3" data-sliders="4" data-json="demo-s-3"></div>```
  * More on the syntax is explained under the "Syntax" header
* ### Cycle Submit
  * Includes a title with up to four options, a submit button (customizable), a badge on how many times submitted, and a JSON key of your own choice
  * 2 Options
    * ```<div class="cycle-submit" id="demo-cs-1" data-title="Cycle Demo 1" data-choice-1="Option 1" data-choice-2="Option 2" data-submit-title="Submit" data-json="demo-cs-1"></div>```
  * 3 Options
    * ```<div class="cycle-submit" id="demo-cs-2" data-title="Cycle Demo 2" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-submit-title="Submit" data-json="demo-cs-2"></div>```
  * 4 Options
    * ```<div class="cycle-submit" id="demo-cs-3" data-title="Cycle Demo 3" data-choice-1="Option 1" data-choice-2="Option 2" data-choice-3="Option 3" data-choice-4="Option 4" data-submit-title="Submit" data-json="demo-cs-3"></div>```
  * More on the syntax is explained under the "Syntax" header

## Syntax

### Multiple Choice

Class of ```multiple-choice``` makes a multiple choice question. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. the id attribute is the class of the buttons for easy access to get the value. data-choice-1 is the first button, and can be added up to data-choice-5, but in increasing order.

### Select All

Class of ```checkbox``` makes a select all question. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. the id attribute is the class of the buttons for easy access to get the value. data-choice-1 is the first button, and can be added up to data-choice-4, but in increasing order.

### Counter

Class of ```increment-counter``` makes a counter that increments by 1s. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. the id attribute is used to create an additional class for the number display.

### Short Answer

Class of ```short-answer``` makes a textarea. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. the id attribute is the class of the textarea for easy access to get the value.

### Slider

Class of ```slider``` makes a slider. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. **The id attribute is necessary for the slider to function**. data-sliders can take an input from 1-4, for the number of sliders. Color is adjustable with CSS by using the class slider-#-#, where is first # is how many sliders total, and the second # is the number (1-indexed) position of the slider.

### Cycle Submit

Class of ```cycle-submit``` makes a cycle submit question. data-title is displayed as an ```<h3></h3>``` title. data-json is the key of the field in the JSON file. the id attribute is the class of the buttons (except for the submit) for easy access to get the value. data-choice-# is used for the button names, where # is a number from 2-4, in increasing order.
