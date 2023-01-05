import * as React from 'react';

import css from './DAWPlayhead.module.scss';

type Props = {
     isPlaying?: boolean;
     bpm: number;
     className?: string;
};

const DAWPlayhead: React.FunctionComponent<Props> = ({
     isPlaying,
     bpm,
     className,
}) => {
     return (
          <div className={[css.dawPlayhead, className || ''].join(' ')}>

          </div>
     );
};

export default DAWPlayhead;
