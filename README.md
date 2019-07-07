#Gig Analysis Dashboard for Music Venue Connect


##Purpose

The basis of this project is to explore some of the data presentation options that could be used in relation to my future business project utilising the type of information that I am currently using while running the Music Venue Connect business manually.
In the automated business that I am planning on setting up there will be an Admin section where members of our staff will have access to the system to perform maintenance and generate action lists based on what is happening in their area of responsibility.  I would be aiming to use user specific dashboards to provide them with the necessary management level information to help them target their activities in the most productive manner possible.


##Scope

For this project the scope has been intentionally kept quite tight and only looking at some basic activity and financial information.  In the business instance I would be looking to include a lot more sophisticated statistical analysis across a number of important business data points.
The current business supplies musical acts to venues across Kerry for a nominal commission.  There are a large number of venues and acts that we deal with but to represent the type of data I would be looking to use on the dashboard in the automated business I selected 50 venues and created 20  fictional bands with a few general attributes that I would normally be using within the business.  
Using Excel, I created a dataset combining some simple data attributes for the venues and acts and provided some random bookings across the year which completed the dataset for use in this exercise.

This data is presented using splits and titles;
There will be a month selector included to dynamically change the data shown in the graphs based on the month selected.
1.	Annual number of bookings totalled by month in a barchart.
2.	Total Gigs booked by town, genre and venue in separate barcharts.
3.	The annual revenue figures shown in pie chart form with each slice representing a month of the year.
4.	Additional pie charts showing the distribution of revenue based on the town and venue.
5.	Finally a bar chart which shows the average commission earned from each of the venues in the dataset.

The original design spec can be found at this [link](../reference/Interactive  Front End Design Project Spec.pdf)

The original wireframe designs can be seen [here](../reference/Gig Analysis Interactive Frontend Project Wireframes.pdf)

##Future Features

I included the Latitude and Longitude figures as I was hoping to include a map API with colour coded markers to show where the venues were with the most gigs.  Unfortunately time did not allow me to include this in my final version.

The styling has been kept simple to make the page look clean and fresh but there could be a lot of additional styling elements added to a fully operational solution which I will be aiming to do with further projects in this course as I build the basis for my business solution. There are some issues with the responsiveness of the page with lower size screens which I would hope to address with additional time.

I would be looking to add a lot of additional data elements for analysis in the production version as there are a number of metrics that I will hopefully introducing as part of later stages in this course.


##Technology

The dashboard was built using a combination of D3,Crossfilter and DC JavaScript Libraries in conjunction with Bootstrap HTML & CSS.

##Testing

I have utilised the output from the Excel file which I used to generate the original dataset and pivot charts, which formed the basis of my page design, to compare the console output for each of the data groups to validate that the calculations were working effectively.

##Acknowledgements

I would like to acknowledge the support of my mentor Seun Owonikoko who helped me to solve the problem of getting the month names to appear in the selector rather than the numerical values that were produced when I grouped on month using the getMonth function.


##Deployment

This project has been stored on gitHub at this location <https://github.com/squiremaguire69/gig-analysis-project>.

Deployment has been done via GitHub pages @ <https://squiremaguire69.github.io/gig-analysis-project/>

##Challenges

As I am doing the Bootcamp version of the course, and have not done any programming in the past, I have found it difficult to get a good grasp of the way in which JavaScript is structured and used in the short space of time we have had between working through the course content and getting on to implementation.  I believe I have a good understanding of the logical way in which it should be used but the syntax and the way in which variables are called etc can be extremely confusing for someone not used to it.

I found it difficult to understand how to implement solutions to my problems that I was trying to research on the various online resources which ended up with me spending a lot of time trying to fix one particular issue which was to the detriment of the limited time that we had to complete this project.

As I have said above, I am working on a business idea where I would ideally like to have dashboards available to help users with their day to day tasks so this is something that I am going to continue to work on and hopefully will click into place with the completion of the other modules of the course.