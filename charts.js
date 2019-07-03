queue()
    .defer(d3.csv, "data/dashboard.csv")
    .await(makeGraphs);

function makeGraphs(error, dashboardData) {
    var ndx = crossfilter(dashboardData);

    var parseDate = d3.time.format("%d/%m/%Y").parse;
    dashboardData.forEach(function(d) {
        d.Date = parseDate(d.Date);
    });
    
    
    var date_dim = ndx.dimension(dc.pluck('Date'));
    
    var town_dim = ndx.dimension(dc.pluck('Town'));
    var venue_dim = ndx.dimension(dc.pluck('Venue'));
    var genre_dim = ndx.dimension(dc.pluck('Genre'));
    
    var month_group = date_dim.group().reduceCount();
        console.log(month_group.all);
       

    var minDate = date_dim.bottom(1)[0].Date;
    var maxDate = date_dim.top(1)[0].Date;

    var monthly_total_chart = dc.barChart("#monthly-total-chart")

    monthly_total_chart
        .width(1000)
        .height(500)
        .dimension(date_dim)
        .group(month_group)
        .x(d3.time.scale())
        .xAxisLabel("Month")
        .yAxisLabel("No. of Gigs");

    //     dc.barChart("#gigs-by-town") 
    //   .width(1000)
    //   .height(500)
    //   .dimension(town_dim)
    //   .group(total_gig_count_by_month)
    //   .x(d3.scale.ordinal().domain("Town"))
    //   .xAxisLabel("Town"); 


    dc.renderAll();
}