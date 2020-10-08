import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { MOVIES_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

function UserList(props) {

    const getUserList = () => {
        props.crudActionCall(MOVIES_URL, null, "GET_ALL");
    }
    useEffect(() => {
        getUserList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.movies.action;
        if (type === "DELETE" && isSuccess)
            getUserList();
    }, [props.movies]);

    const navToEditPage = (movieId) => {
        console.log('id', movieId)
        props.history.push(`/movies/edit/${movieId}`);
    }
    const navToViewPage = (movieId) => {
        props.history.push(`/movies/details/${movieId}`);
    }
    const deleteUser = (movieId) => {
        props.crudActionCall(`${MOVIES_URL}/${movieId}`, null, "DELETE");
    }
    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> User List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Poster</th>
                                        <th>Movie Name</th>
                                        <th>Director Name</th>
                                        <th>Genres</th>
                                        <th>Poularity</th>
                                        <th>imdb_score</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.movies && props.movies.moviesList && props.movies.moviesList.length > 0 ?
                                        props.movies.moviesList.map((val) => {
                                            return (
                                                <tr>
                                                    <td class="text-center">
                                                        <div class="avatar">
                                                            <img
                                                                src={getImageUrl(val.poster)}
                                                                // src={'http://111.93.169.90:4020/image/user.png'}
                                                                // scr={val.poster}
                                                                class="img-avatar"
                                                                alt="not found"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{val.name}</td>
                                                    <td>{val.director}</td>
                                                    <td>{val.genre}</td>
                                                    <td>
                                                        <Badge color="success">{val.popularity}</Badge>
                                                    </td>
                                                    <td>{val.imdb_score}</td>
                                                    <td class="text-center">
                                                        <Button size="sm" className="btn-xing btn-brand mr-1 mb-1" data-toggle="tooltip" title="View" onClick={() => navToViewPage(123)}>
                                                            <i className="fa fa-eye"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1" data-toggle="tooltip" title="Edit" onClick={() => navToEditPage(val.id)}>
                                                            <i className="fa fa-pencil-square-o"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) { deleteUser(val.id) } }}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : null}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    const { movies } = state;
    console.log('movieList', movies, state)
    return {
        movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "MOVIES"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));