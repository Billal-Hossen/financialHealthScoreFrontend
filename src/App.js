import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container, Row, Col, } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function App() {

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    debts: '',
    assets: '',
  });
  const [financialHealthScore, setFinancialHealthScore] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericValue = value === '' ? '' : Number(value);

    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/dev/calculate', formData);
      if (response?.data?.financialHealthScore) {
        setFinancialHealthScore(response?.data?.financialHealthScore)
        setMessage(response?.data?.message)
        setShow(true)
      }

      console.log(response.data)

    } catch (error) {
      setFinancialHealthScore('')
      setMessage(error.response.data.error)
      setShowError(true)
      console.log(error.response.data.error)
    }

  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">FoundBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>


            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="d-inline-block m-1 bg-primary"
          >

            <Toast.Body className="  text-white">
              {message} and score is {financialHealthScore}
            </Toast.Body>
          </Toast>
        </Col>

      </Row>

      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide className="d-inline-block m-1 bg-danger"
          >

            <Toast.Body className="  text-white">
              {message}
            </Toast.Body>
          </Toast>
        </Col>

      </Row>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="income">
                <Form.Label>Income</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter income"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="expenses">
                <Form.Label>Expenses</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter expenses"
                  name="expenses"
                  value={formData.expenses}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="debts">
                <Form.Label>Debts</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter debts"
                  name="debts"
                  value={formData.debts}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="assets">
                <Form.Label>Assets</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter assets"
                  name="assets"
                  value={formData.assets}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Calculate
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



    </>
  );
}

export default App;
