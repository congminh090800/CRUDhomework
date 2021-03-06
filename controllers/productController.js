const productModel = require('../models/productModel');


exports.index = async (req, res, next) => {
    // Get books from model
    const products = await productModel.list();
    console.log('products', products);
    // Pass data to view to display list of books
    res.render('products', {title:'Book Store',active_products:true,products});
};

exports.details = async (req, res, next) => {
    res.render('product_detail', await productModel.get(req.params.id));
}

exports.getPage= async(req,res,next)=>{
    //filter
    const filter={};
    filter.search=req.query.search || "";
    filter.category=req.query.category || "";
    //paginate
    const nPage=parseInt(req.query.page) || 1;
    const categories=await productModel.categories();
    const products=await productModel.getPage(filter,nPage);
    const info=await productModel.pageInfo(filter,nPage);
    console.log('info',info);
    res.render('products', {
        title:'Book Store',
        active_products:true,
        categories:categories,
        products:products,
        totalPage:info.totalPage,
        hasNextPage:info.hasNextPage,
        hasPreviousPage:info.hasPreviousPage,
        nextPage:info.nextPage,
        previousPage:info.prePage,
        currentPage:nPage
    });
}
