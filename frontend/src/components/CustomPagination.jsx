import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ totalPages, currentPage, handleClickPage, handleNextPage, handlePrevPage }) => {

    if(totalPages === 0) return;

    const pageList = [];
    for (let i = 1; i <= totalPages; i++) {
        pageList.push(i)
    }

    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First onClick={(e) => handlePrevPage(e)} disabled={currentPage <= 1}>Previos</Pagination.First>

                {
                    pageList.map((page, index)=> (
                        <Pagination.Item 
                        onClick={() => handleClickPage(page)}
                        active={currentPage === page}>{ page }</Pagination.Item>
                    ))
                }

                <Pagination.Last onClick={(e) => handleNextPage(e)} disabled={currentPage >= totalPages}>Next</Pagination.Last>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
