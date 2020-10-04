import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  Row,
} from 'reactstrap';
import InputUI from '../../UI/InputUI';
import FileInput from "../../UI/FileInput";
import { MOVIES_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function MovieForm(props) {
  const initialFields = {
    name: "",
    director: "",
    genre: '',
    popularity: null,
    imdb_score: null,
    poster: null
  }
  const [fields, setFields] = useState(initialFields);
  const [movieId, setmovieId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setmovieId(params.movieId)
    if (params.movieId) props.crudActionCall(`${MOVIES_URL}/${params.movieId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.movie.action;
    if (props.movie.movie && params.movieId) {
      setFields({ ...fields, ...props.movie.movie })
    }

    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/movies/list")

  }, [props.movie]);

  const onSubmit = (data) => {
    if (movieId) data.movieId = movieId;
    props.crudActionCall(MOVIES_URL, data, movieId ? "UPDATE" : "ADD")
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{movieId ? `Movie Update` : `Movie Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* First Name */}
                <InputUI
                  label="Movie Name"
                  name="name"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Director Name */}
                <InputUI
                  label="Director Name"
                  name="email"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                <InputUI
                  label="Genre"
                  name="genre"
                  type="text"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Date Of Birth */}
                <InputUI
                  label="Popularity"
                  name="popularity"
                  type="number"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                  min="1"
                  max="100"
                  placeholder="Entered number between 1 to 100"
                />
                <InputUI
                  label="imdb_score"
                  name="dateOfBirth"
                  type="number"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                  min="1"
                  max="10"
                  placeholder="Entered number between 1 to 10"
                />
                <FileInput
                  label="Movie Poster"
                  name="poster"
                  register={register}
                  errors={errors}
                  required={false}
                />

              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = state => {
  const { movie } = state;
  return {
    movie
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "MOVIES")),
    resetAction: () => dispatch({ type: "RESET_MOVIES_ACTION" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieForm));