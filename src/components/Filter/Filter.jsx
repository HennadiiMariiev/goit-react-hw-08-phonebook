import PropTypes from 'prop-types';
import { StyledInput, StyledLabel } from './StyledFilterComponents';
import { setFilter } from 'redux/filter/filter-actions';
import { getItems, getFilter } from 'redux/contacts-selectors';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const items = useSelector(getItems);

  const dispatch = useDispatch();

  return (
    <div>
      <StyledLabel>
        Search
        <StyledInput
          type="text"
          name="search"
          placeholder="Please, type search name"
          value={filter}
          onChange={(event) => dispatch(setFilter(event.target.value))}
          disabled={items.length ? false : true}
        />
      </StyledLabel>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};
