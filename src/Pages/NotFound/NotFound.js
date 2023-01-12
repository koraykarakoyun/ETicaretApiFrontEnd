import React from 'react'
import "./NotFound.css"

const NotFound = () => {
  return (
    <div>
      <section class="error-container">
        <span class="four"><span class="screen-reader-text">4</span></span>
        <span class="zero"><span class="screen-reader-text">0</span></span>
        <span class="four"><span class="screen-reader-text">4</span></span>
      </section>

      <h1 className='notfound_h1'>Not Found</h1>
    </div>
  )
}

export default NotFound