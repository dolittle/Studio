// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridColDef } from '@mui/x-data-grid-pro';

export const rows = [
    { id: 1, col1: 'Row 1', col2: 'Row 1', col3: 'Row 1' },
    { id: 2, col1: 'Row 2', col2: 'Row 2', col3: 'Row 2' },
    { id: 3, col1: 'Row 3', col2: 'Row 3', col3: 'Row 3' },
];

export const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', headerAlign: 'center', flex: 1, width: 150 },
    { field: 'col2', headerName: 'Column 2', flex: 1, width: 150 },
    { field: 'col3', headerName: 'Column 3', flex: 1, width: 150 },
];

export const toolbarButtons = [
    {
        label: 'Button one',
        startWithIcon: 'DeleteRounded',
    } as const,
    {
        label: 'Botton two',
        startWithIcon: 'CopyAllRounded',
    } as const,
    {
        label: 'Button three',
        startWithIcon: 'RocketLaunch',
    } as const,
];

export const dataTableDescription = `Data tables are an excellent way to organize vast amounts of data. Data tables should be easy to scan, 
            allowing the user to look for patterns and develop insights.

**Interactive Elements:** interactive elements allow the user to manipulate the data, including selecting, adding, editing and removing data. 
* Checkboxes: When data in a table can support many interactions such as removing, editing, restarting, syncing, etc… checkboxes are helpful in
allowing the user to select the data and manipulate it with a button or toolbar outside of the data table, instead of using an action icon in the data table itself.
This frees up space for more columns and, therefore, data. Always include a checkbox in the header row to allow for quick selection of all items within a data table.
* Action icons: These are icon buttons found inside their own column in the table that cause a specific action to a specific row of data.
Do not mix data table interactions by using both action icons inside the data table and tool bars or buttons outside the data table. Stick to one format. 
* Clickable rows: If a user can see a more detailed view or page of the individual data sets, make the rows clickable, leading the user to a new view with more information.
If rows are clickable, then they should display a hover state change. Always provide a way for the user to return to the data table with either a back button or via a breadcrumb.
* Editable cells: If a particular data field can be changed by the user, make the cell editable. Only use this when the user does not need to see a more detailed view to edit the data.
Cells should not be editable by default, only when required.
* Sorting columns: Sorting is a helpful function for manipulating data to better understand it. Include header sorters by default and remove when not necessary,
such as in columns that contain action icons. Sorting icons should always be displayed to the right of the column label.
* Expandable rows: Data rows can be expandable by utilizing the arrow icon button component. Expanded rows should show additional data as it pertains to the row above.
Only allow for one row to expand at a time so as not to overwhelm the user. 

**Structure**
* Header: Header columns should be adjustable in width size. If a column width must be reduced to a width smaller than the column name, use the appropriate abbreviation for the column label
and a tooltip upon hover to indicate the actual name. If abbreviation is not known, truncate the label.
* Row: Rows can be expandable and collapsable offering the opportunity to include more subsequent data beneath. Content in rows should be spaced evenly apart. Text should left align vertically within its column
and numbers, including dates, should right align for better scanning.
* Dividers: All rows, including the header row, should be separated by a divider. Expanded rows with additional content does not need to include a divider but can
if it offers better structure and separation between data sets.
* Pagination: Pagination can be added when data tables contain enough information that would cause the user to scroll vertically.
Do not build a data table that is longer than the height of a standard viewport. Instead, use pagination to break up the table.

**Size**: Use medium data table rows by default. When space is at a premium and the data sets are not overly complex, it's okay to use a dense table instead.`;
