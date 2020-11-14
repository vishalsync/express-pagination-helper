/**
 * This function is going to calculate pagination.
 * And return you a pagination meta data if total nuber of page is more than 1.
 * Other wise it will return null.
 */
const express_pagination_helper = ( configuration ) => {

    /**
     * User of this function can pass below parameter to work pagination correctly
     */
    const configuration_info = {
        req: "pass request or req object you get in your controller or function.  [ REQUIRED ]",
        total_data_count: "This is total count or number of your data or records. [ REQUIRED ]",
        page_number: "Pass the current page number or requested page number. (eg:- page_number: 1). [ REQUIRED ]",
        data_per_page: "Pass how many data you want to show per page. (eg:- data_per_page: 10).     [ OPTIONAL ]",
    };

    /**
     * Validating pagination object
     */
    const errorMsg = "Above pagination option you have to pass to this express_pagination_helper function.";
    //Throwing errors if config object is not available.
    if ( !configuration || typeof configuration !== "object" || Array.isArray( configuration ) ) {
        console.table( configuration_info);
        throw Error( errorMsg );
    }

    if ( !configuration.req ) {
        console.table( configuration_info);
        throw Error( errorMsg );
    };

    if ( !configuration.total_data_count ) {
        console.table( configuration_info);
        throw Error( errorMsg );
    };

    /**
     * Validating pagination object
     */

    /**
     * Setting up required option to calculate pagination.
     */
    const req              = configuration.req;//req.object
    const total_data_count = +(configuration.total_data_count) || +(req.total_data_count);//Total number of records.
    const data_per_page    = +(configuration.data_per_page) || Math.abs(+(req.query.data_per_page)) || 10;//Calculating data per page.
    const page_number      = +(configuration.page_number)   || Math.abs(+(req.query.page_number))   || 1;//Current page number..

    const total_page_count = Math.ceil(total_data_count / data_per_page);//Calculating total number of page.

    //BASE URL
    const baseUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}${req.route.path}`;

    /**
     * Calculating next page number
     */
    let next_page_number = 1;
    if ( total_page_count == page_number) next_page_number = total_page_count;
    else if ( total_page_count > 1 && total_page_count >= page_number) next_page_number = page_number + 1;
    else if ( total_page_count > 1 && page_number > total_page_count) next_page_number = total_page_count;

    /**
     * Creating pagination meta data and links.
     * And if total_page_count is 1 then pagination will be null.
     */
    const pagination = total_page_count <= 1 ? null : 
        {
            page_number,
            data_per_page,
            total_page_count,
            total_data_count,

            links: {
                self    : `${baseUrl}?page_number=${page_number}&data_per_page=${data_per_page}`,
                previous: `${baseUrl}?page_number=${next_page_number - 1}&data_per_page=${data_per_page}`,
                next    : `${baseUrl}?page_number=${next_page_number}&data_per_page=${data_per_page}`,
                first   : `${baseUrl}?page_number=1&data_per_page=10`,
                last    : `${baseUrl}?page_number=${total_page_count}&data_per_page=${data_per_page}`,
            },
        };

    //Finally returning pagination object.
    return pagination;

}//End of express_pagination_helper fuction.

module.exports = express_pagination_helper;