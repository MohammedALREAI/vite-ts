import * as React from 'react';


import css from './App.module.scss';

type Props = {
     className?: string;
     children?: string | React.ReactNode;
};

const App: React.FunctionComponent<Props> = ({ className, children }) => {

     return <div className={[css.app, className || ''].join(' ')}>{children}</div>;
};

export default App;
