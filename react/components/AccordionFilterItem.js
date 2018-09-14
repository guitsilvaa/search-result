import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'
import { Link } from 'render'

import Arrow from '../images/Arrow'
import CheckTick from '../images/CheckTick'
import { facetOptionShape } from '../constants/propTypes'
import { getFilterTitle, formatFacetToLinkPropsParam } from '../constants/SearchHelpers'

const AccordionFilterItem = ({
  title,
  options,
  type,
  show,
  open,
  onOpen,
  onItemSelected,
  getLinkProps,
  intl,
  oneSelectedCollapse,
}) => (
  <Fragment>
    <div
      className={classNames('vtex-accordion-filter__item fw3 pv3 ph7 pointer bb b--light-gray', {
        'vtex-accordion-filter__item--active': open,
        'vtex-accordion-filter__item--hidden dn': !show,
      })}
      onClick={onOpen}
    >
      <div
        className={classNames('vtex-accordion-filter__item-title', {
          'normal dark-gray': open,
        })}
      >
        {getFilterTitle(title, intl)}

        <span className="vtex-accordion-filter__item-icon fr">
          <Arrow up={open} size={10} />
        </span>
      </div>
    </div>
    {open && (
      <div className="vtex-accordion-filter__item-options">
        {options.map(opt => {
          const pagesArgs = getLinkProps(formatFacetToLinkPropsParam(type, opt))

          return (
            <Link
              key={opt.Name}
              className="vtex-accordion-filter__item-opt pv3 ph7 pointer bb b--light-gray link fw3 db dark-gray"
              page={pagesArgs.page}
              params={pagesArgs.params}
              query={pagesArgs.queryString}
              onClick={onItemSelected}
            >
              {opt.Name}

              {false && (
                <span className="vtex-accordion-filter__check-icon fr">
                  <CheckTick />
                </span>
              )}
            </Link>
          )
        })}
      </div>
    )}
  </Fragment>
)

AccordionFilterItem.propTypes = {
  /** Title */
  title: PropTypes.string,
  /** Available filter options */
  options: PropTypes.arrayOf(facetOptionShape),
  /** Filter type (e.g. CATEGORIES_TYPE, BRANDS_TYPE) */
  type: PropTypes.string,
  /** Whether to show any of the content */
  show: PropTypes.bool,
  /** Whether to show the filter options */
  open: PropTypes.bool,
  /** Whether to hide other filters options when one is selected */
  oneSelectedCollapse: PropTypes.bool,
  /** Callback to open event */
  onOpen: PropTypes.func,
  /** Callback to filter option selected event */
  onItemSelected: PropTypes.func,
  /** Get the props to pass to render's Link */
  getLinkProps: PropTypes.func,
  /** Intl instance */
  intl: intlShape,
}

export default injectIntl(AccordionFilterItem)