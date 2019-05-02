import React from 'react'
import Order from '../../components/Order/Order';
class Orders extends React.Component {
    state = {
        orders: []
    }
    componentDidMount() {
        //fetch data in here
        //ex axios.get('/orders.json')
    }
    render() {
         return (
             <div>
                 {this.state.orders.map(order => (
                     <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                 ))}
             </div>
         );
    }
}

export default Orders