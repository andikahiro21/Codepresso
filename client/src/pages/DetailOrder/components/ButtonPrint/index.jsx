import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { LocalPrintshopOutlined } from '@mui/icons-material';

import classes from './style.module.scss';

const ButtonPrint = ({ contentRef, className }) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  return (
    <button className={classNames(classes.button, className)} type="button" onClick={handlePrint}>
      <LocalPrintshopOutlined className={classes.icon} />
      Print
    </button>
  );
};

ButtonPrint.propTypes = {
  contentRef: PropTypes.object,
  className: PropTypes.string,
};
export default ButtonPrint;
