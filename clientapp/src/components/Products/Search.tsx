import React, {useState} from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5073",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function Search() {
  const [prodsearch, setProdsearch] = useState([]);
  // let [errors, setErrors] = useState([]);
  let [searchkey, setSearchkey] = useState("");

  const getProdsearch = (event: any) => {
      event.preventDefault();
      const data = JSON.stringify({ search: searchkey});

      api.post("/searchproducts",data)
      .then((res) => {
        console.log(res.data);
        setProdsearch(res.data.products);
      }, (error: any) => {
          // setErrors(error.message);
          console.log(error.message);
          return;
      });  
  }

  return (
    <div className="container mb-4">
        <h2>Search Product</h2>

        <form className="row g-3" onSubmit={getProdsearch} autoComplete='off'>
            <div className="col-auto">
              <input type="text" required className="form-control-sm" value={searchkey} onChange={e => setSearchkey(e.target.value)} placeholder="enter Product keyword"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary btn-sm mb-3">search</button>
            </div>
        </form>
        
        <div className="card-group mb-4">
        {prodsearch.map((item) => {
                return (
                  <div className="card">
                    <img src={item['prod_pic']} className="card-img-top product-size" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">Descriptions</h5>
                      <p className="card-text">{item['descriptions']}</p>
                    </div>
                    <div className="card-footer">
                      <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>
                        &#8369;{item['sell_price']}</strong></p>
                    </div>   
                  </div>
                );
        })}
        </div>    
      
    </div>
    )
}
