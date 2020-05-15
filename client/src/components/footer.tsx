import React from 'react';

const footer = ({ color }) => {
  return (
    <footer style={{color: color, fontSize: '1.4rem', fontWeight: 400, textAlign: 'center', margin: '4rem 0rem'}}>
        <p>Copyright © 2020 PlayLab</p>
        <div>
          <a href="https://github.com/chaehwanlim/playlab_v2" 
            target="_blank" rel="noopener noreferrer" 
            style={{color: color, textDecoration: 'none'}}
          >
            GitHub
          </a>&nbsp;|&nbsp;
          <a href="mailto: chlim428@gmail.com" style={{color: color, textDecoration: 'none'}}>
            chlim428@gmail.com
          </a>
        </div>
    </footer>
  )
}

footer.defaultProps = {
  color: 'grey',
}

export default footer;