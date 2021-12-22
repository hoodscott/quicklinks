# Quicklinks

Svelte app builds one page of links based on JSON file containing Links split into Categories.

Links can be opened in new or in same tab.  Links in same Category can be opened at same time (recursively).

## Plan

1. ~~Convert simple JSON object to links on screen.  Has buttons to open whole Categories.~~

2. Implement poll boolean.  Can only really check if server is responding due to CORS.

3. Store JSON in localstorage and add editor.  User should not need to know JSON.

4. Can this be converted to Firefox/Chrome extension?  Maybe new tab page replacement or use browser's bookmarks?  Where would the data be stored (bookmark folders would be Categories, bookmarks would be links, but what about poll)?

## JSON format

Outer object: array of Categories.
Category contains array of Categories, array of Links, and boolean to see if child Links should be polled.
Links contain a hyperlink and a short description.