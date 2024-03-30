const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());


const products = require("./util/product.js");
const AuthMiddleWare = require("./util/Auth.js")

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Keyboard", "Bluetooth", "Pendrive", "Remote", "Headset", "Speaker", "Laptop", "PC"]

app.use(cors());


app.get("/getAll", (req, res) => {
    return res.status(200).json(products);
})
app.get("/companies/categories/products", (req, res) => {
    const { categoryname, companyname, topN, sortBy } = req.query;
    

    
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query parameter is provided

    const parsedTopN = parseInt(topN);

    if (!companies.includes(companyname) || !categories.includes(categoryname)) {
        return res.status(400).json({
            msg: "Company/category not found"
        });
    }

    const startIndex = (page - 1) * parsedTopN;
    const endIndex = page * parsedTopN;

    const filteredProducts = products.filter(product => product.company === companyname && product.category === categoryname);
    // console.log(filteredProducts);
    let sortedProducts;

   
    switch (sortBy) {
        case 'price':
            sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
            break;
        case 'rating':
            sortedProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            sortedProducts = [...filteredProducts].sort((a, b) => b.discount - a.discount);
            break;
        default:
            sortedProducts = filteredProducts;
    }
    console.log(sortedProducts);

    const paginatedProducts = sortedProducts.slice(startIndex, endIndex).map(({ company, category, ...rest }) => rest);

    res.status(200).json({
        paginatedProducts
    });
});


app.get("/categories/:categoryname/products/:productid", (req, res) => {
    const { productid, categoryname } = req.params;

    if (!productid || !categoryname) {
        return res.status(400).json({
            msg: "Invalid id or category"
        });
    }

    const searchedProduct = products.find(product => product.category === categoryname && product.productId === productid);

    if (!searchedProduct) {
        return res.status(400).json({
            msg: "Product does not exist."
        });
    }

    return res.status(200).json(searchedProduct);
});


app.listen(3000, () => {
    console.log("App listening on port 3000");
})