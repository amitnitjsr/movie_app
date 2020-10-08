import React, { useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import '../../custom.css';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { MOVIES_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import moment from 'moment';

function MovieDetails(props) {
  let movieId = props.match.params.movieId;

  useEffect(() => {
    props.crudActionCall(`${MOVIES_URL}/${movieId}`, null, "GET")
    return () => {

    }
  }, []);

  const userData = props.movies.movies;

  return (
    <div classNam="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i classNameName="fa fa-edit"></i>View Profile
                </CardHeader>
            <CardBody>
              {userData && (
                <ul className="list-unstyled todo-list">
                  <li>
                    <p>
                      <span className="title">Name</span>
                      <span className="short-description">{`${userData.first_name} ${userData.last_name}`}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Email Address</span>
                      <span className="short-description">{userData.email}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Mobile Number</span>
                      <span className="short-description">{userData.phone_number ? userData.phone_number : ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Date Of Birth</span>
                      <span className="short-description">{userData.date_of_birth ? moment(userData.date_of_birth).format('YYYY-MM-DD') : ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Address</span>
                      <span className="short-description">{userData.user_address ? userData.user_address : ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Join Date</span>
                      <span className="short-description">{moment(userData.created).format('MMM D, YYYY')}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Status</span>
                      <span className="short-description">{userData.status == 1 ? "Active" : "Inactive"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Image</span>
                      <span className="short-description">
                        <img src={getImageUrl(userData.profile_picture)} className="show-image" alt="..." />
                      </span>
                    </p>
                  </li>
                </ul>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
const mapStateToProps = state => {
  const { movies } = state;
  return {
    movies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "MOVIES"))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);