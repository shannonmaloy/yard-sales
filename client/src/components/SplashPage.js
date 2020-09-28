import React, { Component } from 'react'


export default function SplashPage () {
    
   
  
    return(
        <div className='hero'>
            <form >
                <input type="text" name="searchBarInput" placeholder="Enter an address, city, or ZIP code" />
                <input type="number" name="searchRadius" placeholder="Enter radius in miles"  />
                    <button type="submit">Search</button>
                </form>
            <div className='hero-title-text'>
                <h1 className='hero-title'>Welcome to Yard Sale!</h1>
                <h3 className='hero-text'>Welcome Text goes here</h3>
            </div>
            
            <img className='hero-image' alt="yard-sale" />
        </div>
        )
}