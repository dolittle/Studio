// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const dataTableDescription = `Data tables are an excellent way to organize vast amounts of data. Data tables should be easy to scan, 
            allowing the user to look for patterns and develop insights.

**Interactive Elements:** interactive elements allow the user to manipulate the data, including selecting, adding, editing and removing data. 
* Checkboxes: When data in a table can support many interactions such as removing, editing, restarting, syncing, etc… checkboxes are helpful in
allowing the user to select the data and manipulate it with a button or toolbar outside of the data table, instead of using an action icon in the data table itself.
This frees up space for more columns and, therefore, data. Always include a checkbox in the header row to allow for quick selection of all items within a data table.
 
* Clickable rows: If a user can see a more detailed view or page of the individual data sets, make the rows clickable, leading the user to a new view with more information.
If rows are clickable, then they should display a hover state change. Always provide a way for the user to return to the data table with either a back button or via a breadcrumb.

* Sorting columns: Sorting is a helpful function for manipulating data to better understand it. Include header sorters by default and remove when not necessary,
such as in columns that contain action icons. Sorting icons should always be displayed to the right of the column label.
* Expandable rows: Data rows can be expandable by utilizing the arrow icon button component. Expanded rows should show additional data as it pertains to the row above.
Only allow for one row to expand at a time so as not to overwhelm the user. 

**Structure**

* Row: Rows can be expandable and collapsable offering the opportunity to include more subsequent data beneath. Content in rows should be spaced evenly apart. Text should left align vertically within its column
and numbers, including dates, should right align for better scanning.`;
