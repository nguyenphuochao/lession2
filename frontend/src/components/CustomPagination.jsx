import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ totalPages, currentPage, handleClickPage }) => {

    const pageList = [];
    for (let i = 1; i <= totalPages; i++) {
        pageList.push(i)
    }

    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First disabled={true}>Previos</Pagination.First>

                {
                    pageList.map((page, index)=> (
                        <Pagination.Item 
                        onClick={() => handleClickPage(page)}
                        active={currentPage === page}>{ page }</Pagination.Item>
                    ))
                }

                <Pagination.Last>Next</Pagination.Last>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
