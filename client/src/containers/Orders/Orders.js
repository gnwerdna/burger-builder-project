import React from "react";
import Order from "../../components/Order/Order";
import Modal from "../../components/UI/Modal/Modal";
class Orders extends React.Component {
  state = {
    orders: [],
    error: null,
    show: false
  };
  componentDidMount() {
    //fetch data in here
    fetch("/orders", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.error) {
          this.setState({ error: resData.error });
        } else {
          console.log(resData)
          let dataArray = [];
          for (let key in resData) {
            dataArray.push({
              id: key,
              ...resData[key]
            }); 
          }
          console.log(dataArray);
          this.setState({ orders: dataArray });
        }
      });
    //ex axios.get('/orders.json')
  }
  render() {
    let errorModal = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
        name={order.customer.name}
        address={order.customer.street}
      />
    ));
    if (this.state.error) {
      errorModal = <Modal show={true}>{this.state.error}</Modal>;
    }
    return <div>{errorModal}</div>;
  }
}

export default Orders;
