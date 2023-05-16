import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import '../estilos/memeGen.css';


export const ConfigMeme = () => {
    const [linea1, setLinea1] = useState('');
    const [linea2, setLinea2] = useState('');
    const [data, setData] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');

    const onChangeLinea1 = (e) => {
        setLinea1(e.target.value);
    }

    const onChangeLinea2 = (e) => {
        setLinea2(e.target.value);
    }

    const descargar = (e) => {
        html2canvas(document.getElementById("memeCreator")).then(function(canvas){
            let img = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.download = "1.jpg";
            link.href = img;
            link.click();
        });   
    }

    const handleImageSelect = (url) => {
        setImagenSeleccionada(url);
    }

    useEffect(() => {
        getMemes();
    }, []);

    function getMemes() {
        axios
            .get(`https://api.imgflip.com/get_memes?api_key=t733b8da1fd4af1908bb2ee6eaa4c53`)
            .then((response) => {
                setData(response.data.data.memes);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <Row>
                <Col>
                    <div className="App card text-center mt-5">
                        <div className="form-container p-3">
                            <h4 className='text-center pb-3'>Escoge tu Imagen de la Galería ➡</h4>
                            <p>Escribe tu contenido ⬇</p>
                            <input className="form-control" onChange={onChangeLinea1} type="text" placeholder="Linea 1" />
                            <input className="form-control mt-3" onChange={onChangeLinea2} type="text" placeholder="Linea 2" />
                            <button className="btn btn-secondary my-3" onClick={descargar}>Descargar</button>
                            <div className="meme-container" id="memeCreator">
                                <img src={imagenSeleccionada} alt="" />
                                <span className="arriba">{linea1}</span>
                                <span className="abajo">{linea2}</span>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col>
                    <div className="container mt-5">
                        <Row>
                            {data?.map((meme) => (
                                <Col key={meme.id} md={4} className="mb-2">
                                    <Card className='square-card' onClick={() => handleImageSelect(meme.url)}>
                                        <Card.Img variant="top" src={meme.url} alt={meme.name} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                
            </Row>
            
        </div>
    );
};

export default ConfigMeme;
