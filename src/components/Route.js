import React, { useEffect, useState } from 'react';

const Route = ({path, children}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      console.log('Location change'); //4 logs as there are 4 copies of routes
      setCurrentPath(window.location.pathname);
    }
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    }
  }, []); //only when the component is first rendered to the screen

  return (currentPath === path ? children : null);
}

export default Route;
