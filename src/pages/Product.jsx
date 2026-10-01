import { useParams } from "react-router-dom";
function Product() {
    const { productId } = useParams();
    return (
        <div>
            <h1>Product Page</h1>
            <p>This is a product page.</p>
        </div>
    );
}

export default Product;