import React, {Component} from 'react';
import Chart from "react-google-charts";
import NavBar_Admin from "./NavBar_Admin";

class ShowReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const res = axios.get('http://localhost:8000/api/customer/chart', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })

        res.then(response => {
            console.log(response.result)
            this.setState({dataArr: response.data.result});
        })
    }


    render() {

        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <Chart
                            width={'900px'}
                            height={'400px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.dataArr}
                            options={{
                                title: 'Activated Customers',
                                // Just add this option
                                is3D: true,
                            }}
                            rootProps={{'data-testid': '2'}}
                        />
                        <br/>
                        {/*<Chart*/}
                        {/*    width={'900px'}*/}
                        {/*    height={'400px'}*/}
                        {/*    chartType="LineChart"*/}
                        {/*    loader={<div>Loading Chart</div>}*/}
                        {/*    data={[*/}
                        {/*        ['x', 'orders'],*/}
                        {/*        ['Jan', 30],*/}
                        {/*        ['Feb', 40],*/}
                        {/*        ['March', 50],*/}
                        {/*        ['April', 60],*/}
                        {/*        ['May', 70],*/}
                        {/*        ['June', 80],*/}
                        {/*        ['July', 70],*/}
                        {/*        ['August', 90],*/}
                        {/*        ['Sep', 100],*/}
                        {/*        ['Oct', 40],*/}
                        {/*        ['Nov', 35],*/}
                        {/*        ['Dec', 30],*/}
                        {/*    ]}*/}
                        {/*    options={{*/}
                        {/*        hAxis: {*/}
                        {/*            title: 'Time',*/}
                        {/*        },*/}
                        {/*        vAxis: {*/}
                        {/*            title: '',*/}
                        {/*        },*/}
                        {/*    }}*/}
                        {/*    rootProps={{'data-testid': '1'}}*/}
                        {/*/>*/}
                        {/*<br/>*/}
                        <br/>
                        <br/>
                        <br/>

                    </div>
                </div>
            </div>
        );
    }
}

export default ShowReports;

