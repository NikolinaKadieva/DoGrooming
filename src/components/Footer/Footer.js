import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <>
            <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
                <div className="row pt-5">
                    <div className="col-lg-8 col-md-12">
                        <h1 className="mb-3 display-5 text-capitalize text-white"><span className="text-primary">Do</span><span className="custom-color">G</span>rooming</h1>
                        <p><i className="fas fa-paw"> Професионално подстригване на кучета в спокойна и грижовна среда</i></p>
                        <p><i className="fas fa-dog"> Очаквайте лично отношение от началото до края</i></p>
                        <p><i className="fas fa-paw"> Процедури, съобразени с безопасността и спокойствието на Вашия домашен любимец</i></p>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="text-primary mb-4">Контакти</h5>
                                <p><i className="fa fa-map-marker-alt mr-2"></i>ул. Васил Левски 4, 6280 Строител, Гълъбово</p>
                                <p><i className="fa fa-phone-alt mr-2"></i>089 278 8989</p>
                                <p><i className="fa fa-envelope mr-2"></i>dogroomingbga@gmail.com</p>
                                <div className="d-flex justify-content-center mt-2">
                                    <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: "36px", height: "36px" }} target="_blank" rel="noreferrer" href="https://www.facebook.com/DoGroomingB.G.A" title="facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: "36px", height: "36px" }} target="_blank" rel="noreferrer" href="https://www.instagram.com/dogrooming.b.g.a/" title="instagram"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid text-white py-4 px-sm-3 px-md-5" style={{ background: '#111111' }}>
                <div className="row">
                    <div className="col-md-6 text-center text-md-center mb-3 mb-md-0">
                        <p className="m-0 text-white">
                            &copy; <Link className="text-white font-weight-bold" to="/">DoGrooming</Link>. All Rights Reserved. Designed by
                            <a className="text-white font-weight-bold" target="_blank" rel="noreferrer" href="https://github.com/NikolinaKadieva"> NiK&reg;L</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};