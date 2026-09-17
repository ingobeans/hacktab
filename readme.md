# hacktab

hacktab is a custom new-tab thats made to be very customizable!

![screenshot](https://cdn.hackclub.com/01a0b17a-7d20-7eb1-a179-cba0ad9c5938/paste-1789683989038.png)

^ this screenshot shows a configuration where i've added a clock widget, some text, and embedded my school schedule (blurred in the screenshot for privacy)

## project structure

the project is designed to be very modular. each widget is defined as a unique file under `widgets/`, and are compiled to a single JS file which is loaded on the browser.

this is done by the `dev/compile-widgets.js` script.

each widget can have three files in the widgets directory:
* one main file, which is just the name of the widget + ".html"
* one file defining the settings for the widget, which is just name + ".settings.html"
* one JS script which is ran on load, which is just name + ".js"

the core of widgets work around a sort of templating i implemented. 

since each widget has some settings relevant to it (defined in the .settings.html file),
these settings can be read by writing `{keyname}` in the html. in runtime this is evaluated based on the current active settings.

by adding an ampersand after the key name in templating, i.e. `{keyname&}`, newlines will be replaced with `<br>`.

the settings page can also define inputs with the `linkedSetting` attribute. this just means this input's value will be tracked, stored in localStorage, and live synced to the widget.

to help understand this system, check out `widgets/iframe.html` and its corresponding `widgets/iframe.settings.html` for a basic example.

### building yourself

you need nodejs installed to build the widgets

then you'll just need to run `node dev/compile-widgets.js` whenever you update a widget, then just opening the `index.html` file will show you the final page.


## currently implemented widgets

* time - clock that shows the current time, configurable size and whether to include seconds
* text - simple text with configurable value, size, and alignment
* iframe - embed another html page, configurable url
* note - a field of text that can be edited, configurable size

more widgets will be implemented later ! (feel free to PR)

planned: hackatime daily/weekly targets, weather

## other features

widgets can be configured from the settings page (button in top left corner).

here you can add, delete, and re-order widgets

![settings screenshot](https://cdn.hackclub.com/01a0b18a-feaf-784d-a214-43aef3351d9e/paste-1789685070892.png)


---

<sup>no AI • zero dependencies</sup>