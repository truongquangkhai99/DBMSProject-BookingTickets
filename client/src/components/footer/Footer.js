import React from 'react'

function Footer() {
    return (
        <footer>
            <div id="footer">
                <div className="row">
                    <div className="column one-column icon">
                        <a className="app-icon" href="#"><i className="ti-facebook"></i></a>
                        <a className="app-icon" href="#"><i className="ti-instagram"></i></a>
                        <a className="app-icon" href="#"><i className="ti-tumblr"></i></a>
                        <a className="app-icon" href="#"><i className="ti-pinterest"></i></a>
                        <a className="app-icon" href="#"><i className="ti-twitter"></i></a>
                        <a className="app-icon" href="#"><i className="ti-linkedin"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="column one-column description">
                        <p>Database management system project</p>
                        <p>GROUP 1</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
