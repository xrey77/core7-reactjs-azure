import React, {useState, useEffect} from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5073",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function List() {

  let [page, setPage] = useState(1);
  let [totpage, setTotpage] = useState(0);
  const [prods, setProds] = useState([]);

  useEffect(() => {
    getProducts(page);
  },[page]);

  const getProducts = (pg: any) => {
    api.get(`/listproducts/${pg}`)
    .then((res) => {
        setProds(res.data.products);
        setTotpage(res.data.totpage);
        setPage(res.data.page);
    }, (error: any) => {
            console.log(error.message);
            return;
    });
  }

  const firstPage = (event: any) => {
    event.preventDefault();    
    page = 1;
    setPage(page);
    getProducts(page);
    return;    
  }

  const nextPage = (event: any) => {
    event.preventDefault();    
    if (page === totpage) {
        return;
    }
    setPage(page++);
    getProducts(page);
    return;
  }

  const prevPage = (event: any) => {
    event.preventDefault();    
    if (page === 1) {
      return;
      }
      setPage(page--);
      getProducts(page);
      return;    
  }

  const lastPage = (event: any) => {
    event.preventDefault();
    page = totpage;
    setPage(page);
    getProducts(page);
    return;    
  }

  return (
   <div className="container-fluid">
    <h1 className="text-center">Product List</h1>

    <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Descriptions</th>
            <th scope="col">Stocks</th>
            <th scope="col">Unit</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>

        {prods.map((item) => {
            return (
              <tr>
                 <td>{item['id']}</td>
                 <td>{item['descriptions']}</td>
                 <td>{item['qty']}</td>
                 <td>{item['unit']}</td>
                 <td>&#8369;{item['sell_price']}</td>
               </tr>
              );
        })}

        </tbody>
    </table>    

    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a onClick={lastPage} className="page-link" href="/#">Last</a></li>
          <li className="page-item"><a onClick={prevPage} className="page-link" href="/#">Previous</a></li>
          <li className="page-item"><a onClick={nextPage} className="page-link" href="/#">Next</a></li>
          <li className="page-item"><a onClick={firstPage} className="page-link" href="/#">First</a></li>
          <li className="page-item page-link text-danger">Page&nbsp;{page} of&nbsp;{totpage}</li>

        </ul>
      </nav>

  </div>         

  )
}
