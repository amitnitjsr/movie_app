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
    genre: [],
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
    if (params.movieId) {
      props.crudActionCall(`${MOVIES_URL}/${params.movieId}`, null, "GET")
    }
  }, [params]);

  useEffect(() => {

    const action = props.movies.action;

    if (props.movies.movies && params.movieId) {
      setFields({ ...fields, ...props.movies.movies[0] });
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/movies/list")

  }, [props.movies]);

  const onSubmit = (data) => {
    debugger
    if (movieId) data.movieId = movieId;
    if (data.poster[0]) {
      var img = document.querySelector('img');  // $('img')[0]
      img.src = URL.createObjectURL(data.poster[0]); // set src to blob url
      // this.setState({ uploadedImage: img.src })
      data.poster = img.src;
      console.log('data', img.src);

    }
    console.log('data', data.poster[0]);


    if (data.poster[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        // this.setState({ imageURI: ev.target.result });
        console.log('imageURI', ev.target.result);
      }.bind(this);
      reader.readAsDataURL(data.poster[0]);
    }


    if (movieId) {
      let tmp = data.genre;
      data.genre = tmp.split(',');
      data.modified_on = new Date();
      data.modified_by = ''
      props.crudActionCall(MOVIES_URL + `/${movieId}`, data, movieId ? "UPDATE" : "ADD");
    }
    else {
      let tmp = data.genre;
      data.genre = tmp.split(',');
      data.created_on = new Date();
      data.created_by = 'Admin'
      props.crudActionCall(MOVIES_URL, data, movieId ? "UPDATE" : "ADD");
    }
    props.resetAction();
    // props.crudActionCall(MOVIES_URL, data, movieId ? "UPDATE" : "ADD")
  }

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        console.log('url', ev.target.result)
        this.setState({ imageURI: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleChange = (e) => {
    readURI(e); // maybe call this with webworker or async library?
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
                  name="director"
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
                  name="imdb_score"
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
  const { movies } = state;
  return {
    movies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "MOVIES")),
    resetAction: () => dispatch({ type: "RESET_MOVIES_ACTION" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieForm));