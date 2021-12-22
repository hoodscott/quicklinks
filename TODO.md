# Quicklinks

Svelte app builds one page of links based on JSON file containing Links split into Categories.

Links can be opened in new or in same tab.  Links in same Category can be opened at same time (recursively).

## Plan

1. ~~Convert simple JSON object to links on screen.  Has buttons to open whole Categories.~~

1. ~~Implement poll boolean.  Can only really check if server is responding due to CORS.~~

1. ~~Add CSS~~

1. How do we communicate the deletions between components?  For example if child component is deleted, then parent is updated in unrelated way, parent will recreate child.

1. Switch from using JSON template file to storing JSON in localstorage (maybe template can be used as backup)

1. Can this be converted to Firefox/Chrome extension?  Maybe new tab page replacement or use browser's bookmarks?  Where would the data be stored (bookmark folders could be Categories, bookmarks could be links, but what about poll)?

## JSON format

Outer object: array of Categories.
Category contains array of Categories, array of Links, and boolean to see if child Links should be polled.
Links contain a hyperlink and a short description.
