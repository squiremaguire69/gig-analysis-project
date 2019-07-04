queue()
    .defer(d3.csv, "data/dashboard.csv")
    .await(makeGraphs);

function makeGraphs(error, dashboardData) {
    var ndx = crossfilter(dashboardData);

    var parseDate = d3.time.format("%d/%m/%Y").parse;
    dashboardData.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Month =d.Date.getMonth();
        d.Price = parseInt(d.Price, 10);
        d.Commission = parseInt(d.Commission, 10)
        //console.log(d.Month);
    });
    
    show_gigs_per_month(ndx);
    show_gigs_by_town(ndx);
    show_gigs_by_venue(ndx);
    show_gigs_by_genre(ndx);
    show_revenue_by_month(ndx);
    show_revenue_by_town(ndx);
    //show_revenue_by_venue(ndx);
    show_avg_comm_per_venue(ndx);
    
    dc.renderAll();
}
    
function show_gigs_per_month(ndx) {
    
     var date_dim = ndx.dimension(dc.pluck('Date'));
    var month_dim = ndx.dimension(dc.pluck('Month'));
    
    var minMonth = month_dim.bottom(1)[0].date;
    var maxMonth = month_dim.top(1)[0];

    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
    var gig = month_dim.group();
    
    console.log(gig.all())
    
     dc.lineChart("#monthly-total-chart")
    .width(1000)
    .height(500)
    .margins({top: 10, right: 50, bottom: 50, left: 50})
    .dimension(date_dim)
    .group(gig)
    .transitionDuration(1000)
    .x(d3.time.scale().domain([minMonth,maxMonth]))
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Month")
    .yAxis().ticks(4);
}

function show_gigs_by_town(ndx){
    var town_dim = ndx.dimension(dc.pluck('Town'));

    var townGroup = town_dim.group();
    console.log(townGroup.all());
    
     dc.barChart("#gigs-by-town")
    .width(500)
    .height(300)
    .margins({top: 10, right: 50, bottom: 50, left: 50})
    .dimension(town_dim)
    .group(townGroup)
    .transitionDuration(1000)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Town")
    .yAxis().ticks(4);
}

function show_gigs_by_venue(ndx) {
    var venue_dim = ndx.dimension(dc.pluck('Venue'));

    var venueGroup = venue_dim.group();
    console.log(venueGroup.all());
    
     dc.barChart("#gigs-by-venue")
    .width(1000)
    .height(600)
    .margins({top: 10, right: 50, bottom: 50, left: 50})
    .dimension(venue_dim)
    .group(venueGroup)
    .transitionDuration(1000)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Venue")
    .yAxis().ticks(4);
}

function show_gigs_by_genre(ndx) {
    var genre_dim = ndx.dimension(dc.pluck('Genre'));
    
    var genreGroup = genre_dim.group();
    console.log(genreGroup.all());
    
     dc.barChart("#gigs-by-genre")
    .width(500)
    .height(300)
    .margins({top: 10, right: 50, bottom: 50, left: 50})
    .dimension(genre_dim)
    .group(genreGroup)
    .transitionDuration(1000)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Genre")
    .yAxis().ticks(4);
}

function show_revenue_by_month(ndx) {
    //var date_dim = ndx.dimension(dc.pluck('Date'));
    var month_dim = ndx.dimension(dc.pluck('Month'));

    
    var revenue_by_month = month_dim.group().reduceSum(dc.pluck('Price'));
    console.log(revenue_by_month.all());
    
    dc.pieChart('#revenue-by-month')
    .height(330)
    .radius(90)
    .transitionDuration(1500)
    .dimension(month_dim)
    .group(revenue_by_month)
}    
    
function show_revenue_by_town(ndx) { 
    //var date_dim = ndx.dimension(dc.pluck('Date'));
    var month_dim = ndx.dimension(dc.pluck('Month'));

    
    var town_dim = ndx.dimension(dc.pluck('Town'));
    
    var revenue_by_town = town_dim.group().reduceSum(dc.pluck('Price'));
    console.log(revenue_by_town.all());
    
     dc.pieChart('#revenue-by-town')
    .height(500)
    .radius(200)
    .transitionDuration(1500)
    .dimension(month_dim)
    .group(revenue_by_town)
}

// //function show_revenue_by_venue(ndx) {
//     var month_dim = ndx.dimension(dc.pluck('Month'));
    
//     var venue_dim = ndx.dimension(dc.pluck('Venue'));
     
//     var revenue_by_venue = venue_dim.group().reduceSum(dc.pluck('Price'));
//     console.log(revenue_by_venue.all());
    
//      dc.pieChart('#revenue-by-venue')
//     .height(330)
//     .radius(90)
//     .transitionDuration(1500)
//     .dimension(month_dim)
//     .group(revenue_by_venue)
// }

function show_avg_comm_per_venue(ndx) {
    var venue_dim = ndx.dimension(dc.pluck('Venue'));
     
    var avg_commission_per_venue = venue_dim.group().reduce( 
        
        function(p, v) {
            p.count++;
            p.total += v.Commission;
            p.average = p.total/p.count;
            return p;
        },
        
        function(p, v) {
            p.count--;
            if(p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Commission;
                p.average = p.total / p.count;
            }
            return p;
        },
        
        function() {
            return {count: 0, total: 0, average: 0};
        }
        );
         console.log(avg_commission_per_venue.all());
         
        var avg_chart = dc.barChart('#avg-commission-per-venue')
        
        avg_chart
        .width(1500)
        .height(300)
        .dimension(venue_dim)
        .group(avg_commission_per_venue)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal);
}




 
   

    
       
   
    

    
      

   