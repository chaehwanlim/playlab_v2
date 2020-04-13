import React from 'react';

const footer = ({ color }) => {
  return (
    <footer style={{color: color, fontSize: '1.4rem', fontWeight: 500, textAlign: 'center', marginTop: '4rem'}}>
        <p>Copyright © 2020 PlayLab</p>
        <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
        <p><a href="https://github.com/chaehwanlim/playlab_v2" color="black" target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </footer>
  )
}

footer.defaultProps = {
  color: 'grey',
}

export default footer;