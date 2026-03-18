import Pagination from "react-bootstrap/Pagination";

const CustomPagination = () => {
    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First disabled={true}>Previos</Pagination.First>

                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>

                <Pagination.Last>Next</Pagination.Last>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
