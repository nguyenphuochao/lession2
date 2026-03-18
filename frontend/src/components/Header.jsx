import Button from "react-bootstrap/Button";

const Header = () => {
    return (
        <div className="d-flex gap-3">
            <Button variant="primary">Products</Button>
            <Button variant="light">Categories</Button>
        </div>
    );
};

export default Header;
