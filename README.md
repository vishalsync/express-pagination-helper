# Why you should use this?

This package help you with generating pagination info, like meta data and links.
You just have to import this module. And pass some information to the function.
And this packages is going to calculate page number etc for you.


# Installation

`npm i express-pagination-helper --save`

Then...

...

const expressPaginationHelper = require("express-pagination-helper");

const controller = ( req, res, next ) => {

    const = pagination = paginationHelper({
        req: req, 
        total_data_count: 50, 
        page_number: 1
    });

    res.json({
        pagination,
    });

}//End of controller



...


## Options

express-pagination-helper support few options:

* req: "Pass request or req object you get in your controller or function.  [ REQUIRED ]".
* total_data_count: "This is total count or number of your data or records. [ REQUIRED ]".
* page_number: "Pass the current page number or requested page number. (eg:- page_number: 1) [ REQUIRED ]".
* data_per_page: "Pass how many data you want to show per page. (eg:- data_per_page: 10). [ OPTIONAL ]".


