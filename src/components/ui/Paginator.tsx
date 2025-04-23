import { FC } from "react";
import ReactPaginate from "react-paginate";
import classes from "./Paginator.module.css";
import { BaseWrapper } from "binak-react-components";

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
  return (
    <BaseWrapper mode={["center"]} style={{ maxWidth: "100%" }}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={">"}
        previousLabel={"<"}
        nextClassName={classes["next"]}
        previousClassName={classes["next"]}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        className={classes["react-paginate"]}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        onClick={(clickEvent) => {
          if (clickEvent.nextSelectedPage !== undefined) {
            setCurrentPage(clickEvent.nextSelectedPage);
            refetch();
          }
        }}
        activeClassName={classes["active"]}
      />
    </BaseWrapper>
  );
};

export default Paginator;
