
import React, { Component } from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";


export default class App extends Component {
  state= {currentCategory:"", products:[], cart:[]}

  componentDidMount (){

    this.getProducts();
  }

 //changeCategoy kategori den tetikleniyor, o yuzden get produkts burada 
  changeCategory= (category) => {

    this.setState({currentCategory:category.categoryName})
    //kategori de get product i tekrar cagirmak icin, eventi gondermek gerekiyor
    this.getProducts(category.id);
  }

  getProducts= (categoryId) => {

    let url = "http://localhost:3000/products";
    //ürünlerin hepsini url degiskenine atti
    if(categoryId){
      url+="?categoryId=" + categoryId;

    }
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({products:data}))

  }

  /* butona tiklandiginda Sepete ürün eklemek icin fonksiyon yaziyoruz. parametre olarak urunun gelecegini biliyorum o yuzden adina product dedim.*/
    addToCart=(product)=> {

    let newCart=this.state.cart;
    // git sepete javascriptin find fonksiyonu ile bak, herbir cartitem  icin produktun product id si , gonderilen productin id si
    var addedItem= newCart.find(c=>c.product.id===product.id);
    if(addedItem){
      addedItem.quantity+=1;
    }else{

    // array e bir elemen ekliyorum
    newCart.push({product:product, quantity:1});
    }

    this.setState({cart:newCart});

  }
  render() {

  let productInfo = {title:"ProductList"}
  let categoryInfo = {title:"CategoryList"}

    return (
      <div>
        <Container>
          <Row>
                <Navi cart={this.state.cart}/>
          </Row>
          <Row>
          <Col xs="3">
              <CategoryList 
              currentCategory={this.state.currentCategory} 
              changeCategory={this.changeCategory} 
              info={categoryInfo}/>
          </Col>  
          <Col xs="9">
              <ProductList 
              products={this.state.products}
              addToCart={this.addToCart}
              currentCategory={this.state.currentCategory} 
              info={productInfo}/>
          </Col>  
           
            
          </Row>
        </Container>
      </div>
    );

  }

}




