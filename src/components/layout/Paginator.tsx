import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import classes from './paginator.module.css';
import { useTranslation } from 'react-i18next';
import { BaseWrapper } from 'binak-react-components';

interface PaginatorProps {
  setCurrentPage: (arg0: number) => void;
  refetch: () => void;
  currentPage: number;
  totalPages: number;
}

const Paginator: FC<PaginatorProps> = ({
  setCurrentPage,
  refetch,
  currentPage,
  totalPages,
}) => {
  const { t } = useTranslation();
  return (
    <BaseWrapper mode={['center']}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={t('Next')}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={t('Previous')}
        className={classes['react-paginate']}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        onClick={(clickEvent) => {
          if (clickEvent.nextSelectedPage !== undefined) {
            setCurrentPage(clickEvent.nextSelectedPage);
            refetch();
          }
        }}
        activeClassName={classes['active']}
      />
    </BaseWrapper>
  );
};

export default Paginator;
