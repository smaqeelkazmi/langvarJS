# langvarJS

A lightweight library to use variables/objects into your html.

### How to use?

Here is the basic step to use dynamic variables in your html file

**Example 1:**
This example will show you how to use a variable into your html file by using element attributes:

*HTML*

    <span lv="myVariable"></span>

*Javascript*
    
    var obj = {
        myVariable: "this is my first dynamic variable using LangVarJS"
    };
    var LangVar = new LangVar(obj);

for `W3C` validation standards you can use `data-` attribute as a prefix, see example below:

*HTML*

    <span data-lv="myVariable"></span>

*Javascript*
    
    var obj = {
        myVariable: "this is my first dynamic variable using LangVarJS"
    };
    var LangVar = new LangVar(obj, 'data-');

**Example 2:**
The `module()` method gives you the feature creating a module and use `%` sign to define variables in your contents dynamically. In this example we will use a `Module` to define multiple variables using `%` sign

*HTML*

    <p lv-module="myModule">
        Hi! My name is %NAME% and I live in %HOME_TOWN%, 
    </p>

*Javascript*
    
    var LangVar = new LangVar();
    LangVar.module('myModule', {
        NAME : 'John Doe',
        HOME_TOWN: 'Jhelum'
    });

### How to update values?
You can update your `variables` dynamically using `update()` method. In this example I will use `update()` to update `HOME_TOW` in `myModule` *module* dynamically:

*Javascript*

    LangVar.update('myModule', {
        HOME_TOWN: 'ISLAMABAD'
    })

or we can update the basic variables that I used in *Example 1* which are defined by using DOM attributes:

*Javascript*

    LangVar.update({
        myVariable: 'Ahh...! It's very easy to use and update the HTML content'
    })
    
Test 1
