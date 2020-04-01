import React from 'react';

export default function footer() {
  return (
    <footer style={{backgroundColor: 'whitesmoke', color: 'grey', fontSize: '1.4rem', fontWeight: '500', textAlign: 'center', marginTop: '4rem'}}>
        <p>Copyright © 2020 PlayLab</p>
        <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
        <p><a href="https://github.com/chaehwanlim/playlab" color="black" target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </footer>
  )
}