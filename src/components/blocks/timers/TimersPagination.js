import React, {useMemo} from 'react';
import {Divider} from 'react-native-elements';
import {Pagination} from '../Pagination';
import {itemsPerPage} from '../../../utils/Constants';


export const TimersPagination = ({timers, page, setPage}) => {

  const noOfPages = useMemo(() => Math.ceil(timers.length / itemsPerPage), [timers]);

  return (
    <React.Fragment>
      {timers.length > itemsPerPage
        ? <React.Fragment>
          <Divider/>
          <Pagination count={noOfPages} page={page} setPage={setPage}/>
        </React.Fragment>
        : null
      }
    </React.Fragment>
  );
};

