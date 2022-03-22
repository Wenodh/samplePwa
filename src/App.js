import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Container, Table, Toast } from 'react-bootstrap';

function App() {
    const [data, setData] = React.useState([]);
    const [clicked, setClicked] = React.useState(false);
    const [online, setOnline] = React.useState(navigator.onLine);
    const withCatch = () => {
        fetch('https://api.github.com/users/mojombo/followers')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setClicked(true);
    };
    const withOutCatch = () => {
        fetch('https://api.github.com/users')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setClicked(true);
    };
    const clear = () => {
        setData([{ id: 1, login: 'na', type: 'na', email: 'na' }]);
    };

    useEffect(() => {
        window.addEventListener('offline', () => {
            setOnline(false);
        });
        window.addEventListener('online', () => {
            setOnline(true);
        });
    }, []);
    return (
        <Container>
            <div className="d-flex justify-content-between">
                <Button onClick={withCatch}>with Catch</Button>
                <Button onClick={withOutCatch}>withOut Catch</Button>
                <Button onClick={clear}>Clear</Button>
                <Toast>
                    <Toast.Body>{online ? 'Online' : 'Offline'}</Toast.Body>
                </Toast>
            </div>
            {clicked && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Username</th>
                            <th>type</th>
                            <th>site_admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.login}</td>
                                <td>{item.type}</td>
                                <td>{item.site_admin ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default App;
