import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { commonAPI } from "../redux/actions";
const DashBoard = ({ commonAPI, ...props }) => {
  const [formData, setFormData] = useState({
    whetherList: [],
    details: {}

  })
  // //   https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
  // // exclude=hourly,daily&appid={YOUR API KEY}
  useEffect(() => {
    getReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReport = async (values) => {
    let response = await commonAPI(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=8dab6044de0dabb4ea03a4de696103cd`, '', 'get')
    console.log(response);

    if (values === 'hourly') {
      setFormData({ ...formData, whetherList: response.hourly })
    } else if (values === 'daily') {
      setFormData({ ...formData, whetherList: response.daily })
    }
    else
      setFormData({ ...formData, whetherList: [response.current] })

  }



  let { whetherList, details } = formData
  console.log(details);
  
  return (
    <React.Fragment>
      <section className="table-block">
        <div className="container">
          <h2 className="main-title">Weather Report</h2>
          <div className="search-part">
            <button type="button" className="btn btn-primary" onClick={() => getReport('current')} >Current weather data</button>
            <button type="button" className="btn btn-primary" onClick={() => getReport('hourly')}>Hourly forecast</button>
            <button type="button" className="btn btn-primary" onClick={() => getReport('daily')}>Daily forecast</button>

          </div>

          <table className="w-100 table">
            <tr>
              <th>Clouds</th>
              <th>Dew_point</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>Wind_deg</th>
              <th>Wind_speed</th>
            </tr>
            {whetherList.length != 0 ? <React.Fragment>
              {whetherList.map((weather, id) => {
                return (
                  <tr key={id} data-toggle="modal" data-target="#exampleModal" onClick={() => setFormData({ ...formData, details: weather.weather[0] })}>
                    <td>{weather.clouds}</td>
                    <td>{weather.dew_point}</td>
                    <td>{weather.humidity}</td>
                    <td>{weather.pressure}</td>
                    <td>{weather.wind_deg}</td>
                    <td>{weather.wind_speed}</td>
                  </tr>
                )
              })}</React.Fragment> : <tr><td>No records found</td></tr>}
          </table>


          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Weather Details</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>Description</label>
                    <p class="form-control">{details.description}</p>
                  </div>

                  <div class="form-group">
                    <label>Main</label>
                    <p class="form-control">{details.main}</p>
                  </div>
                  <div class="form-group">
                    <label>id</label>
                    <p class="form-control">{details.id}</p>
                  </div>
                
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  validate_me: state.commonStore.credentials,
  oldRecords: state.commonStore.totalRecords,
});
export default connect(mapStateToProps, { commonAPI })(DashBoard)


