import React from 'react';

const Link = ({className, href, children}) => {

  const onClick = (event) => {

    if (event.metaKey || event.ctrlKey) { // metaKey for mac
      return; //to open link in new tab
    }
    event.preventDefault(); //prevents full page reload
    window.history.pushState({}, '', href); //to keep url in sync with the content

    // to communicate to the route component that the url has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default Link;
