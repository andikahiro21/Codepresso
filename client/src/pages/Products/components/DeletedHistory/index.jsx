import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import classes from './style.module.scss';

const DeleteHistory = ({ products, handleRestore }) => {
  if (isEmpty(products)) {
    return (
      <div className={classes.deletedHistory}>
        <div className={classes.title}>
          <FormattedMessage id="app_no_data" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.deletedHistory}>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <FormattedMessage id="app_table_deleted" />
              </th>
              <th>
                <FormattedMessage id="app_table_description" />
              </th>
              <th>
                <FormattedMessage id="app_table_price" />
              </th>
              <th>
                <FormattedMessage id="app_table_type" />
              </th>
              <th>
                <FormattedMessage id="app_table_action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index}>
                <td>{product?.name}</td>
                <td className={classes.truncate}>{product?.description}</td>
                <td>{product?.price}</td>
                <td>{product?.type}</td>
                <td>
                  <div onClick={() => handleRestore(product.id)}>
                    <RestoreFromTrashIcon className={classes.icon} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DeleteHistory.propTypes = {
  products: PropTypes.array,
  handleRestore: PropTypes.func,
};

export default DeleteHistory;
