# Quicklinks

Svelte app builds one page of links based on JSON file containing Links split into Categories.

Links can be opened in new or in same tab.  Links in same Category can be opened at same time (recursively).

## Plan

1. ~~Convert simple JSON object to links on screen.  Has buttons to open whole Categories.~~

1. ~~Implement poll boolean.  Can only really check if server is responding due to CORS.~~

1. ~~Add CSS~~

1. ~~How do we communicate the deletions between components?  For example if child component is deleted, then parent is updated in unrelated way, parent will recreate child.~~

1. ~~Switch from using JSON template file to storing JSON in localstorage (maybe template can be used as backup)~~

1. Tidying: I think the forms should be their own components

1. Add some decent defaults to the template (maybe news websites), tidy up README, merge back to main, host somewhere?

1. Future Ideas: Can this be converted to Firefox/Chrome extension?  Maybe new tab page replacement or use browser's bookmarks?  Where would the data be stored (bookmark folders could be Categories, bookmarks could be links, but what about poll)?

## JSON format

Outer object: array of Categories.
Category contains array of Categories, array of Links, and boolean to see if child Links should be polled.
Links contain a hyperlink and a short description.

## Browser Issues

Browsers do not let you create popunders unless you Ctrl+Click/Enter or Middle Mouse Click on a link directly.  Therefore "Open All" buttons will change tabs.
Browsers by default prevent websites from opening multiple tabs at once, but permission can be given to a website to allow for this.
