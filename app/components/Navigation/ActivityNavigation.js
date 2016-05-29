import React from 'react';
import Activity from '../Activity/Activity';
import NavigatorWrapper from './NavigatorWrapper';


const ActivityNavigation = () => {
  const initialRoute = {
    name: 'History',
    index: 0,
    component: Activity,
    onPress: () => { console.log('press'); },
  };
  return (
    <NavigatorWrapper initialRoute={initialRoute} />
  );
};

export default ActivityNavigation;
