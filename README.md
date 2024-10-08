## Hi to all!

DemProject was started 9.7.2015 and moved to GitHub 2.9.2015. 

Technologies used: ASP.NET MVC 4, Autofac, JS, jQuery, LINQ, SQL;

This git page - its source code of my project (http://dem.org.ua/).

In future in Wiki I will write documentation about project.


### Build instructions:

Tested on Node 12.13, using VS2022 to build:
> npm install --only=dev

> bower install 
(or individual install of jquery and jquery-ui via bower if automatics fails)

Check that local gulp compiles by running:
> gulp bild-debug

Now build in VS

### Running locally

Update SQL connection credential in connectionStrings of:
> DEM_MVC\Web.config

to connect to local or remote MS SQL DB to debug from VS