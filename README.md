# Solar Map


Solar Map is a solar calculator. The web app allows users to search for an address in a map, draw a solar installation, and calculate its nominal power.

![Screen](/solar.gif?raw=true "Solar Map")


Powered by Google Maps.
Code snippets were taken from the Google Maps API [documentation](https://developers.google.com/maps/documentation/), and also from [here](https://stackoverflow.com/questions/12004550/how-to-delete-all-the-shape-after-draw/12006751), and [here](https://stackoverflow.com/questions/10298549/how-i-get-coordinates-with-drawing).

# Instructions
Notice: I originally setup a Flask backend thinking it would be useful (it wasn't), all it does is serve the html/js.

* Clone repo, navigate to its directory, then, in a terminal, type the following:
```
pip install -r requirements.txt
```

* then:
```
python app.py
```

* Alternatively, if the above is too cumbersome:
download [this zip file](https://www.dropbox.com/s/vj04bx7g9o6ik0h/solar%20calulator.zip?dl=0), extract everything, and open index.html in a browser.

